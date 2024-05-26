import React from 'react';
import { useCartsFromMenu } from '../../../components/hooks/useCart';
import Container from '../../../components/Container';
import { FaTrashAlt } from "react-icons/fa";
import { axiosInstance } from '../../../components/hooks/useAxios';
import toast, { } from "react-hot-toast";

const UserCart = () => {
    const { cartItems, refetch } = useCartsFromMenu()

    function handleDelete(id) {
        const isConfirm = confirm('Do you want to remove this item')
        if (isConfirm) {
            axiosInstance.delete(`/carts/delete/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount) {
                        toast.success('Removed from cart')
                        refetch()
                    }
                }).catch(err => {
                    console.error(err);
                })
        }
    }

    return (
        <Container>
            <div className='flex justify-between my-2'>
                <h3 className="text-xl text-center ">Cart Itmes</h3>
            </div>

            <div className="overflow-x-auto bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead className='bg-base-100'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            cartItems.map((item, idx) => <ItemsTableRow
                                key={item._id}
                                item={item}
                                index={idx}
                                handleDelete={handleDelete}
                            ></ItemsTableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default UserCart;


const ItemsTableRow = ({ handleDelete, item, index }) => {
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>{item.name} ({item.category})</td>
            <td>$ {item.price}</td>
            <th>
                <button onClick={() => handleDelete(item._id)} className="btn hover:btn-error btn-xs"><FaTrashAlt size={13} /></button>
            </th>
        </tr>
    );
};

//  here i have to remember:
//  ~ ami userCart page e je item gulo show korchi egulo menu collection theke niye asa. menu collection er data gulo jokhon user cart e add korechilo tokhon ami menu coll e item golor _id ke item id hisabe save korechilam. so amar kache userCart page e je items ache ta menuColl theke niye asa. and if i want to delete this items from cart coll . amake ei _id gulo data cart coll e itemId field sarch korte hobe|