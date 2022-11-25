import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './Checkout';
const stripePromise = loadStripe('pk_test_51M5wpFGyVf5jkl9QTtkwnZmOVKTZRkaSAxWuJmIxmgn4WtP42dMUk0cW3zSScgA2hRSeqWZbKyocHoP0AwFpTFOX005OcSsQf1');


const Payment = () => {
    const phone = useLoaderData();
    return (
        <div className='w-1/2 mx-auto py-6'>
            <Elements stripe={stripePromise}>
                <CheckoutForm product={phone} />
            </Elements>
        </div>
    );
};

export default Payment;