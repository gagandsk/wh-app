import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'active' | 'inactive';
}

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Identificador</th>
            <th>Nombre</th>
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const isLastRow = index === users.length - 1;
            return (
              <tr key={user.id} className={isLastRow ? 'last-row' : ''}>
                <td><strong>#{index + 1}</strong></td>
                <td>{user.name}</td>
                <td><span className="username-text">{user.username}</span></td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge status-${user.status === 'active' ? 'verificado' : 'pendiente'}`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="actions-menu">
                    <button
                      className="actions-btn"
                      onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                    >
                      ⋮
                    </button>

                    {menuOpen === user.id && (
                      <div className={`actions-dropdown ${isLastRow ? 'dropdown-up' : ''}`}>
                        <button onClick={() => { setMenuOpen(null); onEdit(user.id); }}>
                          Editar
                        </button>
                        <button className="danger" onClick={() => { setMenuOpen(null); onDelete(user.id); }}>
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;