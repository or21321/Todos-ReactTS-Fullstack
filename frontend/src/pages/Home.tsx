import { Navigate, useOutletContext } from "react-router-dom";
import { useUser } from "../App";
import { User } from "../models/User.model";

export default function Home() {
    // Auth guard:
    const { loggedUser } = useUser()
    if (!loggedUser) return <Navigate to="/login?msg=Please login to see that page" />

    return (
        <main className="home-page main-layout">
            <h1>HOME</h1>
            {loggedUser && <div>Hello, {loggedUser.name}</div>}
        </main>
    )
}