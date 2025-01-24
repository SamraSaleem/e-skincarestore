import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isWelcomePage = location.pathname === '/admin-dashboard';
  
  // Find the header element in children and exclude it from animation
  const childArray = React.Children.toArray(children);
  const header = childArray.find(child => 
    child.type && (child.type === 'header' || child.props?.className?.includes('admin-header'))
  );
  const otherContent = childArray.filter(child => 
    !child.type || (child.type !== 'header' && !child.props?.className?.includes('admin-header'))
  );

  useEffect(() => {
    if (isWelcomePage) {
      setIsLoading(false); // No loading for welcome page
      return;
    }

    // Loading timer for other pages
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [isWelcomePage]);

  return (
    <>
      {header}
      <AnimatePresence>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {otherContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;