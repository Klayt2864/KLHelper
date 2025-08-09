import React, { useState } from 'react';
import { Package, FileText, HelpCircle, AlertTriangle, DollarSign, Clock, CheckCircle } from 'lucide-react';
import CircuitElementsSection from './CircuitElementsSection';
import DiagramsSection from './DiagramsSection';
import TheoreticalHelpSection from './TheoreticalHelpSection';
import { useOrders } from '../hooks/useOrders';

interface DashboardProps {
  theme: 'dark' | 'light';
  cardClasses: string;
}

export default function Dashboard({ theme, cardClasses }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<'main' | 'circuits' | 'diagrams' | 'help'>('main');
  const { weeklyOrderCount, canPlaceOrder, isActiveDay } = useOrders();
  
  // Get current user to check if admin
  const currentUser = JSON.parse(localStorage.getItem('kl_helper_current_user') || '{}');
  const isAdmin = currentUser.isAdmin;

  const showLimitMessage = !canPlaceOrder() && isActiveDay() && !isAdmin;

  const sections = [
    {
      id: 'circuits',
      title: 'Elementos de Circuito Físico',
      icon: <Package size={24} />,
      description: 'Elementos para armar circuitos físicos',
      prices: ['Fácil: $2.00', 'Medio: $3.00', 'Complicado: $5.50'],
    },
    {
      id: 'diagrams',
      title: 'Diagramas de Circuito',
      icon: <FileText size={24} />,
      description: 'Diagramas técnicos de circuitos',
      prices: ['Fácil: $0.50', 'Medio: $0.75', 'Complicado: $1.10'],
    },
    {
      id: 'help',
      title: 'Ayuda Teórica',
      icon: <HelpCircle size={24} />,
      description: 'Asistente IA KL_01 para consultas teóricas',
      prices: ['Acceso: $2.00'],
    },
  ];

  if (activeSection !== 'main') {
    return (
      <div>
        <button
          onClick={() => setActiveSection('main')}
          className={`mb-6 px-4 py-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-200`}
        >
          ← Volver al Dashboard
        </button>
        
        {activeSection === 'circuits' && <CircuitElementsSection theme={theme} cardClasses={cardClasses} />}
        {activeSection === 'diagrams' && <DiagramsSection theme={theme} cardClasses={cardClasses} />}
        {activeSection === 'help' && <TheoreticalHelpSection theme={theme} cardClasses={cardClasses} />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Órdenes esta semana</p>
              <p className="text-2xl font-bold">{weeklyOrderCount}/5</p>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Estado del sistema</p>
              <p className={`text-lg font-semibold ${isActiveDay() || isAdmin ? 'text-green-500' : 'text-red-500'}`}>
                {isActiveDay() || isAdmin ? 'Activo' : 'Inactivo'}
              </p>
            </div>
            {isActiveDay() || isAdmin ? <CheckCircle className="text-green-500" size={32} /> : <Clock className="text-red-500" size={32} />}
          </div>
        </div>
        
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Días activos</p>
              <p className="text-lg font-semibold">{isAdmin ? 'Todos los días' : 'Lunes y Martes'}</p>
            </div>
            <Clock className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {!isActiveDay() && !isAdmin && (
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-red-900/30 border-red-700' : 'bg-red-100 border-red-300'} border`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <div>
              <h3 className="font-semibold text-red-500">Sistema Inactivo</h3>
              <p className="text-sm">El sistema de órdenes solo está disponible los lunes y martes de cada semana.</p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && !isActiveDay() && (
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-100 border-blue-300'} border`}>
          <div className="flex items-center gap-3">
            <HelpCircle className="text-blue-500" size={24} />
            <div>
              <h3 className="font-semibold text-blue-500">Acceso de Controlador</h3>
              <p className="text-sm">Como controlador, tienes acceso completo al sistema todos los días de la semana.</p>
            </div>
          </div>
        </div>
      )}

      {showLimitMessage && (
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-100 border-yellow-300'} border`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-500" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-500">Límite de Órdenes Alcanzado</h3>
              <p className="text-sm">Espere a que disminuyan los pedidos o vuelva la siguiente semana si lo prefiere.</p>
            </div>
          </div>
        </div>
      )}

      {/* Services Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`${cardClasses} border rounded-xl p-6 hover:scale-105 transition-all duration-200 cursor-pointer ${!canPlaceOrder() || !isActiveDay() ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => (canPlaceOrder() && isActiveDay()) && setActiveSection(section.id as any)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500">{section.icon}</div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            
            <p className="text-sm opacity-70 mb-4">{section.description}</p>
            
            <div className="space-y-2">
              {section.prices.map((price, index) => (
                <div key={index} className="flex items-center gap-2">
                  <DollarSign size={14} className="text-green-500" />
                  <span className="text-sm">{price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Information Panel */}
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-lg font-semibold mb-4">Información Importante</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>El sistema permite máximo 5 pedidos por semana entre todos los usuarios.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>{isAdmin ? 'Como controlador, puedes realizar órdenes cualquier día.' : 'Las órdenes solo pueden realizarse los lunes y martes.'}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Para elementos de circuito físico, si la dificultad es mayor a la seleccionada, se solicitará pago adicional en la entrega.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Para acceso a ayuda teórica, contacte al controlador para obtener el código de acceso.</p>
          </div>
        </div>
      </div>
    </div>
  );
}