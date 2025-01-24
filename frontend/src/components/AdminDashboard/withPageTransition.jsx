import React from 'react';
import PageTransition from './PageTransition';

const withPageTransition = (WrappedComponent) => {
  return function WithPageTransition(props) {
    return (
      <PageTransition>
        <WrappedComponent {...props} />
      </PageTransition>
    );
  };
};

export default withPageTransition; 