import React, { useState } from 'react';
import { FileText, DollarSign, Send } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

interface DiagramsSectionProps {
  theme: 'dark' | 'light';
  cardClasses: string;
}

export default function DiagramsSection({ theme, cardClasses }: DiagramsSectionProps) {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { addOrder } = useOrders();

  const prices = {
    easy: 0.50,
    medium: 0.75,
    hard: 1.10
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    
    const orderData = {
      type: 'diagrams',
      difficulty,
      description,
      price: prices[difficulty]
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
          <FileText className="text-blue-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold">Diagramas de Circuito</h2>
            <p className="text-sm opacity-70">Solicita diagramas técnicos de circuitos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Nivel de Dificultad</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'easy', label: 'Fácil', price: 0.50 },
                { value: 'medium', label: 'Medio', price: 0.75 },
                { value: 'hard', label: 'Complicado', price: 1.10 }
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

          <div>
            <label className="block text-sm font-medium mb-2">Descripción del Diagrama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 h-32 resize-none`}
              placeholder="Describe el tipo de diagrama que necesitas..."
              required
            />
          </div>

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-800/30'} border ${theme === 'dark' ? 'border-blue-300' : 'border-blue-600'}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Precio:</span>
              <div className="flex items-center gap-1 text-green-500 font-bold">
                <DollarSign size={16} />
                <span>{prices[difficulty].toFixed(2)}</span>
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