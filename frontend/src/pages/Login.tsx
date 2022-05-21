import { FormEventHandler, SyntheticEvent, useEffect } from 'react';
import { useFormRegister } from '../hooks/useFormRegister.js'
import { authService } from '../services/auth.service.js';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../store/slices/user-slice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffectUpdate } from '../hooks/useEffectUpdate'

export default function Login() {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryMsg = searchParams.get('msg')
    // useEffectUpdate to save on setup, only after mount display message:
    useEffectUpdate(() => {
        if (queryMsg) toast.warn(queryMsg, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }, [])


    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [credentials, register] = useFormRegister({ username: '', password: '', name: '' })

    async function onSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await dispatch(login(credentials))
        navigate('/home')
        toast.success('You have logged in succesfully!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return (
        <main className="login-page main-layout">
            <form onSubmit={onSubmit}>
                <input required placeholder='Username' type="text" {...register('username')} />
                <input pattern="^(\w\w+)\s(\w+)$" required placeholder='Full Name' type="text" {...register('name')} />
                <input required placeholder='Password' type="password" {...register('password')} />
                <button className='btn-submit'>Login</button>
            </form>
        </main>
    )
}