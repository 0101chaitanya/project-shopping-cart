

import { Link } from 'react-router-dom';


function Home() {
    return (<><div className="container-fluid bg-light py-5">
        <div className="container text-center">
            <h1 className="display-4 fw-bold mb-4">Welcome to Chaitanya Kart</h1>
            <p className="lead mb-5">
                Full-featured e-commerce platform powered by FakeStoreAPI
            </p>
            <div className="d-flex gap-3 justify-content-center">
                <Link to="/products" className="btn btn-danger btn-lg">
                    Start Shopping
                </Link>
                <Link to="/features" className="btn btn-outline-danger btn-lg">
                    View All Features
                </Link>
            </div>
        </div>
    </div><div className="container py-5">
            <div className="row g-4">
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <h2>🛍️</h2>
                    </div>
                    <h5>20+ Products</h5>
                    <p className="text-muted">
                        Browse through a diverse selection of products with detailed information
                    </p>
                </div>
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <h2>👥</h2>
                    </div>
                    <h5>User Management</h5>
                    <p className="text-muted">
                        Explore user profiles and view their shopping carts
                    </p>
                </div>
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <h2>🔐</h2>
                    </div>
                    <h5>Secure Login</h5>
                    <p className="text-muted">
                        JWT authentication with secure user sessions
                    </p>
                </div>
            </div>
        </div></>);
}

export default Home;




