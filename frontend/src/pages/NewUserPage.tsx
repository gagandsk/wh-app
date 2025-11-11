import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import type { UserRole } from '../types/user';
import { FiSave, FiXCircle } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb'; 
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const NewUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as UserRole,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'El nombre es obligatorio.';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'El email es inválido.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      
      setSuccess(`¡Usuario Dado de alta con éxito!`);
      setTimeout(() => navigate('/users'), 2000); 

    } catch (err) {
      console.error('Error al crear usuario:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error desconocido al crear el usuario.');
      } else {
        setError('Error de conexión con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

   const breadcrumbSections = useBreadcrumbs();

  return (
  <div className="main-content">
   <Breadcrumb sections={breadcrumbSections} />
    <div className="page-header">
      <h1 className="page-title">Crear Nuevo Usuario</h1>
      <button className="btn-new" onClick={() => navigate('/users')}>
        <FiXCircle style={{ marginRight: '8px' }} />
        Cancelar
      </button>
    </div>

  
    <div>
      <div style={{
        padding: '2rem',
        borderRadius: 'var(--radius)',
      }}>
        <form onSubmit={handleSubmit}>

    
          {loading && (
            <div style={{
              background: '#DBEAFE', color: '#1E40AF', padding: '1rem',
              borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', textAlign: 'center'
            }}>
              Guardando usuario...
            </div>
          )}
          {error && (
            <div style={{
              background: '#FEE2E2', color: '#991B1B', padding: '1rem',
              borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem'
            }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{
              background: '#DCFCE7', color: '#166534', padding: '1rem',
              borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', textAlign: 'center'
            }}>
              {success}
            </div>
          )}

         
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Ana Martínez"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'var(--transition)'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

     
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: ana.m@empresa.com"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'var(--transition)'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>


          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
              Rol de Usuario
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '1rem',
                background: 'white',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                appearance: 'none'
              }}
            >
              <option value="viewer">Viewer (Lector)</option>
              <option value="editor">Editor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

   
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/users')}
              disabled={loading}
              style={{
                padding: '0.75rem 1.8rem',
                borderRadius: '10px',
                background: '#F0F0F0',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-new"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FiSave />
              {loading ? 'Creando...' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default NewUserPage;