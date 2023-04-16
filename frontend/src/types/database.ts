export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clients: {
        Row: {
          adresse: string
          created_at: string
          nom: string
          numero_tva: string | null
          siret: string | null
        }
        Insert: {
          adresse: string
          created_at?: string
          nom: string
          numero_tva?: string | null
          siret?: string | null
        }
        Update: {
          adresse?: string
          created_at?: string
          nom?: string
          numero_tva?: string | null
          siret?: string | null
        }
      }
      missions: {
        Row: {
          client: string
          created_at: string | null
          created_by: string
          description: string | null
          email_intermediaire: string | null
          id: number
          lien_drive: string | null
          lien_github: string | null
          nom: string
          nom_intermediaire: string | null
          status: Database["public"]["Enums"]["mission_status"]
          telephone_intermediaire: string | null
        }
        Insert: {
          client: string
          created_at?: string | null
          created_by: string
          description?: string | null
          email_intermediaire?: string | null
          id?: number
          lien_drive?: string | null
          lien_github?: string | null
          nom: string
          nom_intermediaire?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          telephone_intermediaire?: string | null
        }
        Update: {
          client?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          email_intermediaire?: string | null
          id?: number
          lien_drive?: string | null
          lien_github?: string | null
          nom?: string
          nom_intermediaire?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          telephone_intermediaire?: string | null
        }
      }
      missions_intervenants: {
        Row: {
          created_at: string
          id: number
          intervenant: string
          mission: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          intervenant: string
          mission?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          intervenant?: string
          mission?: number | null
        }
      }
      roles: {
        Row: {
          color: string
          is_administration: boolean
          is_member: boolean | null
          name: string
        }
        Insert: {
          color: string
          is_administration?: boolean
          is_member?: boolean | null
          name: string
        }
        Update: {
          color?: string
          is_administration?: boolean
          is_member?: boolean | null
          name?: string
        }
      }
      users_informations: {
        Row: {
          created_at: string | null
          id_user: string
          name: string | null
          pseudo: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id_user: string
          name?: string | null
          pseudo?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id_user?: string
          name?: string | null
          pseudo?: string | null
          role?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_user_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      mission_status: "prospect" | "mission" | "abandonnee" | "finie"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

