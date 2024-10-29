import type { User as DBUser } from "./server/utils/drizzle";

declare module "#auth-utils" {
  interface User {
    id: DBUser["id"];
    email: DBUser["email"];
    name: DBUser["name"];
    role: DBUser["role"];
    avatar: DBUser["avatar"];
  }

  interface UserSession {}

  interface SecureSessionData {}
}

export {};
