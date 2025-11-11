import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión...");
        navigate('/users');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">WheelHub 🔑</h1>
                <p className="login-subtitle">Inicia sesión para acceder al panel de administración.</p>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Usuario</label>
                        <input className="form-input" type="text" id="username" placeholder="Tu email o nombre de usuario" required />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input className="form-input" type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="button-primary login-btn">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;