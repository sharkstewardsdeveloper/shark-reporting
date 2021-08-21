import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email;
  const data = await supabase.auth.signIn({ email });
  const error = data.error;
  if (error) {
    res.status(400).json({ error });
  } else {
    console.log(data);
    const access_token = data.session.access_token;
    const user = data.user;
    res.status(200).json({ access_token, user });
  }
}
