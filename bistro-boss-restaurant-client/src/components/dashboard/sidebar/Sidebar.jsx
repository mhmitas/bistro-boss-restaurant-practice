import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaBook, FaCalendar, FaHome, FaList, FaRegCalendarCheck, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'
import { MdMenuBook, MdReviews } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';


const Sidebar = () => {
    // const { user } = useAuth()

    const userNavLinks = <>
        <li>
            <NavLink to="/dashboard/user-home"><FaHome className='text-lg' />My Home</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/reservation"><FaCalendar className='text-lg' />Reservation</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/cart"><FaShoppingCart className='text-lg' /> My Cart</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/review"><MdReviews className='text-lg' />Add Review</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/review"><FaRegCalendarCheck className='text-lg' />My Booking</NavLink>
        </li>
    </>
    const adminNavLinks = <>
        <li>
            <NavLink to="/dashboard/admin-home"><FaHome className='text-lg' />Admin Home</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/add-items"><ImSpoonKnife className='text-lg' />Add Items</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/manage-items"><FaList className='text-lg' />Manage Items</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/manage-bookings"><FaBook className='text-lg' />Manage Bookings</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/manage-users"><FaUsers className='text-lg' />Manage Users</NavLink>
        </li>
    </>

    // let isAdmin = true;
    // const [admin, isPending] = useAdmin()
    const { user } = useAuth()
    const { data: admin, isPending } = useQuery({
        queryKey: ['isAdmin', user],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/admin/${user?.uid}`)
            console.log(res.data);
            return res.data.admin
        }
    })

    return (
        <ul className="menu p-4 lg:w-72 w-60 min-h-full bg-base-300 text-base-content">

            {/* Sidebar content here */}
            <label
                htmlFor="my-drawer-2" className="btn btn-sm btn-ghost absolute top-4 right-4 z-10 sm:hidden"><RxCross1 size={16}
                />
            </label>
            <Link to="/" className="text-2xl p-4 font-semibold cursor-pointer">Bistro Boss</Link>
            {isPending ?
                <h3 className='text-xl'>Loading...</h3>
                :
                admin ?
                    adminNavLinks
                    :
                    userNavLinks
            }

            <div className="divider divider-neutral"></div>
            {/* SHARED Navlinks */}
            <li>
                <NavLink to="/"><FaHome className='text-lg' />home</NavLink>
            </li>
            <li>
                <NavLink to="/menu"><MdMenuBook className='text-lg' />menu</NavLink>
            </li>
        </ul>
    );
};

export default Sidebar;

/*
<li className='hidden'>
    <div className='flex items-center'>
        <div className="avatar">
            <div className="w-9 rounded-full">
                <img src={user?.photoURL} alt="" />
            </div>
        </div>
        <div className='flex flex-col'>
            <span>{user?.displayName}</span>
            <span className='text-xs'>{user?.email}</span>
        </div>
    </div>
</li>
*/