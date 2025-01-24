const Order = require('../models/ordermodel');
const Product = require('../models/productmodel');

const getSalesAnalytics = async (req, res) => {
  try {
    console.log('Starting analytics calculation...');

    // 1. Get all unique categories and log them
    const categories = await Product.distinct('category');
    console.log('Available product categories:', categories);

    // 2. Get total number of products per category
    const productsPerCategory = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category });
        return { category, count };
      })
    );
    console.log('Products per category:', productsPerCategory);

    // 3. Initialize category data
    const categoryData = categories.reduce((acc, category) => {
      acc[category] = { totalSold: 0, revenue: 0, productCount: 0 };
      return acc;
    }, {});

    // 4. Get and validate orders
    const orders = await Order.find({
      isPaid: true,
      isRefunded: false,
      paidAt: { $exists: true, $ne: null }
    })
    .populate({
      path: 'orderItems.product',
      select: 'name price category'
    })
    .sort({ paidAt: -1 });

    console.log(`Found ${orders.length} valid orders for analysis`);

    // 5. Initialize tracking variables
    let totalRevenue = 0;
    let totalOrdersCount = orders.length;
    let totalItemsSold = 0;

    // 6. Process each order with validation
    orders.forEach((order, index) => {
      console.log(`Processing order ${index + 1}/${orders.length}: ${order.orderID}`);
      
      // Validate order total
      if (order.totalPrice && order.totalPrice > 0) {
        totalRevenue += order.totalPrice;
      } else {
        console.warn(`Invalid total price for order ${order.orderID}`);
      }

      // Process order items
      order.orderItems.forEach(item => {
        if (!item.product) {
          console.warn(`Missing product reference in order ${order.orderID}`);
          return;
        }

        const { product, qty, price } = item;
        
        if (!product.category || !categories.includes(product.category)) {
          console.warn(`Invalid category for product in order ${order.orderID}`);
          return;
        }

        // Update category statistics
        categoryData[product.category].totalSold += qty;
        categoryData[product.category].revenue += price * qty;
        totalItemsSold += qty;
      });
    });

    // 7. Calculate averages and percentages
    const averageOrderValue = totalOrdersCount > 0 ? 
      totalRevenue / totalOrdersCount : 0;

    // 8. Format the final statistics
    const salesStats = {
      totalRevenue,
      totalOrders: totalOrdersCount,
      totalItemsSold,
      averageOrderValue
    };

    // 9. Format category performance with percentages
    const categoryPerformance = Object.entries(categoryData)
      .map(([category, data]) => ({
        _id: category,
        totalSold: data.totalSold,
        revenue: data.revenue,
        percentageOfTotal: totalRevenue > 0 ? 
          ((data.revenue / totalRevenue) * 100).toFixed(2) : 0
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // 10. Log final calculations
    console.log('Final calculations:', {
      totalRevenue,
      totalOrders: totalOrdersCount,
      totalItemsSold,
      averageOrderValue,
      categoriesFound: categoryPerformance.length
    });

    // 11. Send response
    res.json({
      salesStats,
      categoryPerformance,
      categories,
      monthlyRevenue: calculateMonthlyRevenue(orders),
      productPerformance: calculateProductPerformance(orders)
    });

  } catch (error) {
    console.error('Error in analytics calculation:', error);
    res.status(500).json({
      message: 'Error calculating analytics',
      error: error.message
    });
  }
};

// Helper function for monthly revenue calculation
const calculateMonthlyRevenue = (orders) => {
  const monthlyData = {};
  
  orders.forEach(order => {
    const date = new Date(order.paidAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { revenue: 0, orders: 0 };
    }
    
    monthlyData[monthKey].revenue += order.totalPrice;
    monthlyData[monthKey].orders += 1;
  });

  return Object.entries(monthlyData)
    .map(([key, data]) => {
      const [year, month] = key.split('-');
      return {
        _id: { year: parseInt(year), month: parseInt(month) },
        revenue: data.revenue,
        orders: data.orders
      };
    })
    .sort((a, b) => {
      // Sort by year and month
      if (a._id.year !== b._id.year) return b._id.year - a._id.year;
      return b._id.month - a._id.month;
    });
};

// Helper function for product performance calculation
const calculateProductPerformance = (orders) => {
  const productData = {};

  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (!item.product) return;

      const productId = item.product._id.toString();
      if (!productData[productId]) {
        productData[productId] = {
          name: item.product.name,
          category: item.product.category,
          totalSold: 0,
          revenue: 0
        };
      }

      productData[productId].totalSold += item.qty;
      productData[productId].revenue += item.price * item.qty;
    });
  });

  return Object.values(productData)
    .sort((a, b) => b.revenue - a.revenue);
};

module.exports = {
  getSalesAnalytics
}; 