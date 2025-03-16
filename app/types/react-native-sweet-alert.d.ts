declare module 'react-native-sweet-alert' {
  interface SweetAlertOptions {
    title?: string;
    subTitle?: string;
    confirmButtonTitle?: string;
    confirmButtonColor?: string;
    style?: 'success' | 'error' | 'warning' | 'info';
    cancellable?: boolean;
  }

  interface SweetAlert {
    showAlertWithOptions(options: SweetAlertOptions): void;
  }

  const SweetAlert: SweetAlert;
  export default SweetAlert;
} 