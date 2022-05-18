import Avatar from 'react-avatar';
import { User } from "../models/User.model";
import CostumLink from '../components/ActiveLink'
import LogoSvg from '../assets/logo.svg'
import { ReactSVG } from 'react-svg'
import { useNavigate } from 'react-router-dom';

export default function AppHeader({ loggedUser, logout }: { loggedUser: User | null, logout: () => void }) {

    const navigate = useNavigate()

    const onLogout = () => {
        logout()
    }

    return (
        <header className="app-header main-layout">
            <ReactSVG onClick={() => navigate('/home')} className="logo" src={LogoSvg} />
            <nav className="nav-bar">
                <CostumLink to="/home">Home</CostumLink>
                <CostumLink to="/todo">Todos</CostumLink>
            </nav>
            {!loggedUser && <CostumLink to="/login">Login</CostumLink>}
            {loggedUser && <Avatar className="avatar" onClick={onLogout} size="30" round={true} name={loggedUser.name} />}
        </header>
    )
}