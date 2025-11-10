import React from 'react';
import UserItem from './UserItem';
import type { User } from '../types/user'; 

interface UserListProps {
  users: User[]; 
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '3rem' }}>No hay usuarios</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;