import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../hooks/useAxios';
import toast from 'react-hot-toast';

const GoogleSignin = ({ from }) => {
    const navigate = useNavigate()
    const { popupSignIn } = useAuth()
    const googleProvider = new GoogleAuthProvider()
    function handlePopupSignIn() {
        popupSignIn(googleProvider)
            .then(async (result) => {
                const userInfo = {
                    user: result.user?.displayName,
                    email: result.user?.email,
                    uid: result.user?.uid
                }
                const res = await axiosInstance.post('/users', userInfo)
                res.data?.insertedId && toast.success('Login success')
                console.log(result);
                navigate(from ? from : '/')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <button
                onClick={() => handlePopupSignIn(googleProvider)}
                className="btn btn-outline btn-icon btn-google">
                <FaGoogle className='text-xl' /> Google
            </button>
        </div>
    );
};

export default GoogleSignin;