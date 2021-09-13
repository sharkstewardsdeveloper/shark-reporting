import { useToast } from "@chakra-ui/toast";
import * as React from "react";
import { Session } from "../session/session";
import { SessionUserContext } from "../session/useSessionUser";
import { supabase } from "../utils/supabaseClient";

interface AuthenticationProps {
  children: React.ReactNode;
}

export function Authentication({ children }: AuthenticationProps) {
  const toast = useToast();
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
    supabase.auth
      .signOut()
      .then(() => {
        setSession(null);
      })
      .catch(() => {
        toast({
          status: "error",
          title: "Unable to sign out",
          description: "Please reopen the browser window and try again.",
        });
      });
  }

  return (
    <SessionUserContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionUserContext.Provider>
  );
}
