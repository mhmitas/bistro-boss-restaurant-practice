import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxios";
import useAuth from "../../hooks/useAuth";

const useCart = () => {
    const { user } = useAuth()
    //  Tanstack query is fetching data
    const { data: cartItems = [], refetch } = useQuery({
        queryKey: ['carts', user],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/carts/${user?.uid}`)
            return data
        }
    })
    return { cartItems, refetch }
};

export default useCart;

export const useCartsFromMenu = () => {
    const { user } = useAuth()
    //  Tanstack query is fetching data
    const { data: cartItems = [], refetch } = useQuery({
        queryKey: ['carts_from_menu', user],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/menu/carts/${user?.uid}`)
            return data
        }
    })
    return { cartItems, refetch }
};