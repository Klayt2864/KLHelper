import React, { useState } from 'react';
import { Package, AlertTriangle, DollarSign, Send } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

interface CircuitElementsSectionProps {
  theme: 'dark' | 'light';
  cardClasses: string;
}

export default function CircuitElementsSection({ theme, cardClasses }: CircuitElementsSectionProps) {
  const [serviceType, setServiceType] = useState<'with-elements' | 'without-elements'>('with-elements');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { addOrder } = useOrders();

  const prices = {
    'with-elements': {
      easy: 2.00,
      medium: 3.00,
      hard: 5.50
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    
    const orderData = {
      type: 'circuit-elements',
      serviceType,
      difficulty: serviceType === 'with-elements' ? difficulty : undefined,
      description,
      price: serviceType === 'with-elements' ? prices['with-elements'][difficulty] : 'Por determinar'
    };

    await addOrder(orderData);
    setLoading(false);
    setDescription('');
  };

  const inputClasses = theme === 'dark' 
    ? 'bg-purple-900/30 border-purple-600 text-white placeholder-purple-300'
    : 'bg-green-700/20 border-green-500 text-white placeholder-green-200';

  return (
    <div className="space-y-6">
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Package className="text-blue-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Elementos de Circuito Físico</h2>
            <p className="text-sm opacity-70">Solicita elementos para armar circuitos</p>
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-100 border-yellow-300'} border`}>
        <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-800/30 border-yellow-600'} border`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <p className="text-sm">
              <strong>Aviso:</strong> Si el controlador nota un grado de dificultad mayor al seleccionado, 
              se solicitará el pago adicional en persona cuando se entregue el pedido.
            </p>
          </div>
        </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Tipo de Servicio</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceType"
                  value="with-elements"
                  checked={serviceType === 'with-elements'}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="text-blue-500"
                />
                <span>Con elementos entregados para armar</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceType"
                  value="without-elements"
                  checked={serviceType === 'without-elements'}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="text-blue-500"
                />
                <span>Sin entregar elementos (precio según materiales y dificultad)</span>
              </label>
            </div>
          </div>

          {serviceType === 'with-elements' && (
            <div>
              <label className="block text-sm font-medium mb-3">Nivel de Dificultad</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'easy', label: 'Fácil', price: 2.00 },
                  { value: 'medium', label: 'Medio', price: 3.00 },
                  { value: 'hard', label: 'Complicado', price: 5.50 }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={difficulty === option.value}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="text-blue-500"
                    />
                    <div>
                      <span className="font-medium">{option.label}</span>
                      <div className="flex items-center gap-1 text-green-500 text-sm">
                        <DollarSign size={12} />
                        <span>{option.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Descripción del Proyecto</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 h-32 resize-none`}
              placeholder="Describe detalladamente el circuito que necesitas..."
              required
            />
          </div>

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-300`}>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-800/30'} border ${theme === 'dark' ? 'border-blue-300' : 'border-blue-600'}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Precio estimado:</span>
              <div className="flex items-center gap-1 text-green-500 font-bold">
                <DollarSign size={16} />
                <span>
                  {serviceType === 'with-elements' 
                    ? prices['with-elements'][difficulty].toFixed(2)
                    : 'Por determinar'
                  }
                </span>
              </div>
            </div>
          </div>
          </div>

          <button
            type="submit"
            disabled={loading || !description.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              'Enviando...'
            ) : (
              <>
                <Send size={20} />
                Enviar Orden
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}