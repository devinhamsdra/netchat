// Contact Model
export interface Contact {
  id: string;
  userId: string;
  contactUserId: string;
  contactName: string;
  contactProfileImage?: string;
  label?: string; // 'favorite', 'friend', 'family', etc.
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ContactGroup {
  id: string;
  userId: string;
  name: string;
  contacts: Contact[];
  createdAt: number;
  updatedAt: number;
}
