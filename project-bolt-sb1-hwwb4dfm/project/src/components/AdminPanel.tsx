import React from 'react';
import { Package, Calendar, CheckCircle, Clock, User, DollarSign } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

interface AdminPanelProps {
  theme: 'dark' | 'light';
  cardClasses: string;
}

export default function AdminPanel({ theme, cardClasses }: AdminPanelProps) {
  const { orders, markOrderAsCompleted, weeklyOrderCount } = useOrders();

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getServiceTypeName = (type: string) => {
    switch (type) {
      case 'circuit-elements': return 'Elementos de Circuito';
      case 'diagrams': return 'Diagramas de Circuito';
      case 'theoretical-help': return 'Ayuda Teórica';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Total Órdenes</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Pendientes</p>
              <p className="text-2xl font-bold">{pendingOrders.length}</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </div>
        
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Completadas</p>
              <p className="text-2xl font-bold">{completedOrders.length}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Esta Semana</p>
              <p className="text-2xl font-bold">{weeklyOrderCount}/5</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Pending Orders */}
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Clock className="text-yellow-500" size={24} />
          Órdenes Pendientes ({pendingOrders.length})
        </h3>
        
        {pendingOrders.length === 0 ? (
          <p className="text-center opacity-70 py-8">No hay órdenes pendientes</p>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-300'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={16} className="text-blue-500" />
                      <span className="font-semibold">{getServiceTypeName(order.type)}</span>
                      <span className="text-sm opacity-70">#{order.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="text-sm">{order.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span className="text-sm">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    
                    {order.difficulty && (
                      <p className="text-sm mb-2">
                        <strong>Dificultad:</strong> {order.difficulty === 'easy' ? 'Fácil' : order.difficulty === 'medium' ? 'Medio' : 'Complicado'}
                      </p>
                    )}
                    
                    {order.serviceType && (
                      <p className="text-sm mb-2">
                        <strong>Tipo:</strong> {order.serviceType === 'with-elements' ? 'Con elementos' : 'Sin elementos'}
                      </p>
                    )}
                    
                    <p className="text-sm mb-3">
                      <strong>Descripción:</strong> {order.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="font-semibold text-green-500">
                        {typeof order.price === 'number' ? `$${order.price.toFixed(2)}` : order.price}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => markOrderAsCompleted(order.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 ml-4"
                  >
                    Marcar como Entregada
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Orders */}
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={24} />
          Órdenes Completadas ({completedOrders.length})
        </h3>
        
        {completedOrders.length === 0 ? (
          <p className="text-center opacity-70 py-8">No hay órdenes completadas</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {completedOrders.map((order) => (
              <div key={order.id} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-300'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="text-blue-500" />
                  <span className="font-semibold">{getServiceTypeName(order.type)}</span>
                  <span className="text-sm opacity-70">#{order.id}</span>
                  <CheckCircle size={16} className="text-green-500 ml-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{order.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-green-500" />
                    <span className="text-green-500 font-semibold">
                      {typeof order.price === 'number' ? `$${order.price.toFixed(2)}` : order.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}