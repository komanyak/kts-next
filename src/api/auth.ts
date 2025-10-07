const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://front-school-strapi.ktsdev.ru/api';

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type LoginCredentials = {
  identifier: string; // email or username
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export const authApi = {
  // Логин
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },

  // Регистрация
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },

  // Получение информации о текущем пользователе
  me: async (jwt: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },

  // Смена пароля
  changePassword: async (
    jwt: string,
    data: {
      currentPassword: string;
      password: string;
      passwordConfirmation: string;
    }
  ): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },
};

