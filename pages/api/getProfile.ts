import { User } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export type GetProfileResponse = ProfileResponse | {
    success: false;
    error: string;
}

export interface ProfileResponse extends User {
    success: true;
    username: string;
    avatarUrl?: string;
}

export default async function getProfile(req: NextApiRequest, res: NextApiResponse) {
    const authToken = req.headers.authorization;
    if (authToken == null) {
        const response: GetProfileResponse = { error: "Missing auth token", success: false };
        res.status(401).json(response);
        return;
    }
    
    supabase.auth.setAuth(authToken);
    const { data: user, error } = await supabase.auth.api.getUser(authToken);
    if (error) {
        const response: GetProfileResponse = { error: error.message, success: false };
        res.status(400).json(response);
        return;
    }

    let { data: profileData, error: profileError, status: profileStatus } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

    if (error && profileStatus !== 406) {
        // TODO: What is this 406? Why is it special?
        res.status(400).json({ error: profileError, success: false });
        return;
    } else {
        const response: GetProfileResponse = {
            // TODO: Send less
            success: true,
            ...user,
            ...profileData,
        };
        res.status(200).json(response);
    }
  }
  