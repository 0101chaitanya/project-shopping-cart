import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, loginUser } from '../store/slices/authSlice';


function Login() {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    
    let loading = useSelector((state) => state.auth.loading);
    let error = useSelector((state) => state.auth.error);
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    if (isAuthenticated) {
        navigate('/dashboard');
    }

    
    let handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError());

        
        let result = await dispatch(loginUser({ username, password }));

        
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/dashboard');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            
                                        }}
                                        required
                                        disabled={loading}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            
                                        }}
                                        required
                                        disabled={loading}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            <div className="mt-4 text-center text-muted">
                                <p className="fw-bold mb-2">Demo Credentials:</p>
                                <small>username: mor_2314</small>
                                <br />
                                <small>password: 83r5^_</small>
                                <hr className="my-3" />
                                <p className="fw-bold mb-2">Other Valid Users:</p>
                                <small>johnd / m38rmF$</small>
                                <br />
                                <small>kevinryan / kev02937@</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;




