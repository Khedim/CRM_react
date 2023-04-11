import { useSelector } from "react-redux"
import { Outlet } from 'react-router-dom'
import { LogIn } from "../pages/LogIn"

export const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector(state => state.state)

    return isAuthenticated ? <Outlet /> : <LogIn />
}