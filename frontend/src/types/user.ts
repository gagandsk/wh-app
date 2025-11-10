export type UserRole = 'admin' | 'editor' | 'viewer';
export type UserStatus = 'active' | 'inactive';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface UserUpdatePayload {
    name?: string;
    email?: string;
    role?: UserRole;
    status?: UserStatus;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    pages: number;
    currentPage: number;
}