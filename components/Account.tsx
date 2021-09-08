import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { GetProfileResponse } from "../pages/api/getProfile";
import { Session } from "../session/session";

interface AccountProps {
  session: Session;
}

interface AccountDetails extends User {
  username: string;
  avatarUrl?: string;
}

export function Account({ session }: AccountProps) {
  const [profile, setProfile] = useState<AccountDetails>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const response: GetProfileResponse = await fetch("/api/getProfile", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: session.access_token,
        },
      }).then((res) => res.json());

      if (response.success) {
        setProfile(response);
      } else if (response.success === false) {
        // weird type inference thing, !response.success was not enough here
        alert(`Unable to log in: ${response.error}`);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {profile != null && (
        <>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled />
          </div>
          <div>
            <label htmlFor="username">Name</label>
            <input id="username" type="text" value={profile.username} />
          </div>
        </>
      )}
    </div>
  );
}
