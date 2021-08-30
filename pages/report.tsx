import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Button,
  Input,
  Checkbox,
  Select,
  HStack,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

export default function Report() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  const reportFormSchema = Yup.object().shape({
    locationName: Yup.string().required("Required"),
    sightingTime: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email"),
    authorName: Yup.string().required("Required"),
    sharkType: Yup.string().required("Required"),
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    const data = await fetch("/api/postReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (data.status === 400) {
      setErrorMessage(`Error: Location Required`);
      console.log(data);
    } else if (data.status === 401) {
      setErrorMessage(`Server Error: ${JSON.stringify(data.status)}`);
      console.log(data);
    } else {
      console.log(data);
      router.push("/confirmReport");
    }
  };

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
          {errorMessage != null && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Formik
            initialValues={{
              locationName: "",
              email: "",
              sightingTime: "",
              authorName: "",
              sharkType: "",
            }}
            validationSchema={reportFormSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleFormSubmit(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Field name="authorName">
                  {({ field, form }) => (
                    <FormControl colorScheme="teal">
                      <FormLabel mb={2} htmlFor="authorName">
                        Author Name
                      </FormLabel>
                      <Input
                        {...field}
                        id="authorName"
                        placeholder="Your Name"
                      />
                      {form.errors.authorName && form.touched.authorName ? (
                        <div>{form.errors.authorName}</div>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <Field name="locationName">
                  {({ field, form }) => (
                    <FormControl colorScheme="teal">
                      <FormLabel mb={2} mt={2} htmlFor="locationName">
                        Location
                      </FormLabel>
                      <Input
                        {...field}
                        id="locationName"
                        placeholder="San Francisco"
                      />
                      {form.errors.locationName && form.touched.locationName ? (
                        <div>{form.errors.locationName}</div>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <Field name="sightingTime">
                  {({ field, form }) => (
                    <FormControl colorScheme="teal">
                      <FormLabel mb={2} mt={2} htmlFor="sightingTime">
                        Time of Sighting
                      </FormLabel>
                      <Select
                        id="sightingTime"
                        {...field}
                        placeholder="Time of day"
                      >
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
                      {form.errors.sightingTime && form.touched.sightingTime ? (
                        <div>{form.errors.sightingTime}</div>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <Field name="sharkType">
                  {({ field, form }) => (
                    <FormControl colorScheme="teal">
                      <FormLabel mb={2} mt={2} htmlFor="sharkType">
                        Shark Type
                      </FormLabel>
                      <Input
                        {...field}
                        id="sharkType"
                        placeholder="Type of Shark"
                      />
                      {form.errors.sharkType && form.touched.sharkType ? (
                        <div>{form.errors.sharkType}</div>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <Field name="description">
                  {({ field, form }) => (
                    <FormControl colorScheme="teal">
                      <FormLabel mb={2} mt={2} htmlFor="description">
                        Description
                      </FormLabel>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Details..."
                      />
                      <FormHelperText>
                        The more accurate our data the more of an impact we can
                        make{" "}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <HStack>
                  <Field name="wasCaught">
                    {({ field, form }) => (
                      <FormControl colorScheme="teal">
                        <FormLabel mt={4} as="legend">
                          Was the shark caught?
                        </FormLabel>
                        <HStack spacing="24px">
                          <Checkbox {...field} name="wasCaught" value={true}>
                            True
                          </Checkbox>
                          <Checkbox {...field} name="wasCaught" value={false}>
                            False
                          </Checkbox>
                        </HStack>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="wasReleased">
                    {({ field, form }) => (
                      <FormControl colorScheme="teal">
                        <FormLabel mt={6} as="legend">
                          Was the shark released?
                        </FormLabel>
                        <HStack spacing="24px">
                          <Checkbox {...field} name="wasReleased" value={true}>
                            True
                          </Checkbox>
                          <Checkbox {...field} name="wasReleased" value={false}>
                            False
                          </Checkbox>
                        </HStack>
                        <FormHelperText></FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <Box>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel mb={2} mt={4} htmlFor="email">
                          Email
                        </FormLabel>
                        <Input {...field} id="email" placeholder="Email" />
                        {form.errors.email && form.touched.email ? (
                          <div>{form.errors.email}</div>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box m={3}>
                  <HStack>
                    <Field name="shouldSubscribe">
                      {({ field }) => (
                        <FormControl>
                          <Flex flexDirection="row" justifyContent="left">
                            <Checkbox m={1} {...field} id="shouldSubscribe" />
                            <FormLabel m={2}>
                              Hear about Shark Stewards updates
                            </FormLabel>
                          </Flex>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="confirmedGetAppUpdates">
                      {({ field }) => (
                        <FormControl>
                          <Flex flexDirection="row" justifyContent="left">
                            <Checkbox
                              m={1}
                              {...field}
                              id="confirmedGetAppUpdates"
                            />
                            <FormLabel m={2}>
                              Subscribe to App Updates
                            </FormLabel>
                          </Flex>
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
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
