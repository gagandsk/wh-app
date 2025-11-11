import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UsersPage from './pages/UsersPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPage from './pages/EditUserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import { UserDetailPage } from './pages/UsersDetailPage';
import './styles/App.css';

const MainLayout: React.FC = () => {
  
  const currentSection = "Users"; 
  const activeSidebar = "users";

  return (
    <div className="App">
      <Sidebar activeSection={activeSidebar} />
      <div className="content-area">
        <Header currentSection={currentSection} />
        <main className="main-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
    
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
        <Route path="/new/password" element={<ResetPasswordPage />} />
        <Route path="/verify/account" element={<VerifyAccountPage />} />

        
        <Route path="/" element={<MainLayout />}>

          
          <Route index element={<UsersPage />} />

          
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<NewUserPage />} />
          
    
          <Route path="/users/info/:id" element={<UserDetailPage />} />
          <Route path="users/:id" element={<EditUserPage />} /> 
 
          <Route path="profile" element={<h1>👤 Perfil de Usuario</h1>} />
          <Route path="config" element={<h1>⚙️ Configuración del Sistema</h1>} />
          

          <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />

        </Route>

      </Routes>
    </Router>
  );
};

export default App;