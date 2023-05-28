import { MemberType, type Member } from '@/stores/member';
import type { MissionRow, MissionRowWithMemberList } from '@/stores/mission';
import MissionStatus from '@/types/missionStatus';

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

export function factoryMissionWithMemberList(
  mission: Partial<MissionRowWithMemberList> = {}
): MissionRowWithMemberList {
  return {
    members_type: [],
    ...factoryMission(mission)
  };
}

export function factoryMember(member: Partial<Member> = {}): Member {
  return {
    email: '',
    id_user: '',
    name: '',
    phone: '',
    role: MemberType.Developpeur,
    ...member
  };
}
