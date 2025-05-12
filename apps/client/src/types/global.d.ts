declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initDataUnsafe: {
          user?: {
            id?: string;
            first_name?: string;
            last_name?: string;
          };
          chat?: {
            id?: string;
          };
        };
      };
    };
  }
}

export {};
