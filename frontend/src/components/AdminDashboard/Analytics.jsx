import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import './admin.css';

const Analytics = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the subscription
    console.log('Subscribed email:', email);
    setEmail(''); // Clear the email field
  };


  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/analytics/sales', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analytics data');
      setLoading(false);
    }
  };

  const formatMonthlyData = (data) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return data.map(item => ({
      month: months[item._id.month - 1],
      revenue: parseFloat(item.revenue.toFixed(2)),
      orders: item.orders
    })).reverse(); // Show oldest to newest
  };

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const COLORS = {
    category: [
      '#d8bfd8', // light purple for moisturizer

      '#c2d6a4', // Darker yellow-green for serum
      '#9fd6e3', // Darker blue for sunscreen
      '#c76e91',  // Darker rose for toner
      '#808080'  // Grey for toner
    ],
    
    barChart: {
      bars: [
        '#d15c8a', // Darker pink
        '#eaf2d7', // Yellow-green
        '#9fd6e3', // Darker blue
        '#c76e91'  // Darker rose
      ],
      revenue: '#d15c8a',    // Darker pink for revenue
      orders: '#9fd6e3'      // Darker blue for orders
    }
    
  };

  const gradientOffset = () => {
    if (!analytics?.monthlyRevenue?.length) return 0;
    const dataMax = Math.max(...analytics.monthlyRevenue.map(item => item.revenue));
    const dataMin = Math.min(...analytics.monthlyRevenue.map(item => item.revenue));
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  };

  const formatCategoryData = (categoryPerformance, categories) => {
    // Ensure all categories are represented
    return categories.map(category => {
      const categoryData = categoryPerformance.find(item => item._id === category);
      return {
        _id: category,
        revenue: categoryData ? categoryData.revenue : 0,
        totalSold: categoryData ? categoryData.totalSold : 0
      };
    });
  };

  if (loading) return <div className="loading-state" style={{color: '#000'}}>Loading analytics data...</div>;
  if (error) return <div className="error-state" style={{color: '#000'}}>{error}</div>;
  if (!analytics) return null;

  return (
    <div className="home-container">
      <Header />

      <main className="analytics-content" style={{color: '#000'}}>
        <h1 className="page-title">Sales Analytics</h1>

        <div className="stats-overview">
          <div className="stats-card">
            <h3>Total Revenue</h3>
            <p className="stats-number">
              {formatCurrency(analytics.salesStats.totalRevenue)}
            </p>
          </div>
          <div className="stats-card">
            <h3>Total Orders</h3>
            <p className="stats-number">
              {analytics.salesStats.totalOrders}
            </p>
          </div>
          <div className="stats-card">
            <h3>Average Order Value</h3>
            <p className="stats-number">
              {formatCurrency(analytics.salesStats.averageOrderValue)}
            </p>
          </div>
        </div>

        <div className="charts-container" style={{ 
          maxWidth: '900px',  // Reduced from default width
          margin: '0 auto',   // Center the container
          padding: '0 20px'   // Add some padding on sides
        }}>
          {/* Monthly Revenue Bar Chart */}
          <div className="chart-section" style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            <h2>Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={350}>  {/* Reduced height */}
              <BarChart
                data={formatMonthlyData(analytics.monthlyRevenue)}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: '#000', fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#000' }}
                  label={{ 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -5,
                    style: { 
                      fill: '#000', 
                      fontSize: 13,
                      fontWeight: 500,
                      textAnchor: 'middle',
                      paddingLeft: '20px'
                    }
                  }}
                  padding={{ left: 20 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e83e8c',
                    borderRadius: '4px',
                    padding: '10px',
                    color: '#000'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', color: '#000' }}/>
                <Bar 
                  dataKey="revenue" 
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                >
                  {
                    formatMonthlyData(analytics.monthlyRevenue).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS.category[index % COLORS.category.length]}
                      />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Performance Chart */}
          <div className="chart-section" style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            <h2>Top Products by Revenue</h2>
            <ResponsiveContainer width="100%" height={350}>  {/* Reduced height */}
              <BarChart
                data={analytics.productPerformance.slice(0, 5)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  type="number" 
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#000' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                  tick={{ fill: '#000', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e83e8c',
                    borderRadius: '4px',
                    padding: '10px',
                    color: '#000'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', color: '#000' }}/>
                <Bar 
                  dataKey="revenue" 
                  name="Revenue"
                >
                  {analytics.productPerformance.slice(0, 5).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS.barChart.bars[index % COLORS.barChart.bars.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance Pie Chart */}
          <div className="chart-section" style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 2rem'
            
          }}>
            <h2>Revenue by Category</h2>
            <ResponsiveContainer width="100%" height={350}>  {/* Reduced height */}
              <PieChart>
                <Pie
                  data={formatCategoryData(analytics.categoryPerformance, analytics.categories)}
                  dataKey="revenue"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  
                  outerRadius={130}  // Reduced radius for pie chart
                  label={({ name, percent }) => 
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {analytics.categories.map((category, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.category[index % COLORS.category.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [
                    formatCurrency(value),
                    `Category: ${name}`
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: `1px solid ${COLORS.category[0]}`,
                    borderRadius: '4px',
                    padding: '10px',
                    color: '#222',
                    fontWeight: 500
                  }}
                />
                <Legend 
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{
                    color: '#222',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Analytics; 