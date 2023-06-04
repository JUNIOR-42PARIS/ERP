import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from './supabase';
import type { Member } from '@/domain/types/Member';
import { MemberType } from '@/domain/enums/MemberType';

export const useMemberStore = defineStore('member', () => {
  const memberList = ref<Member[]>([]);
  const editingMember = ref<Member | null>(null);

  const fetchMembers = async (): Promise<Member[]> => {
    memberList.value = [];
    const users = await supabase
      .from('users_informations')
      .select('*');
    if (users.error) {
      console.error(users.error);
    }
    if (users.data) {
      memberList.value = users.data;
    }
    return memberList.value;
  };

  const fetchMemberCdpOrAdminList = async (): Promise<Member[]> => {
    memberList.value = [];
    const users = await supabase
      .from('users_informations')
      .select('id_user, name, pseudo, email, phone, role, roles!inner(name, is_administration)')
      .or(`name.eq."${MemberType.ChefDeProjet}",is_administration.is.true`, {
        foreignTable: 'roles'
      });
    if (users.error) {
      console.error(users.error);
    }
    if (users.data) {
      memberList.value = users.data;
    }
    return memberList.value;
  };

  const editMember = async (
    idUser: string,
    values: Partial<Omit<Member, 'id_user'>>
  ): Promise<void> => {
    await supabase.from('users_informations').update(values).eq('id_user', idUser);
  };

  return {
    memberList,
    editingMember,
    fetchMembers,
    fetchMemberCdpOrAdminList,
    editMember
  };
});
