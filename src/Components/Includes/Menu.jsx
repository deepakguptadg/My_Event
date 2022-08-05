import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserInfo } from '../Context/UserData'
const Menu = () => {
    const navigate = useNavigate()
    const {user, logout} = useUserInfo()
    const handleLogout  = async () => {
        try {
            await logout();
            navigate('/login')
            alert('Logout Succesfully !!')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/" className="brand-link text-center">
                    <span className="brand-text font-weight-bold">My Event Web</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={user && user.photoURL} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <Link to="/" className="d-block">{user && user?.displayName}</Link>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview menu-open">
                                <Link to="/" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/my-events" className="nav-link">
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        My Events
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/my-notes" className="nav-link">
                                    <i className="nav-icon fas fa-book" />
                                    <p>
                                        My Notes
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/add-event" className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Add Events
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="add-notes" className="nav-link">
                                    <i className="nav-icon far fa-image" />
                                    <p>
                                        Add Notes
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" onClick={(e) => handleLogout()} className="nav-link">
                                    <i className="nav-icon fas fa-sign-out" />
                                    <p>
                                        Logout
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    )
}

export default Menu