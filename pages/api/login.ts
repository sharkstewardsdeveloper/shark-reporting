import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const {email, password} = req.body;
  if (email == null || password == null) {
    res.status(400).json({ error: "You must provide both your email and password." });
    return;
  }

  const data = await supabase.auth.signIn({ email, password });
  const error = data.error;
  if (error) {
    res.status(400).json({ error });
    return;
  } else {
    console.log(data);
    const access_token = data.session.access_token;
    const user = data.user;
    res.status(200).json({ access_token, user });
  }
}
