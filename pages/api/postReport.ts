import type { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { FormSubmission, reportFormSchema } from "../../model/form_submission";
import { supabase } from "../../utils/supabaseClient";

export type PostReportResponse =
  | {
      success: true;
      submission: FormSubmission;
    }
  | {
      success: false;
      error: string;
    };

export default async function postReport(
  req: NextApiRequest,
  res: NextApiResponse<PostReportResponse>
) {
  const authToken = req.headers.authorization;
  let user_id: string | undefined;
  if (authToken != null) {
    supabase.auth.setAuth(authToken);
    const { data, error } = await supabase.auth.api.getUser(authToken);
    if (error) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
      return;
    }
    user_id = data.id;
  }

  try {
    const validEntries = await reportFormSchema.validate({
      ...req.body,
      user_id,
    });
    const { data, error } = await supabase
      .from("form_submissions")
      .insert(validEntries);
    if (error) {
      console.error(error);
      res.status(400).json({ success: false, error: error.message });
      return;
    } else {
      res.status(201).json({ success: true, submission: data[0] });
    }
  } catch (e) {
    let status = e instanceof ValidationError ? 422 : 400;
    let error = "Something went wrong. Please try again.";
    if (e.message != null) {
      error = e.message;
    }
    res.status(status).json({ success: false, error });
  }
}
