import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Intentando registrar nuevo usuario...");
        alert("Registro completado. Redirigiendo a Login.");
        navigate('/login');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">WheelHub 📝</h1>
                <p className="login-subtitle">Crea tu cuenta de administrador.</p>

                <form className="login-form" onSubmit={handleRegister}>

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nombre Completo</label>
                        <input className="form-input" type="text" id="name" placeholder="Tu nombre" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo Electrónico</label>
                        <input className="form-input" type="email" id="email" placeholder="ejemplo@email.com" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input className="form-input" type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="button-primary login-btn">
                        Crear Cuenta
                    </button>

                    <button
                        type="button"
                        className="button-secondary login-btn"
                        onClick={() => navigate('/login')}
                    >
                        Ya tengo cuenta, Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;