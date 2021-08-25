import { v4 as uuidv4 } from "uuid";

export type UUID = typeof uuidv4;

/** A persisted record of a form submission fetched from the DB. */
export interface FormSubmission {
  id: UUID;
  /** The time the record was added to the DB. Postgres timestamptz. */
  created_at: string;
  /**
   * Supabase user ID of the author, if they were logged in while submitting
   * the form.
   */
  user_id?: UUID | null;

  /** The type of shark that was sighted. */
  shark_type: SharkType;
  /**
   * The time the shark was sighted, according to the author.
   * Postgres timestamptz.
   */
  sighting_time: string;
  /** Whether the author saw the shark get caught by a fisherman. */
  was_caught: boolean;
  /**
   * Whether the author saw the shark get release after being cuaght by a
   * fisherman.
   */
  was_released: boolean;

  /**
   * Optional common location name for the place where the shark was
   * sighted, e.g. "Pier 39"
   */
  location_name?: string | null;
  /** String representation of the latitude where the shark was sighted. */
  location_lat?: string | null;
  /** String representation of the longitude where the shark was sighted. */
  location_long?: string | null;

  /** Email submitted by the author of the submission. */
  email?: string | null;
  /** The name of the author of the submission, as submitted. */
  author_name?: string | null;
  /** Whether the author has opted into receving Shark Stewards' newsletter. */
  should_subscribe: boolean;
  /** Whether the author has opted into receving updates about the app. */
  confirm_get_app_updates: boolean;
}

/** Shark species that can be specified in the reporting form. */
export enum SharkType {
  /** Any other shark species not listed above. */
  other = "other",
}
