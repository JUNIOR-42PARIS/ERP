import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}

export const useToasterStore = defineStore('toaster', () => {
  let id = 1;
  const toasts: Ref<{ id: number; content: string; type: ToastType; interval: NodeJS.Timer }[]> =
    ref([]);

  function addToast(content: string, type: ToastType): void {
    const currentID = id;

    const interval = setInterval(() => removeToast(currentID), 30000);

    toasts.value.push({
      id: currentID,
      content,
      type,
      interval
    });
    id++;
  }

  function removeToast(id: number) {
    const toastIndex = toasts.value.findIndex((toast) => toast.id === id);
    if (toastIndex >= 0) toasts.value.splice(toastIndex, 1);
  }

  return { toasts, addToast, removeToast };
});
