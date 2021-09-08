import * as React from "react";
import { Session } from "../session/session";
import {
  SessionUserContext,
  SessionUserContextValue,
} from "../session/useSessionUser";
import { supabase } from "../utils/supabaseClient";

interface AuthenticationProps {
  children: React.ReactNode;
}

export function Authentication({ children }: AuthenticationProps) {
  const [session, setSession] = React.useState<Session>(null);
  React.useEffect(() => {
    const existingSession = supabase.auth.session();
    if (existingSession != null) {
      setSession(existingSession);
    }
  }, [setSession]);

  function login(session: Session) {
    setSession(session);
  }

  function logout() {
    setSession(null);
  }

  return (
    <SessionUserContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionUserContext.Provider>
  );
}
