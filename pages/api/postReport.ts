import { PostgrestError, User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export interface postReportResponse {
  data?: Object;
  error?: PostgrestError;
}

export default async function postReport(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  const { 
    locationName, 
    sightingTime,
    sharkType,
    description,
    email,
    locationLong,
    locationLat,
    userId, 
    shouldSubscribe, 
    authorName, 
    confirmedGetAppUpdates, 
    wasCaught, 
    wasReleased,

  } = req.body;

  if (locationName == null || locationName === "") {
    res
      .status(400)
      .json({ error: "You must provide a location." });
    return;
  }

  const { data, error } = await supabase
  .from('form_submissions')
  .insert([
    { 
      user_id: userId,
      location_name: locationName,
      sighting_time: sightingTime,
      shark_type: sharkType,
      description: description,
      location_lat: locationLat,
      location_long: locationLong,
      email: email,
      should_subscribe: shouldSubscribe ? shouldSubscribe : false,
      author_name: authorName,
      confirmed_get_app_updates: confirmedGetAppUpdates ? confirmedGetAppUpdates : false,
      was_caught: wasCaught ? wasCaught : false,
      was_released: wasCaught && wasReleased ? wasReleased : null,
       
    },
  ])
  if (error) {
    console.log(error)
    res.status(400).json({ error: error } as postReportResponse);
    return;
  } else {
    res
      .status(200)
      .json( data  as postReportResponse);
  }
}
