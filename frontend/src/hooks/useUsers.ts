import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { User, PaginatedResponse } from '../types/user';
import { API_BASE_URL } from '../api/api';

interface FetchParams {
    page: number;
    limit: number;
    filter: string;
}

export const useUsers = (initialParams: FetchParams) => {

    const [usersData, setUsersData] = useState<PaginatedResponse<User>>({
        data: [],
        total: 0,
        pages: 1,
        currentPage: 1,
    });

    const [params, setParams] = useState<FetchParams>(initialParams);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const endpoint = `${API_BASE_URL}/users`; 

        try {
            const response = await axios.get<PaginatedResponse<User>>(endpoint, { 
                params: {
                    page: params.page,
                    limit: params.limit,
                    filter: params.filter 
                }
            });
            
            setUsersData(response.data);

        } catch (err) {
            console.error("Error fetching users:", err);
            
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Error al cargar usuarios');
            } else {
                setError('Error de red o conexión');
            }
            
            setUsersData({ data: [], total: 0, pages: 1, currentPage: 1 });
            
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const setPagination = (page: number, limit: number) => {
        setParams(prev => ({ ...prev, page: page, limit: limit }));
    };

    const setFilter = (newFilter: string) => {
        setParams(prev => ({ ...prev, filter: newFilter, page: 1 }));
    };

    return {
        usersData,
        loading,
        error,
        setPagination: (page: number, limit: number) => setPagination(page, limit),
        setFilter,
        currentParams: params,
        refetch: fetchUsers
    };
};