import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGlobe, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  currentSection: string;
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const navigate = useNavigate();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: 'es', flag: '🇪🇸', name: 'Español' });

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(prev => !prev);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
    setIsLangDropdownOpen(false);
  };

  const handleLangChange = (lang: { code: string; flag: string; name: string; }) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    setIsUserDropdownOpen(false);
    navigate('/login');
  };

  const languages = [
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
  ];

  return (
    <header className="header">
      <h1 className="header-title">
        Gestión de Usuarios
      </h1>
      <div className="header-right">

        <div className="language-menu">
          <button
            className="language-selector"
            onClick={toggleLangDropdown}
            aria-expanded={isLangDropdownOpen}
          >

            <span><FiGlobe /></span>
            {currentLang.name}
            <span style={{ marginLeft: '5px' }}>▼</span>
          </button>

          <div className={`language-dropdown ${isLangDropdownOpen ? 'open' : ''}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLangChange(lang)}
                disabled={lang.code === currentLang.code}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="header-user-info">
          <div className="user-menu">
            <div
              className="user-avatar-button"
              onClick={toggleUserDropdown}
              title="Opciones de Usuario"
              aria-expanded={isUserDropdownOpen}
            >
              WH
            </div>

            <div className={`user-dropdown ${isUserDropdownOpen ? 'open' : ''}`}>
              <button onClick={() => { setIsUserDropdownOpen(false); navigate('/perfil'); }}>
                <span><FiUser /></span> Perfil
              </button>
              <button onClick={() => { setIsUserDropdownOpen(false); navigate('/configuracion'); }}>
                <span><FiSettings /></span> Configuración
              </button>

              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                <span><FiLogOut/></span> Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;