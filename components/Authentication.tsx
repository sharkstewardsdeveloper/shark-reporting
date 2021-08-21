import * as React from "react";
import { Session } from "../session/session";
import { SessionUserContext, SessionUserContextValue } from "../session/useSessionUser";

interface AuthenticationProps {
    children: React.ReactNode;
};

export function Authentication({ children }: AuthenticationProps) {
    const [session, setSession] = React.useState<Session>(null);

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