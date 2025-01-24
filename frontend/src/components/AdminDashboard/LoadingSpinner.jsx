import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../images/logo.png';
import { useLocation } from 'react-router-dom';

const LoadingSpinner = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/admin-dashboard';

  if (isWelcomePage) {
    return null;
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // White with 90% opacity
       
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={logo}
        alt="Loading..."
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'contain'
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner; 