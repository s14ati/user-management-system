/**
 * API Service Module
 * Handles all CRUD requests (GET, POST, PUT, DELETE) to JSONPlaceholder API.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * 1. FETCH ALL USERS (GET)
 * Fetches list of all users from API
 */
export const fetchUsers = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users from server');
  }
  return await response.json();
};

/**
 * 2. FETCH SINGLE USER BY ID (GET)
 * Fetches user profile details by ID
 */
export const fetchUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return await response.json();
};

/**
 * 3. FETCH USER POSTS (GET)
 * Fetches blog posts authored by a specific user
 */
export const fetchUserPosts = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  return await response.json();
};

/**
 * 4. CREATE USER (POST)
 * Simulates sending new user data to API
 */
export const createUser = async (userData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return await response.json();
};

/**
 * 5. UPDATE USER (PUT)
 * Simulates updating existing user details by ID
 */
export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return await response.json();
};

/**
 * 6. DELETE USER (DELETE)
 * Simulates deleting a user by ID
 */
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return await response.json();
};
