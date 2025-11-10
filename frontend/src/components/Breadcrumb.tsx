import React from 'react';

interface BreadcrumbProps {
  sections: Array<{ name: string; path?: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ sections }) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;
          return (
            <li 
              key={index} 
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
            >
              {isLast ? (
                <span aria-current="page">{section.name}</span>
              ) : (
                <a href={section.path || '#'}>
                  {section.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;