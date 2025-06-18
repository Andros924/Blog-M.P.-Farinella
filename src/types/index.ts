export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  slug: string;
  category: string;
  tags: string[];
  reading_time: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
}