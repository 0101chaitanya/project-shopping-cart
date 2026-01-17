import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { getProducts } from '../store/slices/productSlice';

function Products() {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Failed to Load Products</h4>
                    <p>{error}</p>
                    <hr />
                    <button
                        className="btn btn-danger"
                        onClick={() => dispatch(getProducts())}
                    >
                        Retry
                    </button>
                </div>
                <p className="text-muted mt-3">
                    <small>
                        If this error persists, please ensure that:
                        <ul>
                            <li>You have an active internet connection</li>
                            <li>fakestoreapi.com is accessible</li>
                            <li>Your browser allows cross-origin requests</li>
                        </ul>
                    </small>
                </p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">Products</h1>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div
                                style={{
                                    height: '250px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title" style={{ minHeight: '50px' }}>
                                    {product.title}
                                </h5>
                                <p className="card-text text-muted text-truncate">
                                    {product.description}
                                </p>
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="h5 mb-0">${product.price}</span>
                                        <span className="badge bg-warning">
                                            ⭐ {product.rating.rate}
                                        </span>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="btn btn-outline-primary flex-grow-1"
                                        >
                                            View
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => dispatch(addToCart(product))}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
