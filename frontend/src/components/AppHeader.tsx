import Avatar from 'react-avatar';
import { User } from "../models/User.model";
import CostumLink from '../components/ActiveLink'
import LogoSvg from '../assets/logo.svg'
import { ReactSVG } from 'react-svg'
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

export default function AppHeader({ loggedUser, logout }: { loggedUser: User | null, logout: () => void }) {

    const navigate = useNavigate()

    const onLogout = () => {
        logout()
    }

    return (
        <header className="app-header main-layout">
            <ReactSVG data-for="main" data-tip="Home" onClick={() => navigate('/home')} className="logo" src={LogoSvg} />
            <ReactTooltip id='main' />
            <nav className="nav-bar">
                <CostumLink to="/home">Home</CostumLink>
                <CostumLink to="/todo">Todos</CostumLink>
            </nav>
            {!loggedUser && <CostumLink to="/login">Login</CostumLink>}
            {loggedUser &&
                <div data-for="main" data-tip="Logout"><Avatar className="avatar" onClick={onLogout} size="30" round={true} name={loggedUser.name} /></div>}
            <ReactTooltip id='main' />
        </header>
    )
}