import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub, config } from '@vue/test-utils';
import { beforeAll, vi } from 'vitest';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { multiselectMixin } from 'vue-multiselect';

beforeAll(() => {
  library.add(far, fas);

  config.global.renderStubDefaultSlot = true;
  config.global.stubs['font-awesome-icon'] = FontAwesomeIcon;
  config.global.stubs['RouterLink'] = RouterLinkStub;
  config.global.stubs['Multiselect'] = multiselectMixin;
  config.global.plugins = [
    createTestingPinia({
      createSpy: vi.fn
    })
  ];
});
