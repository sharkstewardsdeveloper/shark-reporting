import { Auth } from "../components/Auth";
import { Account } from "../components/Account";
import { Authentication } from "../components/Authentication";
import { useSessionUser } from "../session/useSessionUser";
import React from "react";

export default function App() {
  return (
    <Authentication>
      <Home />
    </Authentication>
  );
}

function Home() {
  const { session } = useSessionUser();
  return (
    <main>
      <AppHeader />
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth />
        ) : (
          <Account session={session} />
        )}
      </div>
      <AppFooter />
    </main>
  )
}

function AppHeader() {
  const { session, logout } = useSessionUser();
  return (
    <header>
      <h1>Shark Reporting</h1>
      {session == null ? <button>Login</button> : <button onClick={logout}>Logout</button>}
    </header>
  );
}

function AppFooter() {
  return <footer>Go Sharks!</footer>;
}
