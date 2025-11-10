import React from 'react';

interface FilterChip {
    key: 'name' | 'email' | 'role';
    label: string;
}

interface ActiveFiltersProps {
    activeFilters: FilterChip[];
    onRemoveFilter: (key: FilterChip['key']) => void;
    onClearAllFilters: () => void;
}

const ActiveFiltersDisplay: React.FC<ActiveFiltersProps> = ({ activeFilters, onRemoveFilter, onClearAllFilters }) => {
    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="active-filters-container">
            <button 
                onClick={onClearAllFilters} 
                className="filter-clear-all-btn"
            >
                Limpiar Filtros ({activeFilters.length}) 🧹
            </button>
            
            <div className="filter-chips-list">
                {activeFilters.map(filter => (
                    <span 
                        key={filter.key}
                        className="filter-chip"
                    >
                        {filter.label} 
                        <button 
                            onClick={() => onRemoveFilter(filter.key)}
                            className="filter-chip-remove"
                            title={`Eliminar filtro: ${filter.key}`}
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ActiveFiltersDisplay;