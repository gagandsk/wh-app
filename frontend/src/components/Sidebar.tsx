import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  FiBox,
  FiTool,
  FiLogIn,
  FiUserPlus,
  FiRefreshCw,
  FiCheckCircle,
  FiChevronDown,
} from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    paginas: false,
  });

  const pagesRoutes = ['/login', '/register', '/recuperar-contrasena', '/verificar-cuenta', '/nueva-contrasena'];

  const isPathInPages = pagesRoutes.some(path => location.pathname.startsWith(path));

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (isPathInPages && !expandedMenus.paginas) {
      setExpandedMenus(prev => ({ ...prev, paginas: true }));
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const isPagesMenuOpen = expandedMenus.paginas || isPathInPages;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Wheelhub</div>

      <nav>
        <ul className="sidebar-menu">

          <li className={`sidebar-item ${isActive('/users') ? 'active' : ''}`}>
            <Link to="/users">
              <span><FiTool /></span> Usuarios
            </Link>
          </li>

        {/*
          <li className={`sidebar-item ${isPagesMenuOpen ? 'expanded' : ''}`}
            onClick={() => toggleMenu('paginas')}>

            <div className="sidebar-dropdown-toggle">
              <span><FiBox /></span> Páginas
              <span
                style={{ transform: isPagesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <FiChevronDown />
              </span>
            </div>

            <ul className="sidebar-submenu"
              style={{ maxHeight: isPagesMenuOpen ? '300px' : '0' }}>

              <li className={`sidebar-submenu-item ${isActive('/login') ? 'active' : ''}`}>
                <Link to="/login">
                  <FiLogIn style={{ marginRight: '0.4rem' }} /> Login
                </Link>
              </li>
              <li className={`sidebar-submenu-item ${isActive('/register') ? 'active' : ''}`}>
                <Link to="/register">
                  <FiUserPlus style={{ marginRight: '0.4rem' }} /> Register
                </Link>
              </li>
              <li className={`sidebar-submenu-item ${isActive('/recuperar-contrasena') ? 'active' : ''}`}>
                <Link to="/recuperar-contrasena">
                  <FiRefreshCw style={{ marginRight: '0.4rem' }} /> Recup. Contraseña
                </Link>
              </li>
              <li className={`sidebar-submenu-item ${isActive('/verificar-cuenta') ? 'active' : ''}`}>
                <Link to="/verificar-cuenta">
                  <FiCheckCircle style={{ marginRight: '0.4rem' }} /> Verificar Cuenta
                </Link>
              </li>
            </ul>
            
          </li>
          */ }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;