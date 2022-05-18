import { Credentials } from "../models/Credentials.model"
import { User } from "../models/User.model";
import { utilService } from "./util.service";

const KEY = 'loggedUser'

export const authService = {
    login,
    logout,
    getLoggedUser
}

function login(credentials: Credentials) {
    const { username, password, name } = credentials
    const user = { _id: utilService.makeId(), username, password, name }
    sessionStorage.setItem(KEY, JSON.stringify(user))
    return Promise.resolve()
}

function logout() {
    sessionStorage.setItem(KEY, '')
    return Promise.resolve()
}

function getLoggedUser(): Promise<User | null> {
    let loggedUser = sessionStorage.getItem(KEY)
    return Promise.resolve(loggedUser ? JSON.parse(loggedUser) : null)
}
