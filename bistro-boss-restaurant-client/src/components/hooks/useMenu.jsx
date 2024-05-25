import React, { useEffect, useState } from 'react';
import { axiosInstance } from './useAxios';


const useMenu = (category = '', limit = 0) => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        axiosInstance.get(`/menu?category=${category}&limit=${limit}`)
            .then(res => {
                setMenu(res.data)
            }).catch((err) => {
                console.error(err);
            })
    }, [])
    return [menu]
};

export default useMenu;


/*
axios.get(`${import.meta.env.VITE_URL}/menu?category=${category}&limit=${limit}`)
*/