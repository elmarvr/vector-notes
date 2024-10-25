declare module "#auth-utils" {
  interface User {
    id: number;
    email: string;
    name: string;
  }

  interface UserSession {}

  interface SecureSessionData {}
}

export {};
