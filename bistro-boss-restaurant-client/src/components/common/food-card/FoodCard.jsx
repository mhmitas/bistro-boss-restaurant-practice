import React, { useContext } from 'react';
import { OrderContext } from '../../../pages/order/order';
import toast from 'react-hot-toast';

const FoodCard = ({ item }) => {
    let { name, image, price, recipe, category, _id } = item;
    const { handleAddToCart, cartItemIds } = useContext(OrderContext)
    const isExists = cartItemIds.includes(_id)
    function handleClick() {
        if (isExists) {
            return toast('Already Exists in cart')
        }
        handleAddToCart(_id)
    }
    return (
        <div>
            <div className="card bg-base-100 shadow-md rounded-md">
                <figure className='relative'>
                    <span className='badge badge-neutral badge-lg rounded-md p-4 absolute top-4 right-4'>${price}</span>
                    <img src={image} alt="" className="w-full" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name.slice(0, 18)} ({category})</h2>
                    <p className="">{recipe.slice(0, 66)}</p>
                    <div className='card-actions justify-center mt-2'>
                        <button onClick={handleClick} className='uppercase btn btn-warning btn-outline font-semibold rounded-sm border-0 border-b-2 btn-sm'>{isExists ? 'Added' : 'Add to cart'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;


/**
category
: 
"dessert"
image
: 
"https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg"
name
: 
"Chicken and Walnut Salad"
price
: 
13.5
recipe
: 
"Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus"
_id
: 
"6651507290a3098e97c1480a"

 */