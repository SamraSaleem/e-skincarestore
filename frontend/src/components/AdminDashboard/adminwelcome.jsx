import React from "react";
import "./admin.css";
import Footer from "./Footer";
import samLogo from "../../images/sam.jpeg";
import PageTransition from "./PageTransition";
import { motion } from 'framer-motion';
import Header from "./Header";

const AdminWelcome = () => {
  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Animation variants for the logo
  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.2,
        delay: 0.3
      }
    }
  };

  // Animation variants for the welcome title
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for the quote container
  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <PageTransition>
      <>
        
            <Header />
           
        

        <main className="welcome-content-white">
          <div className="welcome-container-simple">
            <motion.img 
              src={samLogo} 
              alt="SAM E GlowCo Logo" 
              className="welcome-logo-large"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            />
            
            <motion.h1 
              className="welcome-title-elegant"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Welcome to SAM E GlowCo Admin Dashboard
            </motion.h1>

            <motion.div 
              className="quote-container-elegant"
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <p className="quote-text-elegant">
                "Beauty begins the moment you decide to be yourself. At SAM E GlowCo, 
                we believe in enhancing your natural radiance with products that care 
                for your skin as much as you do."
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </>
    </PageTransition>
  );
};

export default AdminWelcome;
