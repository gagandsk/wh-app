import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Estableciendo nueva contraseña...");
        alert("Contraseña actualizada con éxito.");
        navigate('/login'); 
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">🔑 Nueva Contraseña</h1>
                <p className="login-subtitle">Introduce tu nueva contraseña. Debe ser segura.</p>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Nueva Contraseña</label>
                        <input 
                            className="form-input" 
                            type="password" 
                            id="password" 
                            placeholder="Mínimo 8 caracteres" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirm-password">Confirmar Contraseña</label>
                        <input 
                            className="form-input" 
                            type="password" 
                            id="confirm-password" 
                            placeholder="Repite la contraseña" 
                            required 
                        />
                    </div>

                    <button type="submit" className="button-primary login-btn">
                        Restablecer Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;