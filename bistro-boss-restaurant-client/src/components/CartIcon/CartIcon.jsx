import React from 'react';
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = ({ count }) => {
    return (
        <div className='mx-6 indicator'>
            <FaShoppingCart size={28} />
            <span className="indicator-item badge text-xl font-semibold badge-secondary">{count}</span>
        </div>
    );
};

export default CartIcon;