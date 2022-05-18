import AppHeader from './components/AppHeader'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { useAppSelector } from './hooks/useAppSelector'
import { User } from './models/User.model'
import { toast, ToastContainer } from 'react-toastify';
import { authService } from './services/auth.service';
import { useAppDispatch } from './hooks/useAppDispatch'
import { logout } from './store/slices/user-slice';

type ContextType = { loggedUser: User | null };
export function useUser() {
  return useOutletContext<ContextType>();
}

function App() {
  const loggedUser = useAppSelector<User | null>((state) => state.userSlice.loggedUser)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLogout = async () => {
    await dispatch(logout())
    navigate('/login')
    toast.success('You have logged out succesfully!', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  }

  return (
    <div className="App">
      <AppHeader logout={onLogout} loggedUser={loggedUser} />
      <Outlet context={{ loggedUser }} />
      <ToastContainer />
    </div>
  )
}

export default App
