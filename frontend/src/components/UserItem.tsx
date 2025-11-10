import React from 'react';
import type { User } from '../types/user'; 

interface UserItemProps {
  user: User; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '50px', height: '50px', background: 'var(--primary)', color: 'white',
          borderRadius: '50%', display: 'grid', placeContent: 'center', fontWeight: 600
        }}>
          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div>
          <h4 style={{ margin: 0 }}>{user.name}</h4>
          <p style={{ margin: '4px 0 0', color: 'var(--text-light)' }}>{user.email}</p>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <span style={{
          padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600,
          background: user.status === 'active' ? '#dcfce7' : '#fee2e2',
          color: user.status === 'active' ? '#166534' : '#991b1b'
        }}>
          {user.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
        <br />

      </div>

      <div>
        <button className="button-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', marginRight: '0.5rem' }} onClick={() => onEdit(user.id)}>
          Editar
        </button>
        <button className="button-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'var(--danger)' }} onClick={() => onDelete(user.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default UserItem;