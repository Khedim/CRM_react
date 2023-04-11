import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export const RoutLayout = () => {
    return <>
        <Navbar />
        <div className="container">
            <Outlet />
        </div>
    </>
}