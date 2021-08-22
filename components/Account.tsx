import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
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
          Authorization: session.accessToken,
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

  async function updateProfile({ username, avatar_url }) {
    // try {
    //   setLoading(true);
    //   const user = supabase.auth.user();
    //   const updates = {
    //     id: user.id,
    //     username,
    //     avatar_url,
    //     updated_at: new Date(),
    //   };
    //   let { error } = await supabase.from("profiles").upsert(updates, {
    //     returning: "minimal", // Don't return the value after inserting
    //   });
    //   if (error) {
    //     throw error;
    //   }
    // } catch (error) {
    //   alert(error.message);
    // } finally {
    //   setLoading(false);
    // }
  }

  // function updatePassword() {
  //   supabase.auth.update({
  //     password,
  //   }).catch(error => console.log(error)).then(() => console.log("it worked"));
  // }
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
