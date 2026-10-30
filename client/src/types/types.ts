export type PopupConfig = {
  title?: string;
  children: React.ReactNode;
};

export interface ApiOptions {
  baseUrl: string;
  headers: {
    "Content-Type": string;
  };
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: UserFormData) => Promise<void>;
  handleUpdateAvatar: (data: AvatarFormData) => Promise<void>;
  handleAddPlaceSubmit: (data: CardFormData) => Promise<void>;
}