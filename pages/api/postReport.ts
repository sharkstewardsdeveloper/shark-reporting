import { PostgrestError, User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export interface postReportResponse {
  data?: Object;
  error?: PostgrestError;
}

export default async function postReport(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  const { location, time: time_of_sighting, sharkType: shark_type, information: sighting_information, email  } = req.body;
  if (location === '' || undefined || null) {
    res
      .status(400)
      .json({ error: "You must provide a location." });
    return;
  }

  const { data, error } = await supabase
  .from('sighting_report')
  .insert([
    { 
      location: location,
      time_of_sighting: time_of_sighting,
      shark_type: shark_type,
      sighting_information: sighting_information,
      latitude: 'otherValue',
      longitude: 'otherValue',
      email: email,
       
    },
  ])
  if (error) {
    res.status(401).json({ error: error } as postReportResponse);
    return;
  } else {
    res
      .status(200)
      .json( data  as postReportResponse);
  }
}
