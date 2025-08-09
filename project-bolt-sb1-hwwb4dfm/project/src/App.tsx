import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogOut, Package, FileText, HelpCircle, User, Mail, Lock, Calendar, Clock, AlertTriangle } from 'lucide-react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useOrders } from './hooks/useOrders';

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'admin'>('login');
  const { theme, toggleTheme } = useTheme();
  const { user, login, register, logout, isAdmin } = useAuth();
  const { orders, weeklyOrderCount, canPlaceOrder, isActiveDay } = useOrders();

  const themeClasses = theme === 'dark' 
    ? 'bg-gradient-to-br from-black via-purple-900 to-purple-800 text-white'
    : 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 text-white';

  const cardClasses = theme === 'dark'
    ? 'bg-purple-900/30 border-purple-700'
    : 'bg-green-800/90 border-green-600';

  if (!user) {
    return (
      <div className={`min-h-screen ${themeClasses} transition-all duration-300`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-200`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className={`w-full max-w-md ${cardClasses} border rounded-xl shadow-2xl p-8`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">KL Helper</h1>
              <p className="text-sm opacity-70">Sistema de Gestión de Órdenes</p>
            </div>

            {!isActiveDay() && (
              <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border-red-700' : 'bg-red-100 border-red-300'} border`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <p className="text-sm">El sistema solo está disponible los lunes y martes.</p>
                </div>
              </div>
            )}

            {currentView === 'login' ? (
              <LoginForm 
                onLogin={login}
                onSwitchToRegister={() => setCurrentView('register')}
                theme={theme}
              />
            ) : (
              <RegisterForm
                onRegister={register}
                onSwitchToLogin={() => setCurrentView('login')}
                theme={theme}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-300`}>
      <nav className={`${cardClasses} border-b p-4`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">KL Helper</h1>
          
          <div className="flex items-center gap-4">
            {!isActiveDay() && (
              <div className="flex items-center gap-2 text-red-500">
                <Clock size={16} />
                <span className="text-sm">Sistema inactivo</span>
              </div>
            )}
            
            {isActiveDay() && weeklyOrderCount >= 5 && (
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertTriangle size={16} />
                <span className="text-sm">Límite alcanzado</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm">{user.email}</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-200`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={logout}
              className={`p-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-200 text-red-500`}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {isAdmin && (
          <div className="mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg ${currentView === 'dashboard' ? 'bg-blue-600 text-white' : cardClasses + ' border'} transition-all duration-200`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2 rounded-lg ${currentView === 'admin' ? 'bg-blue-600 text-white' : cardClasses + ' border'} transition-all duration-200`}
              >
                Panel de Administrador
              </button>
            </div>
          </div>
        )}

        {(currentView === 'dashboard' || !isAdmin) && (
          <Dashboard theme={theme} cardClasses={cardClasses} />
        )}
        
        {currentView === 'admin' && isAdmin && (
          <AdminPanel theme={theme} cardClasses={cardClasses} />
        )}
      </main>
    </div>
  );
}

export default App;