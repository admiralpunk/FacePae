import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-top">
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/dashboard.svg" alt="" className="sidebar-img " />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/ordrs.svg" className="sidebar-img " />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/menu.svg" className="sidebar-img " />
                        <span>Menu</span>
                    </NavLink>
                    {/* <NavLink to="/staff" className={({ isActive }) => (isActive ? "active" : "")}>
                            <img src="/staff.svg" className="sidebar-img "/>
                            <span>Staff</span>
                            </NavLink> */}
                </div>

                <div className="sidebar-bottom">
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/settings.svg" className="sidebar-img " />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Sidebar;