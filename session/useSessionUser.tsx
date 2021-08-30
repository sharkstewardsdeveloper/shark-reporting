import React from "react";
import { Session } from "./session";

export const SessionUserContext =
  React.createContext<SessionUserContextValue>(null);

export interface SessionUserContextValue {
  session?: Session | undefined;
  login: (session: Session) => void;
  logout: () => void;
}

export function useSessionUser() {
  return React.useContext(SessionUserContext);
}
