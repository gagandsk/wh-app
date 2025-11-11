import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Solicitando restablecimiento de contraseña...");
        alert("Instrucciones enviadas al correo. Por favor, verifica tu bandeja.");
        navigate('/verify/account');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">🔒 Recuperar Contraseña</h1>
                <p className="login-subtitle">Introduce tu correo electrónico para recibir un enlace de restablecimiento.</p>

                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo Electrónico</label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            placeholder="ejemplo@email.com"
                            required
                        />
                    </div>

                    <button type="submit" className="button-primary login-btn">
                        Enviar Enlace de Restablecimiento
                    </button>

                    <button
                        type="button"
                        className="button-secondary login-btn"
                        onClick={() => navigate('/login')}
                    >
                        Volver a Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;