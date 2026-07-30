export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  categories: string[];
  tags: string[];
  status: PostStatus;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CursoEvento = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  event_date: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Partial<Post> &
          Pick<Post, "title" | "slug" | "excerpt" | "content">;
        Update: Partial<Post>;
        Relationships: [];
      };
      cursos_eventos: {
        Row: CursoEvento;
        Insert: Partial<CursoEvento> &
          Pick<CursoEvento, "title" | "slug" | "excerpt" | "content">;
        Update: Partial<CursoEvento>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
