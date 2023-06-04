import { describe, it, expect, vi } from 'vitest';

import { flushPromises, shallowMount } from '@vue/test-utils';
import MissionChefDeProjetSelect from '@/components/mission/MissionChefDeProjetSelect.vue';
import { factoryMember, factoryMissionWithMemberList } from '#/utils/factory';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Multiselect from 'vue-multiselect';
import { useMemberStore } from '@/stores/member';
import { IntervenantType } from '@/domain/enums/IntervenantType';

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn()
}));

describe('MissionChefDeProjetSelect', () => {
  it('devrait afficher "aucun" en tant que placeholder', () => {
    const wrapper = shallowMount(MissionChefDeProjetSelect, {
      props: {
        mission: factoryMissionWithMemberList()
      }
    });
    expect(wrapper.text()).toContain('Aucun');
  });

  it('devrait afficher le menu select lors du click sur le crayon', async () => {
    const wrapper = shallowMount(MissionChefDeProjetSelect, {
      props: {
        mission: factoryMissionWithMemberList()
      }
    });

    const store = useMemberStore();
    store.memberList = [factoryMember({ name: 'Test 1' }), factoryMember({ name: 'Test 2' })];

    wrapper.findComponent(FontAwesomeIcon).vm.$emit('click');
    await flushPromises();

    expect(store.fetchMemberCdpOrAdminList).toHaveBeenCalledOnce();

    const selectComponent = wrapper.findComponent(Multiselect);
    expect(selectComponent.exists()).toBe(true);
  });

  it("ne devrait pas emettre un event lors de la fermeture quand le cdp n'a pas été modifié", async () => {
    const wrapper = shallowMount(MissionChefDeProjetSelect, {
      props: {
        mission: factoryMissionWithMemberList()
      }
    });

    const store = useMemberStore();
    const member1 = factoryMember({ id_user: 'test1', name: 'Test 1' });
    store.memberList = [member1, factoryMember({ name: 'Test 2' })];

    (wrapper.vm as any).isEditingCdp = true;
    await wrapper.vm.$nextTick();

    await (wrapper.findComponent(Multiselect).vm as any).$emit('close');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('edit-cdp')).toBeFalsy();
  });

  it('devrait emettre un event lors de la fermeture du menu select', async () => {
    const wrapper = shallowMount(MissionChefDeProjetSelect, {
      props: {
        mission: factoryMissionWithMemberList()
      }
    });

    const store = useMemberStore();
    const member1 = factoryMember({ id_user: 'test1', name: 'Test 1' });
    store.memberList = [member1, factoryMember({ name: 'Test 2' })];

    (wrapper.vm as any).isEditingCdp = true;
    await wrapper.vm.$nextTick();

    await (wrapper.findComponent(Multiselect).vm as any).$emit('update:modelValue', member1);
    await (wrapper.findComponent(Multiselect).vm as any).$emit('close');

    expect(wrapper.emitted('edit-cdp')?.[0][0]).toStrictEqual({
      idNewCdp: 'test1',
      idOldCdp: null
    });
  });

  it("devrait emettre un event lors de la fermeture du menu select avec l'id de l'ancien CDP", async () => {
    const wrapper = shallowMount(MissionChefDeProjetSelect, {
      props: {
        mission: factoryMissionWithMemberList({
          members_type: [
            {
              type: IntervenantType.Developpeur,
              id_mission: 0,
              id_user: 'oldDev1',
              member: factoryMember({ id_user: 'oldDev1' })
            },
            {
              type: IntervenantType.CDP,
              id_mission: 0,
              id_user: 'oldCdp',
              member: factoryMember({ id_user: 'oldCdp' })
            },
            {
              type: IntervenantType.Developpeur,
              id_mission: 0,
              id_user: 'oldDev2',
              member: factoryMember({ id_user: 'oldDev2' })
            }
          ]
        })
      }
    });

    const store = useMemberStore();
    const member1 = factoryMember({ id_user: 'test1', name: 'Test 1' });
    store.memberList = [member1, factoryMember({ name: 'Test 2' })];

    (wrapper.vm as any).isEditingCdp = true;
    await wrapper.vm.$nextTick();

    await (wrapper.findComponent(Multiselect).vm as any).$emit('update:modelValue', member1);
    await (wrapper.findComponent(Multiselect).vm as any).$emit('close');

    expect(wrapper.emitted('edit-cdp')?.[0][0]).toStrictEqual({
      idNewCdp: 'test1',
      idOldCdp: 'oldCdp'
    });
  });
});
