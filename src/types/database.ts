export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          email: string;
          name?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          image_url: string;
          twitter_url: string | null;
          facebook_url: string | null;
          linkedin_url: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          role: string;
          image_url: string;
          twitter_url?: string;
          facebook_url?: string;
          linkedin_url?: string;
        };
      };
    };
  };
} 