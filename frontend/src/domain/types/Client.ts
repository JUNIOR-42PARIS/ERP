import type { Database } from "@/types/database";

export type Client = Database['public']['Tables']['clients']['Row'];
export type ClientDTO = Database['public']['Tables']['clients']['Insert'];