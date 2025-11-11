import { useParams, useNavigate } from 'react-router-dom';

export function UserDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!id) return <div>ID de usuario no encontrado.</div>;
    
    const user = { 
        name: "Usuario de Ejemplo", 
        email: "ejemplo@dominio.com", 
        role: "admin", 
        createdAt: "2023-10-20" 
    };
    
    const handleGoBack = () => {
        navigate('/users');
    };

    return (
        <div className="user-detail-page">
            <button onClick={handleGoBack}>
                ← Volver a la Lista
            </button>
            
            <h2>Detalle del Usuario: {user.name}</h2>
            
            <div className="detail-card">
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
                <p><strong>Creado el:</strong> {user.createdAt}</p>
            </div>
            
            <button 
                onClick={() => navigate(`/users/${id}`)}
                style={{ marginTop: '20px', backgroundColor: 'blue', color: 'white' }}
            >
                Editar Usuario
            </button>
        </div>
    );
}