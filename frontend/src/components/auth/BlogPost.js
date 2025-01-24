import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './auth.css';

const BlogPost = () => {
  const { id } = useParams();

  const blogContent = {
    1: {
      title: "The Ultimate Skincare Routine Guide",
      category: "Skincare Tips",
      image: "https://glowgirlnutrition.com/cdn/shop/files/bookcover_8d0bf9d3-7cbb-4f56-b1ef-584d991b145b.jpg?v=1724645055",
      content: [
        {
          type: "section",
          title: "Morning Skincare Routine",
          content: [
            {
              subtitle: "Step 1: Cleanser",
              text: "An essential step for both morning and night, cleansers allow you to remove any unwanted dirt and debris, leaving you with a clean base to start applying the rest of your skin care products. To use, dampen your face and gently rub a small amount of the formula onto your skin, then rinse with lukewarm water."
            },
            {
              subtitle: "Step 2: Toner",
              text: "Offering your skin the TLC it deserves, toners are crucial to your post-cleanse ritual. Dissolving dead cells and locking in moisture, the featherweight formulas tighten pores, balance skin tones and dial up brightness."
            },
            {
              subtitle: "Step 3: Serum",
              text: "Targeting specific skin concerns, serums deliver potent, problem-solving solutions. Highly concentrated, the lightweight liquids are typically either water or oil based, allowing them to be easily absorbed."
            },
            {
              subtitle: "Step 4: Moisturizer",
              text: "Keeping your complexion hydrated, moisturising is a must in every skin care routine. Powered by skin-loving ingredients to provide benefits such as softness and subtle shine."
            },
            {
              subtitle: "Step 5: SPF",
              text: "A crucial step to any skin care routine, SPF shields your skin from damaging UV rays while preventing textural imbalance. Should be worn everyday and applied at least 15 minutes before sun exposure."
            }
          ]
        },
        {
          type: "section",
          title: "Evening Skincare Routine",
          content: [
            {
              subtitle: "Step 1: Double Cleanse",
              text: "Double cleansing removes makeup and sunscreen first, then cleanses the skin itself. Mix and match cleansing balms with foaming cleansers for best results."
            },
            {
              subtitle: "Step 2: Toner",
              text: "Use the same toning technique as morning, but consider a more treatment-focused formula for nighttime use."
            },
            {
              subtitle: "Step 3: Treatment",
              text: "Night is the best time to use active ingredients like retinol, AHAs, or other treatments as your skin is in repair mode."
            },
            {
              subtitle: "Step 4: Night Cream",
              text: "Use a richer moisturizer at night to support your skin's natural repair process while you sleep."
            }
          ]
        }
      ]
    },
    2: {
      title: "Natural Ingredients in Skincare",
      category: "Product Knowledge",
      image: "https://i0.wp.com/blog.themomsco.com/wp-content/uploads/2022/08/5c2ac-7-natural-skincare-ingredients-that-will-transform-your-skin-1-scaled-1.jpg",
      content: [
        {
          type: "section",
          title: "Understanding Natural Skincare",
          content: [
            {
              subtitle: "What Makes Skincare Natural?",
              text: "Natural skin care products typically do not contain chemicals or synthetic ingredients. Instead, they focus on botanically sourced ingredients like plant extracts, essential oils, and natural minerals. These products often include environmentally friendly options that are both effective and sustainable."
            },
            {
              subtitle: "Benefits of Natural Ingredients",
              text: "Natural skincare ingredients can be rich in vitamins, antioxidants, essential oils, hydrocolloids, proteins, and bioactive compounds. These elements work together to nourish and protect your skin while potentially offering a safer, more eco-conscious alternative to synthetic products."
            }
          ]
        },
        {
          type: "section",
          title: "Key Natural Ingredients and Their Benefits",
          content: [
            {
              subtitle: "Plant-Based Oils",
              text: "Natural oils like jojoba, argan, and rosehip provide deep hydration while helping protect the skin's natural barrier. Jojoba oil, in particular, offers anti-inflammatory, antifungal, and antioxidant properties that can help rejuvenate the skin and protect against environmental stressors."
            },
            {
              subtitle: "Botanical Extracts",
              text: "Green tea, chamomile, and aloe vera extracts are packed with antioxidants that help fight free radicals and reduce inflammation. These natural ingredients can help soothe sensitive skin and provide anti-aging benefits."
            },
            {
              subtitle: "Natural Vitamins",
              text: "Vitamins A, B2, B12, and E are commonly found in natural skincare products. These vitamins play crucial roles in skin health, from supporting collagen production to protecting against environmental damage and promoting cell regeneration."
            }
          ]
        },
        {
          type: "section",
          title: "Understanding Natural Labels",
          content: [
            {
              subtitle: "Organic vs. Natural",
              text: "While 'natural' isn't strictly regulated, organic certification ensures ingredients are grown without synthetic pesticides or fertilizers. Products can be fully certified organic or contain organic ingredients while not being certified as a whole."
            },
            {
              subtitle: "Clean Beauty",
              text: "Clean beauty typically focuses on being non-toxic and usually excludes ingredients like parabens, synthetic fragrances, and other potentially harmful chemicals. However, like 'natural,' this term isn't regulated and may mean different things to different brands."
            }
          ]
        },
        {
          type: "section",
          title: "Safety and Considerations",
          content: [
            {
              subtitle: "Shelf Life",
              text: "Natural products often have shorter shelf lives due to the absence of synthetic preservatives. Pay attention to expiration dates and watch for changes in smell, color, or texture that might indicate the product has expired."
            },
            {
              subtitle: "Patch Testing",
              text: "Even natural ingredients can cause reactions in sensitive skin. Always perform a patch test before using a new product, and remember that natural doesn't automatically mean hypoallergenic."
            },
            {
              subtitle: "Consulting Professionals",
              text: "If you have specific skin concerns or are undergoing any medical treatments, consult with a dermatologist before starting a natural skincare routine, as some natural ingredients can interact with medications or treatments."
            }
          ]
        }
      ]
    },
    3: {
      title: "Understanding Your Skin Type",
      category: "Skin Education",
      image: "https://rioari.com/wp-content/uploads/2024/07/Different-type-of-skin.jpg",
      content: [
        {
          type: "section",
          title: "Introduction to Skin Types",
          content: [
            {
              subtitle: "What Determines Your Skin Type?",
              text: "Your skin type is largely based on how much sebum (oil) your skin produces. This is primarily determined by genetics, but can also be influenced by several factors including aging, humidity, stress, and hormones. Understanding your skin type is the first step in properly caring for it."
            },
            {
              subtitle: "The Five Main Skin Types",
              text: "The American Academy of Dermatology recognizes five primary types of skin: oily, dry, normal, combination, and sensitive. Each of these skin types has unique characteristics and needs that can affect the look and feel of your complexion."
            }
          ]
        },
        {
          type: "section",
          title: "Different Skin Types Explained",
          content: [
            {
              subtitle: "Oily Skin",
              text: "Oily skin is caused by the overproduction of sebum from the skin's sebaceous glands. This can be triggered by stress, humidity, genetics, and fluctuating hormones. When the skin produces too much sebum, it can cause your face to appear shiny and feel greasy—especially throughout the T-zone (forehead, nose, and chin). Excess sebum can also clog pores, leading to breakouts."
            },
            {
              subtitle: "Dry Skin",
              text: "Dry skin generally produces less sebum than other skin types. Without sufficient natural oils, your skin may lose moisture too quickly and appear visibly dehydrated, dull, flaky, or even scaly. It often feels tight, with a rough texture and more visible fine lines. Dry skin may also become itchy or irritated."
            },
            {
              subtitle: "Normal Skin",
              text: "Normal skin means that your skin feels hydrated and comfortable, but not oily or dry. Unlike combination skin, people with normal skin don't have patches that are oily and patches that are dry. They have an overall hydrated and comfortable look with less noticeable pores and may be less prone to sensitivity."
            },
            {
              subtitle: "Combination Skin",
              text: "Combination skin means that there are some areas of your face that are dry and other areas that are more oily. Typically, the T-zone (forehead, nose, and chin) is oily, while the cheeks are drier. Combination skin can look different in each person and may vary during different seasons."
            },
            {
              subtitle: "Sensitive Skin",
              text: "Sensitive skin is more reactive than other skin types. It may be more vulnerable to external irritants and easily triggered by certain ingredients or environmental factors. People with sensitive skin may notice redness, stinging, burning, or irritation after applying skincare products."
            }
          ]
        },
        {
          type: "section",
          title: "How to Identify Your Skin Type",
          content: [
            {
              subtitle: "The 'Watch and Wait' Method",
              text: "Cleanse your face with a gentle cleanser and pat dry. Wait for 30 minutes and observe your skin. If your skin appears shiny all over, you likely have oily skin. Flaky, rough, or tight-feeling skin signals dry skin. Shine only around your T-zone indicates combination skin. If your skin feels hydrated and balanced, you probably have normal skin."
            },
            {
              subtitle: "The Blotting Sheet Method",
              text: "Press blotting sheets to various areas of your face. If the sheets absorb lots of oil from all areas, you likely have oily skin. Little to no oil indicates dry skin. Oil only from your T-zone suggests combination skin. Minimal oil from all areas typically means normal skin."
            }
          ]
        },
        {
          type: "section",
          title: "Important Tips to Remember",
          content: [
            {
              subtitle: "Skin Type Can Change",
              text: "Your skin type can change over time due to various factors including age, climate, hormones, and season. Regular assessment of your skin's needs can help you adjust your skincare routine accordingly."
            },
            {
              subtitle: "Consult a Professional",
              text: "If you're unsure about your skin type or have specific skin concerns, consider consulting a dermatologist who can provide personalized recommendations for your skin's needs."
            }
          ]
        }
      ]
    }
    // Add more blog posts content here
  };

  const post = blogContent[id];

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="page-container">
      <div className="blog-post">
        <Link to="/blogs" className="back-link">← Back to Blogs</Link>
        
        <div className="blog-post-header">
          <span className="blog-category">{post.category}</span>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} className="blog-post-image" />
        </div>

        <div className="blog-post-content">
          {post.content.map((section, index) => (
            <div key={index} className="blog-section">
              <h2>{section.title}</h2>
              {section.content.map((item, i) => (
                <div key={i} className="blog-subsection">
                  <h3>{item.subtitle}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 