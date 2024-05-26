import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';

const CartIcon = () => {
    const { cartItems } = useCart()
    return (
        <Link to='/dashboard/cart'>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mx-4">
                <div className='indicator'>
                    <FaShoppingCart size={23} />
                    <span className="indicator-item badge text-lg font-semibold text-secondary">{cartItems.length}</span>
                </div>
            </div>
        </Link>
    );
};

export default CartIcon;