import { useState, useEffect } from 'react';

interface Order {
  id: string;
  userEmail: string;
  type: string;
  serviceType?: string;
  difficulty?: string;
  description: string;
  price: number | string;
  status: 'pending' | 'completed';
  createdAt: Date;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('kl_helper_orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt)
      }));
      setOrders(parsedOrders);
    }
  }, []);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('kl_helper_orders', JSON.stringify(newOrders));
  };

  const isActiveDay = (): boolean => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday
    const currentUser = JSON.parse(localStorage.getItem('kl_helper_current_user') || '{}');
    
    // Admin has access all days
    if (currentUser.isAdmin) {
      return true;
    }
    
    // Regular users only Monday and Tuesday
    return today === 1 || today === 2; // Monday or Tuesday
  };

  const getWeeklyOrderCount = (): number => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    return orders.filter(order => 
      order.status === 'pending' && order.createdAt >= startOfWeek
    ).length;
  };

  const canPlaceOrder = (): boolean => {
    const currentUser = JSON.parse(localStorage.getItem('kl_helper_current_user') || '{}');
    
    // Admin can always place orders (no weekly limit)
    if (currentUser.isAdmin) {
      return true;
    }
    
    // Regular users have weekly limit
    return getWeeklyOrderCount() < 5;
  };

  const addOrder = async (orderData: any): Promise<boolean> => {
    const currentUser = JSON.parse(localStorage.getItem('kl_helper_current_user') || '{}');
    
    // Admin can always add orders
    if (currentUser.isAdmin) {
      const newOrder: Order = {
        id: Date.now().toString(),
        userEmail: currentUser.email,
        ...orderData,
        status: 'pending',
        createdAt: new Date()
      };

      const newOrders = [...orders, newOrder];
      saveOrders(newOrders);
      return true;
    }
    
    // Regular users follow normal restrictions
    if (!canPlaceOrder() || !isActiveDay()) return false;

    const newOrder: Order = {
      id: Date.now().toString(),
      userEmail: currentUser.email,
      ...orderData,
      status: 'pending',
      createdAt: new Date()
    };

    const newOrders = [...orders, newOrder];
    saveOrders(newOrders);
    return true;
  };

  const markOrderAsCompleted = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed' as const } : order
    );
    saveOrders(updatedOrders);
  };

  return {
    orders,
    addOrder,
    markOrderAsCompleted,
    weeklyOrderCount: getWeeklyOrderCount(),
    canPlaceOrder,
    isActiveDay
  };
}