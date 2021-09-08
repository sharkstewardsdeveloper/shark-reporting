import { Session as SupabaseSession } from "@supabase/gotrue-js";

export type Session = SupabaseSession;

export type User = Pick<SupabaseSession, "user">;
