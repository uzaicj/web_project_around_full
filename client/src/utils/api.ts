
import type {
  ApiOptions,
  UserData,
  CardData,
  UserFormData,
  CardFormData,
  AvatarFormData,
} from "../types/types";

export class Api {
  private _baseUrl: string;
  private _headers: ApiOptions["headers"];

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Recupera el token actual y prepara los encabezados
  private getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    };
  }

  async getUserInfo(): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this.getHeaders(),
      });

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async getInitialCards(): Promise<CardData[]> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/`, {
        headers: this.getHeaders(),
      });

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async addCard(data: CardFormData): Promise<CardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async likeCard(cardId: string): Promise<CardData> {
    try {
      const res = await fetch(
        `${this._baseUrl}/cards/${cardId}/likes`,
        {
          method: "PUT",
          headers: this.getHeaders(),
        }
      );

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async unlikeCard(cardId: string): Promise<CardData> {
    try {
      const res = await fetch(
        `${this._baseUrl}/cards/${cardId}/likes`,
        {
          method: "DELETE",
          headers: this.getHeaders(),
        }
      );

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async deleteCard(cardId: string): Promise<void> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (res.ok) {
        return await res.json();
      }

      throw new Error(`Error: ${res.status}`);
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const api = new Api({
  baseUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
