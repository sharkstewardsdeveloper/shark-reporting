import React from "react";
import {
  Container,
  Heading,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Input,
  Checkbox,
  Select,
  Divider,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";

export default function Report() {

  return (
    <Flex
      align="start"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundColor={[
        "brand.primaryLight",
        "brand.primaryLight",
        "brand.primaryLight",
      ]}
      color={["brand.white", "brand.white", "brand.white"]}
    >
      
        <VStack align="center" margin="auto" width="lg" height="100%">
          <Box m={2} p={3}>
            <Formik
                initialValues={{ location: "" }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false)
                  }, 1000)
              }}
              >
              {(props) => (
                <Form >
                  <Field name="location">
                    {({ field, form }) => (
                      <FormControl >
                        <FormLabel mb={2} htmlFor="location">Location</FormLabel>
                        <Input {...field} id="location" placeholder="San Francisco" />
                        {/* <FormErrorMessage>{form.errors.location}</FormErrorMessage> */}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="time">
                    {({ field, form }) => (
                      <FormControl >
                        <FormLabel mb={2} mt={2} htmlFor="Time">Time of Sighting</FormLabel>
                        <Select id="time" {...field} placeholder="Time of day">
                          <option value="3:00am">3:00 AM</option>
                          <option value="4:00am">4:00 PM</option>
                          <option value="5:00am">5:00 AM</option>
                          <option value="6:00am">6:00 AM</option>
                          <option value="7:00am">7:00 AM</option>
                          <option value="8:00am">8:00 AM</option>
                          <option value="9:00am">9:00 AM</option>
                          <option value="10:00am">10:00 AM</option>
                          <option value="11:00am">11:00 AM</option>
                          <option value="12:00pm">12:00 PM</option>
                          <option value="1:00pm">1:00 PM</option>
                          <option value="2:00pm">2:00 PM</option>
                          <option value="3:00pm">3:00 PM</option>
                          <option value="4:00pm">4:00 PM</option>
                          <option value="5:00pm">5:00 AM</option>
                          <option value="6:00pm">6:00 PM</option>
                          <option value="7:00pm">7:00 PM</option>
                          <option value="8:00pm">8:00 PM</option>
                          <option value="9:00pm">9:00 PM</option>
                          <option value="10:00pm">10:00 PM</option>
                          <option value="11:00pm">11:00 PM</option>
                          <option value="12:00am">12:00 AM</option>
                          <option value="1:00am">1:00 AM</option>
                          <option value="2:00am">2:00 AM</option>
                        </Select>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="sharkType">
                    {({ field, form }) => (
                      <FormControl colorScheme="teal">
                        <FormLabel mb={2} mt={2} htmlFor="sharkType">Shark Type</FormLabel>
                        <Input {...field} id="sharkType" placeholder="Type of Shark" />
                      </FormControl>
                    )}
                  </Field>
                  
                  <Field name="information">
                    {({ field, form }) => (
                      <FormControl colorScheme="teal">
                        <FormLabel mb={2} mt={2} htmlFor="information">Additional Information</FormLabel>
                        <Textarea {...field} id="information" placeholder="Details..." />
                      </FormControl>
                    )}
                  </Field>

                  <Box >
                    <Field name="email" >
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel mb={2} mt={2} htmlFor="email">Email</FormLabel>
                          <Input {...field} id="email" placeholder="Email" />
                          {/* <FormErrorMessage>{form.errors.email}</FormErrorMessage> */}
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box m={3}>
                    <Field>
                      {({ field }) => (
                        <FormControl>
                          <Flex flexDirection="row" justifyContent="left">
                            <Checkbox m={1} {...field} id="join" placeholder="join" />
                            <FormLabel m={2} >Hear about Shark Stewards updates</FormLabel>
                          </Flex>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Flex justifyContent="flex-end">
                    <Button
                      mt={1}
                      mb={2}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </VStack>
    </Flex>
  );
}
