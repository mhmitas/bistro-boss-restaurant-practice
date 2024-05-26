import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Container from '../../../../components/Container';
import { FaTrashAlt, FaUserAlt } from 'react-icons/fa';
import { axiosInstance } from '../../../../components/hooks/useAxios';

const ManageUsers = () => {

    const { data: users = [], isPending, refetch, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/users')
            // console.log(data);
            return data
        }
    })

    async function handleDelete(id) {
        const isConfirm = confirm('Are you sure you want to delete this user?')
        if (!isConfirm) {
            return
        }
        try {
            const { data } = await secureAxiosInstance.delete(`/users/delete/${id}`)
            console.log(data);
            refetch()
        } catch (err) {
            console.error(err);
        }
    }

    async function handleMakeAdmin(_id) {
        if (!confirm('Do you want to make this user admin')) { return }
        try {
            const { data } = await secureAxiosInstance.patch(`/users/admin/${_id}`, { role: 'admin' })
            console.log(data);
            refetch()
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <Container>
            <div className='flex justify-between mb-6'>
                <h3 className="text-2xl text-center ">All Users</h3>
                <h3 className="text-xl text-center ">Total Users: {users.length}</h3>
            </div>
            <div className="overflow-x-auto bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead className='bg-base-100'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            users.map((user, idx) => <ItemsTableRow
                                key={user._id}
                                user={user}
                                index={idx}
                                handleDelete={handleDelete}
                                handleMakeAdmin={handleMakeAdmin}
                            ></ItemsTableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

const ItemsTableRow = ({ handleDelete, user, index, handleMakeAdmin }) => {
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>{user.user} </td>
            <td>{user.email}</td>
            <td>
                {
                    user?.role === 'admin' ?
                        <span className='badge badge-primary'>Admin</span>
                        :
                        <button onClick={() => handleMakeAdmin(user._id)} className='btn  btn-ghost btn-xs' title='Make admin'><FaUserAlt /></button>
                }
            </td>
            <th>
                <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs"><FaTrashAlt /></button>
            </th>
        </tr>
    );
};


export default ManageUsers;