import { User } from './users/user.entity';
export type UserRole = 'admin' | 'editor' | 'viewer';

export type UserStatus = 'active' | 'inactive';
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pages: number;
    currentPage: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    pages: number;
    currentPage: number;
}

export type CreateUserDto = Omit<User, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
export interface UserPaginationParams {
    page: number;
    limit: number;
    filter: string;
}
