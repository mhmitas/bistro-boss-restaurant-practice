import React from 'react';
import { useCartsFromMenu } from '../../../components/hooks/useCart';
import Container from '../../../components/Container';
import { FaTrashAlt } from "react-icons/fa";

const UserCart = () => {
    const { cartItems } = useCartsFromMenu()

    function handleDelete(id) {
        console.log(id);
    }

    return (
        <Container>
            <p>{cartItems.length}</p>

            <div className="overflow-x-auto">
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