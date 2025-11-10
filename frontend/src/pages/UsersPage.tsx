import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import Breadcrumb from '../components/Breadcrumb';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import ActiveFiltersDisplay from '../components/ActiveFiltersDisplay';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const { usersData, loading, error, setPagination, setFilter, currentParams, refetch } = useUsers({
        page: 1, limit: 10, filter: ''
    });

    const paginatedUsers = usersData?.data || [];
    const totalUsers = usersData?.total || 0;
    const totalPages = usersData?.pages || 1;

    const handleApplyFilter = () => {
        const filters = {
            name: nameFilter.trim(),
            email: emailFilter.trim(),
            role: roleFilter,
        };
        
        const filterQuery = Object.entries(filters)
            .filter(([key, value]) => value !== '' && value !== 'Todos los roles')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
            
        setFilter(filterQuery);
        setPagination(1, currentParams.limit); 
    };

    const handleRemoveFilter = (key: 'name' | 'email' | 'role') => {
        if (key === 'name') setNameFilter('');
        else if (key === 'email') setEmailFilter('');
        else if (key === 'role') setRoleFilter('');
        
        setTimeout(handleApplyFilter, 0); 
    };
    
    const handleClearAllFilters = () => {
        setNameFilter('');
        setEmailFilter('');
        setRoleFilter('');
        setTimeout(handleApplyFilter, 0); 
    };
    
    const breadcrumbSections = useBreadcrumbs();

    const activeFilters = [
        nameFilter && { key: 'name', label: `Nombre: ${nameFilter}` },
        emailFilter && { key: 'email', label: `Email: ${emailFilter}` },
        (roleFilter && roleFilter !== '') && { 
            key: 'role', 
            label: `Rol: ${roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}` 
        },
    ].filter(Boolean) as Array<{ key: 'name' | 'email' | 'role', label: string }>;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPagination(page, currentParams.limit);
        }
    };

    const handleEdit = (id: string) => navigate(`/usuarios/${id}`);
    const handleDelete = (id: string) => setShowDeleteModal(id);

    const confirmDelete = async () => {
        if (!showDeleteModal) return;
        try {
            await axios.delete(`${API_BASE_URL}/users/${showDeleteModal}`);
            refetch();
        } catch (err) { 
            console.error('Error al eliminar:', err);
            alert('Error al eliminar'); 
        }
        setShowDeleteModal(null);
    };

    return (
        <div className="main-content">
            <Breadcrumb sections={breadcrumbSections} />
            <div className="page-header">
                <div>
                    <h1 className="page-title">Usuarios</h1>
                    <span className="page-count">{totalUsers} usuarios</span>
                </div>
                <button className="btn-new" onClick={() => navigate('/usuarios/nuevo')}>
                    Nuevo usuario
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre usuario"
                    className="filter-input"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                
                <input
                    type="text"
                    placeholder="Buscar por email"
                    className="filter-input"
                    value={emailFilter} 
                    onChange={(e) => setEmailFilter(e.target.value)}
                />
                
                <select 
                    className="filter-input filter-select"
                    value={roleFilter} 
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">Todos los roles</option> 
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                </select>
                
                <button className="btn btn-primary" onClick={handleApplyFilter}>
                    Aplicar Filtros
                </button>
            </div>

            <ActiveFiltersDisplay 
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onClearAllFilters={handleClearAllFilters}
            />

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && paginatedUsers.length > 0 && (
                <UserTable users={paginatedUsers} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            <div className="pagination">
                <button onClick={() => handlePageChange(1)}>«</button>
                <button onClick={() => handlePageChange(currentParams.page - 1)}>‹</button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        className={currentParams.page === i + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentParams.page + 1)}>›</button>
                <button onClick={() => handlePageChange(totalPages)}>»</button>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>¿Eliminar usuario?</h3>
                        <p>Esta acción no se puede deshacer.</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowDeleteModal(null)}>Cancelar</button>
                            <button style={{ background: '#DC3545', color: 'white' }} onClick={confirmDelete}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;