import { useState } from "react";
import { LoginResponse } from "../pages/api/login";
import { useSessionUser } from "../session/useSessionUser";

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: updateLocalSession } = useSessionUser();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, access_token, refresh_token, user }: LoginResponse =
        await fetch("/api/login", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then((res) => res.json());
      if (error) {
        alert(`Unable to log in: ${error}`);
      } else {
        updateLocalSession({
          accessToken: access_token,
          refreshToken: refresh_token,
          user: {
            email: user.email!,
          },
        });
        alert("You are now logged in!");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Login to Shark Reporter</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Login"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
