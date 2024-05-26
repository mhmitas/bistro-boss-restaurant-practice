import React, { createContext, useEffect, useState } from 'react';
import MenuCover from '../../components/common/menu-cover/MenuCover';
import OrderTabContents from './tab/OrderTabContents';
import TabName from '../../components/common/tab-name/TabName';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../components/hooks/useAxios';
import LoadingSpinner from '../../components/common/loadingState/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
export const OrderContext = createContext(null)
import toast, { } from "react-hot-toast";
import useCart from '../../components/hooks/useCart';


const tabs = [
    { tabName: 'All', category: '' },
    { tabName: 'Salad', category: 'salad' },
    { tabName: 'Dessert', category: 'dessert' },
    { tabName: 'Pizza', category: 'pizza' },
    { tabName: 'Soup', category: 'soup' },
]


const Order = () => {
    const { cartItems, refetch } = useCart()
    const cartItemIds = cartItems.map(i => i.itemId)
    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')

    const { data: menu = [], isLoading } = useQuery({
        queryKey: ['menu', category],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/menu?category=${category}&limit=0`)
            return data
        }
    })

    async function handleAddToCart(item) {
        const itemData = {
            itemId: item._id,
            userId: user?.uid,
            userEmail: user?.email
        }
        const { data } = await axiosInstance.post('/carts', itemData)
        if (data.insertedId) {
            toast.success('Added to the cart')
            console.log(data);
            refetch()
        }
    }

    const foodCardData = { handleAddToCart, cartItemIds }

    return (
        <div>
            <MenuCover image="https://i.ibb.co/6FSDVxD/banner2.jpg" title="Order food"></MenuCover>

            <div className='m-12 mb-10'>
                <div role="tablist" className="tabs tabs-bordered w-max mx-auto *:text-lg font-semibold">
                    {
                        tabs.map(tab => <TabName tab={tab} key={tab.category} />)
                    }
                </div>
                {/* <div>Total Items: {menu.length}</div> */}
            </div>
            {
                isLoading ?
                    <div className='h-screen relative'><LoadingSpinner /></div>
                    :
                    <OrderContext.Provider value={foodCardData}>
                        <OrderTabContents category={menu}></OrderTabContents>
                    </OrderContext.Provider>
            }
        </div >
    );
};

export default Order;


//  ekhane ekta problem hoyechilo je : ami qieryKey er moddhe searchParams.get() na diye direct search params diye diyechilam