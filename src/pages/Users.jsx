import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../store/slices/usersSlice';

function Users() {
    const dispatch = useDispatch();
    const { list: users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
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
                    <h4 className="alert-heading">Failed to Load Users</h4>
                    <p>{error}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => dispatch(getUsers())}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">Users ({users.length})</h1>
            <div className="row g-4">
                {users.map((user) => (
                    <div key={user.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="badge bg-primary me-2">{user.id}</span>
                                    {user.username}
                                </h5>
                                <p className="card-text text-muted">
                                    <small>{user.email}</small>
                                </p>
                                <p className="card-text mb-3">
                                    <small className="text-muted">{user.phone}</small>
                                </p>
                                {user.address && (
                                    <p className="card-text mb-3">
                                        <small className="text-muted">
                                            📍 {user.address.city}
                                        </small>
                                    </p>
                                )}
                                <Link
                                    to={`/users/${user.id}`}
                                    className="btn btn-danger w-100"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;
