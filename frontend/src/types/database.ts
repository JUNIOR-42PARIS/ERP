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
          id_mission: number
          id_user: string
          type: Database["public"]["Enums"]["intervenants_type"] | null
        }
        Insert: {
          id_mission: number
          id_user: string
          type?: Database["public"]["Enums"]["intervenants_type"] | null
        }
        Update: {
          id_mission?: number
          id_user?: string
          type?: Database["public"]["Enums"]["intervenants_type"] | null
        }
      }
      missions_phases: {
        Row: {
          created_at: string | null
          id: number
          id_mission: number
          type: Database["public"]["Enums"]["phase_type"]
        }
        Insert: {
          created_at?: string | null
          id?: number
          id_mission: number
          type?: Database["public"]["Enums"]["phase_type"]
        }
        Update: {
          created_at?: string | null
          id?: number
          id_mission?: number
          type?: Database["public"]["Enums"]["phase_type"]
        }
      }
      roles: {
        Row: {
          color: string
          is_administration: boolean
          name: string
        }
        Insert: {
          color: string
          is_administration?: boolean
          name: string
        }
        Update: {
          color?: string
          is_administration?: boolean
          name?: string
        }
      }
      users_informations: {
        Row: {
          email: string
          id_user: string
          name: string
          phone: string
          pseudo: string | null
          role: string | null
        }
        Insert: {
          email?: string
          id_user: string
          name?: string
          phone?: string
          pseudo?: string | null
          role?: string | null
        }
        Update: {
          email?: string
          id_user?: string
          name?: string
          phone?: string
          pseudo?: string | null
          role?: string | null
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
      is_user_member: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      intervenants_type: "cdp" | "developpeur"
      mission_status: "prospect" | "mission" | "abandonnee" | "finie"
      phase_type: "prospection" | "contractuelle" | "bon-commande" | "cloture"
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
          version: string | null
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
          version?: string | null
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
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
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

