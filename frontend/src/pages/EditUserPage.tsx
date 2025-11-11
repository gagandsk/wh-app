import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import type { User, UserUpdatePayload } from '../types/user';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb'; 
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserUpdatePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const res = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          status: res.data.status,
        });
      } catch (err) {
        setError('No se pudo cargar el usuario');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData) return;

    setSaving(true);
    setError(null);

    try {
      await axios.patch(`${API_BASE_URL}/users/${id}`, formData);
      navigate('/users', { state: { success: 'Usuario actualizado correctamente' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const breadcrumbSections = useBreadcrumbs();

  if (loading) {
    return (
      <div className="main-content">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="main-content">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Usuario no encontrado</p>
          <button className="btn-new" onClick={() => navigate('/users')}>
            ← Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      
      <Breadcrumb sections={breadcrumbSections} />

      <div className="page-header">
        <h1 className="page-title">Editar Usuario</h1>
        <button className="btn-new" onClick={() => navigate('/users')}>
          <FiArrowLeft style={{ marginRight: '8px' }} />
          Volver
        </button>
      </div>

      <div>
        <div style={{
          padding: '2rem',
          borderRadius: 'var(--radius)',
        }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: '#FEE2E2', color: '#991B1B', padding: '1rem',
                borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem'
              }}>
                {error}
              </div>
            )}

            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
                required
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
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
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

           
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

       
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/users')}
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
                disabled={saving}
                className="btn-new"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FiSave />
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;