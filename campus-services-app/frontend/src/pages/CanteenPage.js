import React from 'react';
import CanteenMenu from '../components/Canteen/CanteenMenu';
import CanteenOrder from '../components/Canteen/CanteenOrder';
import CanteenReview from '../components/Canteen/CanteenReview';

const CanteenPage = () => {
    return (
        <div>
            <h1>Canteen Services</h1>
            <CanteenMenu />
            <CanteenOrder />
            <CanteenReview />
        </div>
    );
};

export default CanteenPage;