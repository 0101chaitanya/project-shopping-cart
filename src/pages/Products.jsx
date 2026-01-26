import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { getProducts } from '../store/slices/productSlice';


function Products() {
    let dispatch = useDispatch();
    let products_list = useSelector((state) => state.products.items);
    let is_loading = useSelector((state) => state.products.loading);
    let error_msg = useSelector((state) => state.products.error);

    useEffect(() => {
        
        dispatch(getProducts());
    }, [dispatch]);

    
    if (is_loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    
    if (error_msg) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Failed to Load Products</h4>
                    <p>{error_msg}</p>
                    <hr />
                    <button
                        className="btn btn-danger"
                        onClick={() => dispatch(getProducts())}
                    >
                        Retry
                    </button>
                </div>
                <div className="text-muted mt-3">
                    <small>
                        If this error persists, please ensure that:
                        <ul>
                            <li>You have an active internet connection</li>
                            <li>fakestoreapi.com is accessible</li>
                            <li>Your browser allows cross-origin requests</li>
                        </ul>
                    </small>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">Products ({products_list.length})</h1>
            <div className="row g-4">
                {products_list.map((product) => {
                    return (
                    <div key={product.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm" style={{border: '1px solid #ddd', borderRadius: '4px'}}>
                            <div
                                style={{
                                    height: '250px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
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
                                            View Details
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                
                                                dispatch(addToCart(product));
                                                
                                            }}
                                            style={{marginLeft: '5px'}}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;





