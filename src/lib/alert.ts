import Swal, { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Alert = {
  success: (title: string, text?: string, options?: SweetAlertOptions) => {
    return MySwal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      ...options,
    });
  },

  error: (title: string, text?: string, options?: SweetAlertOptions) => {
    return MySwal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#d33',
      ...options,
    });
  },

  warning: (title: string, text?: string, options?: SweetAlertOptions) => {
    return MySwal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: '#f59e0b',
      ...options,
    });
  },

  info: (title: string, text?: string, options?: SweetAlertOptions) => {
    return MySwal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: '#3b82f6',
      ...options,
    });
  },

  loading: (title: string = 'Memproses...', text: string = 'Mohon tunggu sebentar.') => {
    return MySwal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
  },

  close: () => {
    MySwal.close();
  },

  confirm: async (
    title: string,
    text: string,
    confirmText: string = 'Ya, Lanjutkan!',
    cancelText: string = 'Batal'
  ) => {
    return MySwal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  },
};
