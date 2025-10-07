import { authApi, type User, type LoginCredentials, type RegisterCredentials } from '@api/auth';
import { makeAutoObservable, runInAction } from 'mobx';

const AUTH_TOKEN_KEY = 'kts-auth-token';
const AUTH_USER_KEY = 'kts-auth-user';

export class AuthStore {
  user: User | null = null;
  token: string | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userStr = localStorage.getItem(AUTH_USER_KEY);

    if (token && userStr) {
      try {
        runInAction(() => {
          this.token = token;
          this.user = JSON.parse(userStr);
        });
      } catch {
        this.clearAuth();
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;

    if (this.token && this.user) {
      localStorage.setItem(AUTH_TOKEN_KEY, this.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(this.user));
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }

  private clearAuth(): void {
    runInAction(() => {
      this.user = null;
      this.token = null;
      this.error = null;
    });
    this.saveToStorage();
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const response = await authApi.login(credentials);

      runInAction(() => {
        this.token = response.jwt;
        this.user = response.user;
        this.loading = false;
      });

      this.saveToStorage();
    } catch (error: unknown) {
      runInAction(() => {
        this.error = (error as { error?: { message?: string } }).error?.message || 'Invalid identifier or password';
        this.loading = false;
      });
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const response = await authApi.register(credentials);

      runInAction(() => {
        this.token = response.jwt;
        this.user = response.user;
        this.loading = false;
      });

      this.saveToStorage();
    } catch (error: unknown) {
      runInAction(() => {
        this.error = (error as { error?: { message?: string } }).error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      });
      throw error;
    }
  }

  logout(): void {
    this.clearAuth();
  }

  async refreshUserData(): Promise<void> {
    if (!this.token) return;

    try {
      const user = await authApi.me(this.token);
      runInAction(() => {
        this.user = user;
      });
      this.saveToStorage();
    } catch {
      this.clearAuth();
    }
  }

  clearError(): void {
    this.error = null;
  }
}

