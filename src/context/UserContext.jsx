import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';

/**
 * UserContext & Provider
 * Centralized React state management for users list, search/filter, CRUD operations,
 * toast notifications, and dark/light theme switching.
 */

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id'); // 'id' | 'name' | 'company'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Dark / Light Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('userpulse_theme') || 'light';
  });

  // Notification Toasts State
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync Theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('userpulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Fetch Users Function
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users from server. Please try again.');
      addToast('Error fetching users from JSONPlaceholder API', 'danger');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Initial Load
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * CREATE User Action
   * Simulates POST API call & updates local React state
   */
  const handleAddUser = async (newUserData) => {
    try {
      setLoading(true);
      // POST API Call
      const createdData = await createUser(newUserData);

      // JSONPlaceholder always returns id: 11 for new users.
      // Generate a unique client-side ID if 11 already exists to prevent duplicate key bugs.
      const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
      const userWithUniqueId = {
        ...newUserData,
        id: createdData.id && !users.some((u) => u.id === createdData.id) ? createdData.id : maxId + 1,
      };

      setUsers((prevUsers) => [userWithUniqueId, ...prevUsers]);
      addToast(`User "${userWithUniqueId.name}" created successfully!`, 'success');
      return userWithUniqueId;
    } catch (err) {
      addToast('Failed to create user. Server error occurred.', 'danger');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * UPDATE User Action
   * Simulates PUT API call & updates local React state
   */
  const handleUpdateUser = async (id, updatedUserData) => {
    try {
      setLoading(true);
      // PUT API Call
      await updateUser(id, updatedUserData);

      setUsers((prevUsers) =>
        prevUsers.map((u) => (String(u.id) === String(id) ? { ...u, ...updatedUserData } : u))
      );
      addToast(`User "${updatedUserData.name}" updated successfully!`, 'success');
    } catch (err) {
      addToast('Failed to update user details on server.', 'danger');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE User Action
   * Simulates DELETE API call & removes user from local React state
   */
  const handleRemoveUser = async (id) => {
    const targetUser = users.find((u) => String(u.id) === String(id));
    const userName = targetUser ? targetUser.name : 'User';
    try {
      // DELETE API Call
      await deleteUser(id);

      setUsers((prevUsers) => prevUsers.filter((u) => String(u.id) !== String(id)));
      addToast(`User "${userName}" deleted successfully!`, 'warning');
    } catch (err) {
      addToast(`Failed to delete ${userName}. Server error.`, 'danger');
      throw err;
    }
  };

  // Filtered & Sorted Users List
  const filteredUsers = users
    .filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query) ||
        user.company?.name?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'company') {
        const compA = a.company?.name || '';
        const compB = b.company?.name || '';
        return compA.localeCompare(compB);
      }
      return Number(a.id) - Number(b.id);
    });

  return (
    <UserContext.Provider
      value={{
        users: filteredUsers,
        allUsersRaw: users,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        theme,
        toggleTheme,
        toasts,
        addToast,
        removeToast,
        refreshUsers: loadUsers,
        addUser: handleAddUser,
        editUser: handleUpdateUser,
        removeUser: handleRemoveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
