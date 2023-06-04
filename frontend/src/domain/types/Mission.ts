import type { Database } from "@/types/database";
import type { Client } from "./Client";
import type { Member } from "@/domain/types/Member";

export type MissionRow = Database['public']['Tables']['missions']['Row'];
export type MissionIntervenantRow = Database['public']['Tables']['missions_intervenants']['Row'];
export type MissionRowWithMemberListAndClient = Omit<MissionRow, 'client'> & {
  members_type: (MissionIntervenantRow & {
    member: Member;
  })[];
  client: Client;
};