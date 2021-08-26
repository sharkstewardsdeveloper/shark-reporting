import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export interface signUpResponse {
    user?: User;
    error?: string;
  }
  
  export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    if (email == null || password == null) {
      res
        .status(400)
        .json({ error: "You must provide both your email and password." });
      return;
    }
  
    const data = await supabase.auth.signUp({ email, password });
    const error = data.error;
    if (error) {
      res.status(401).json({ error: error.message } as signUpResponse);
      return;
    } else {
      console.log(data);
      const user = data.user;
      res
        .status(200)
        .json({ user } as signUpResponse);
    }
  }