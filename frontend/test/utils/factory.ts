import { MemberType } from "@/domain/enums/MemberType";
import { MissionStatus } from "@/domain/enums/MissionStatus";
import type { Client } from "@/domain/types/Client";
import type { Member } from "@/domain/types/Member";
import type { MissionRow, MissionRowWithMemberListAndClient } from "@/domain/types/Mission";

export function factoryMission(mission: Partial<MissionRow> = {}): MissionRow {
  return {
    id: 1,
    client: '',
    description: '',
    created_by: '',
    email_intermediaire: '',
    created_at: new Date().toISOString(),
    lien_drive: '',
    lien_github: '',
    nom: '',
    nom_intermediaire: '',
    status: MissionStatus.prospect,
    telephone_intermediaire: '',
    ...mission
  };
}

export function factoryClient(client: Partial<Client> = {}): Client {
  return {
    adresse: "",
    created_at: new Date().toISOString(),
    nom: "",
    numero_tva: null,
    siret: null,
    ...client,
  };
}

export function factoryMissionWithMemberList(
  mission: Partial<MissionRowWithMemberListAndClient> = {},
): MissionRowWithMemberListAndClient {
  return {
    id: 1,
    description: '',
    created_by: '',
    email_intermediaire: '',
    created_at: new Date().toISOString(),
    lien_drive: '',
    lien_github: '',
    nom: '',
    nom_intermediaire: '',
    status: MissionStatus.prospect,
    telephone_intermediaire: '',
    members_type: [],
    client: factoryClient(mission.client),
    ...mission,
  };
}

export function factoryMember(member: Partial<Member> = {}): Member {
  return {
    email: '',
    id_user: '',
    name: '',
    phone: '',
    pseudo: '',
    role: MemberType.Developpeur,
    ...member
  };
}
