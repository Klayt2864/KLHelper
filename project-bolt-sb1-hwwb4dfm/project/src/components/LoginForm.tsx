import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string, adminCode?: string) => Promise<boolean>;
  onSwitchToRegister: () => void;
  theme: 'dark' | 'light';
}

export default function LoginForm({ onLogin, onSwitchToRegister, theme }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await onLogin(email, password, adminCode || undefined);
      if (!success) {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const isAdminEmail = email === 'klaytandrade@gmail.com';
  const inputClasses = theme === 'dark' 
    ? 'bg-purple-900/30 border-purple-600 text-white placeholder-purple-300'
    : 'bg-white border-red-300 text-red-900 placeholder-red-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-800/30 border-red-600 text-red-200'} border text-sm`}>
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          <Mail size={16} className="inline mr-2" />
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          <Lock size={16} className="inline mr-2" />
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 pr-12 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            placeholder="Tu contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {isAdminEmail && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Código de Controlador
          </label>
          <div className="relative">
            <input
              type={showAdminCode ? 'text' : 'password'}
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className={`w-full px-4 py-3 pr-12 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              placeholder="Código de acceso"
            />
            <button
              type="button"
              onClick={() => setShowAdminCode(!showAdminCode)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showAdminCode ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:text-blue-600 text-sm transition-colors duration-200"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </div>
    </form>
  );
}