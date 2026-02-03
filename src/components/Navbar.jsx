

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import './Navbar.css';


function Navbar() {
    let dispatch = useDispatch();

    
    let num_items = useSelector((state) => state.cart.totalQuantity);
    let is_authenticated = useSelector((state) => state.auth.isAuthenticated);
    let user_name = useSelector((state) => state.auth.user);

    
    let handleLogout = () => {
        dispatch(logout());
        
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style={{boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff6b6b'}}>
                    <span className="fw-bold">Chaitanya Kart</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/features" style={{cursor: 'pointer'}}>
                                Features
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Browse
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/users">
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/carts">
                                        All Carts
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart" style={{position: 'relative'}}>
                                Cart <span className="badge bg-danger" style={{marginLeft: '5px'}}>{num_items}</span>
                            </Link>
                        </li>
                        {is_authenticated ? (
                            <li className="nav-item d-flex align-items-center">
                                <span className="nav-link" style={{marginRight: '10px', padding: '0'}}>
                                    Welcome, <strong>{user_name}</strong>
                                </span>
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={handleLogout}
                                    style={{border: 'none', cursor: 'pointer', padding: '0'}}
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" style={{color: '#ff6b6b'}}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



