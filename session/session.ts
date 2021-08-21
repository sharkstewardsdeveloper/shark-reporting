export interface Session {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface User {
  email: string;
  name?: string;
}
