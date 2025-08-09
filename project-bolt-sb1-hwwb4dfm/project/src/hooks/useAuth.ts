import { useState, useEffect } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface StoredUser extends User {
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('kl_helper_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Check if user is logged in
    const currentUser = localStorage.getItem('kl_helper_current_user');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const saveUsers = (newUsers: StoredUser[]) => {
    setUsers(newUsers);
    localStorage.setItem('kl_helper_users', JSON.stringify(newUsers));
  };

  const login = async (email: string, password: string, adminCode?: string): Promise<boolean> => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) return false;

    // Check admin access
    if (email === 'klaytandrade@gmail.com') {
      if (adminCode !== 'A_#64') return false;
    }

    const loggedInUser: User = {
      email: user.email,
      isAdmin: email === 'klaytandrade@gmail.com'
    };

    setUser(loggedInUser);
    localStorage.setItem('kl_helper_current_user', JSON.stringify(loggedInUser));
    return true;
  };

  const register = async (email: string, password: string, adminCode?: string): Promise<boolean> => {
    // Check if email already exists
    if (users.some(u => u.email === email)) return false;
    
    // Check if password is already in use (unique password requirement)
    if (users.some(u => u.password === password)) return false;

    // Check admin code for admin email
    if (email === 'klaytandrade@gmail.com' && adminCode !== 'A_#64') {
      return false;
    }

    const newUser: StoredUser = {
      email,
      password,
      isAdmin: email === 'klaytandrade@gmail.com'
    };

    const newUsers = [...users, newUser];
    saveUsers(newUsers);

    const loggedInUser: User = {
      email: newUser.email,
      isAdmin: newUser.isAdmin
    };

    setUser(loggedInUser);
    localStorage.setItem('kl_helper_current_user', JSON.stringify(loggedInUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kl_helper_current_user');
  };

  return {
    user,
    login,
    register,
    logout,
    isAdmin: user?.isAdmin || false
  };
}