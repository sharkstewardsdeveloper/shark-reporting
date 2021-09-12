import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

export type UUID = typeof uuidv4;

// TODO: When supabase releases type generation, use it instead of this
// hand-copied type https://supabase.io/docs/reference/javascript/generating-types

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
  // TODO: Use a more restrictive type (like `SharkType`)
  shark_type: string;
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
  /** Other free text details submitted by user. */
  description?: string | null;

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
  confirmed_get_app_updates: boolean;
  storage_folder: string | null;
}

/** Shark species that can be specified in the reporting form. */
export enum SharkType {
  /** Any other shark species not listed above. */
  other = "other",
}

/** An form submission that has not yet been validated or persisted. */
export type UnsubmittedFormResponse = Omit<
  FormSubmission,
  "id" | "user_id" | "created_at"
>;

export const reportFormSchema: Yup.SchemaOf<UnsubmittedFormResponse> =
  // See: https://github.com/jquense/yup#api
  Yup.object({
    shark_type: Yup.string().required(
      `Select the type of shark you saw or "I don't know."`
    ),
    location_name: Yup.string().required(
      "Please enter where you saw the shark."
    ),
    sighting_time: Yup.string()
      .required("Please enter when you saw the shark.")
      .default(() => DateTime.now().toISO()),
    was_caught: Yup.boolean().required(
      "Please select whether the shark was caught by a fisherman."
    ),
    was_released: Yup.boolean().required(
      "Please select whether the shark was released by a fisherman."
    ),
    description: Yup.string(),
    location_lat: Yup.string(),
    location_long: Yup.string(),
    // Author Info
    email: Yup.string().email("Invalid email"),
    author_name: Yup.string(),
    should_subscribe: Yup.boolean(),
    confirmed_get_app_updates: Yup.boolean(),
    storage_folder: Yup.string().uuid(),
  });
