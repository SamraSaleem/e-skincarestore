import React from 'react';
import './auth.css';

const FAQs = () => {
  const faqs = [
    {
      question: "What is SAM E GLOW?",
      answer: "SAM E GLOW is a premium skincare brand offering high-quality, natural beauty products designed to enhance your natural radiance. Our products are carefully formulated with natural ingredients and are cruelty-free."
    },
    {
      question: "How do I choose the right products for my skin type?",
      answer: "We recommend starting with our skin type guide available on our website. You can also contact our skincare experts who can provide personalized recommendations based on your skin type and concerns."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Yes, all SAM E GLOW products are 100% cruelty-free. We never test on animals and work only with suppliers who maintain the same ethical standards."
    },
    {
      question: "What are your shipping times?",
      answer: "We process orders within 24-48 hours. Standard shipping typically takes 3-5 business days within Pakistan. International shipping times vary by location."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check specific shipping rates during checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in their original packaging. Please refer to our Return & Refund Policy page for detailed information."
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>

      <div className="content-section">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs; 