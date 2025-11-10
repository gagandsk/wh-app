import React, { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const CODE_LENGTH = 6;

const VerifyAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(new Array(CODE_LENGTH).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (isNaN(Number(value))) return;

        const newCode = [...code];
        newCode[index] = value.substring(value.length - 1);

        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');

        if (fullCode.length === CODE_LENGTH) {
            console.log("Verificando código:", fullCode);
            alert("Cuenta verificada con éxito. Accediendo al dashboard.");
            navigate('/usuarios');
        } else {
            alert(`Por favor, introduce el código completo de ${CODE_LENGTH} dígitos.`);
        }
    };

    const handleResend = () => {
        console.log("Enviando código de nuevo...");
        alert("Nuevo código enviado.");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">✅ Verifica tu cuenta</h1>
                <p className="login-subtitle">Revisa tu bandeja de entrada y escribe el código de {CODE_LENGTH} dígitos que te hemos enviado.</p>

                <form className="login-form" onSubmit={handleSubmit}>


                    <div className="code-input-container">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el!; }}
                                className="code-input"
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className="button-primary login-btn">
                        Verificar Cuenta
                    </button>

                </form>

                <div className="resend-link">
                    <p>
                        ¿No has recibido tu código?
                        <span onClick={handleResend} className="resend-button">Enviar de nuevo</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default VerifyAccountPage;