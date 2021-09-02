import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Button,
  Input,
  Checkbox,
  HStack,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormControlProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  useFormikContext,
  useField,
  FieldConfig,
} from "formik";
import * as Yup from "yup";
import { useSessionUser } from "../session/useSessionUser";
import { DateTime } from "luxon";
import { DatePicker } from "../components/DatePicker";

/** Which part of the form is currently being rendered. */
enum FormStep {
  /**
   * The actual context of the shark sighting:
   * - Location
   * - Time
   * - Shark Type
   * - Was caught by a fisherman?
   */
  SightingDetails,
  /**
   * Self-reported information about the user, including
   * whether they want to be subscribed to the Shark Stewards
   * newsletter.
   *
   * If the user is currently logged in, this step is skipped
   * (TODO: should gather this info on signup).
   */
  AuthorInfo,
}

export default function Report() {
  const [currentStep, setCurrentStep] = useState(FormStep.SightingDetails);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();
  const { session } = useSessionUser();

  const reportFormSchema = useMemo(
    () =>
      Yup.object().shape({
        locationName: Yup.string().required(
          "Please enter where you saw the shark."
        ),
        sightingTime: Yup.string()
          .required("Please enter when you saw the shark.")
          .default(() => DateTime.now().toISO()),
        email: Yup.string()
          .email("Invalid email")
          .default(() => {
            return session?.user.email;
          }),
        authorName: Yup.string(),
        sharkType: Yup.string().required(
          `Select the type of shark you saw or "I don't know."`
        ),
      }),
    [session?.user]
  );

  async function submitForm<FormValuesType>(
    values: FormValuesType,
    actions: FormikHelpers<FormValuesType>
  ) {
    console.log(values);
    try {
      const data = await fetch("/api/postReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session == null ? {} : { Authorization: session.accessToken }),
        },
        body: JSON.stringify(values),
      });
      console.log(data);
      if (data.status === 400) {
        setErrorMessage(`Please check the form for errors and try again.`);
      } else if (data.status === 401) {
        setErrorMessage(`Server Error: ${JSON.stringify(data.status)}`);
      } else {
        router.push("/confirmReport");
      }
    } catch (error: unknown) {
      let message: string;
      if (error instanceof Error) {
        message = `Something went wrong: ${error.message}`;
      } else {
        message = `Something went wrong. Please try again.`;
      }
      setErrorMessage(message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Flex
      align="start"
      justify="center"
      flexDirection="column"
      width="100%"
      height="100%"
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
              locationName: undefined,
              email: undefined,
              sightingTime: DateTime.now().toISO(),
              authorName: undefined,
              sharkType: undefined,
            }}
            validationSchema={reportFormSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              submitForm(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Field name="locationName">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={
                        form.errors.locationName && form.touched.locationName
                      }
                    >
                      <FormLabel mb={2} mt={2} htmlFor="locationName">
                        Where did you see the shark(s)?
                      </FormLabel>
                      <Input
                        {...field}
                        id="locationName"
                        placeholder="San Francisco"
                      />
                      {form.errors.locationName && form.touched.locationName ? (
                        <FormErrorMessage>
                          {form.errors.locationName}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <SightingDateField name="sightingTime" />

                <Field name="sharkType">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={
                        form.errors.sharkType && form.touched.sharkType
                      }
                    >
                      <FormLabel mb={2} mt={2} htmlFor="sharkType">
                        Do you know what kind of shark it was?
                      </FormLabel>
                      {/* TODO replace this with shark picker component, default to "I don't know" */}
                      <Input
                        {...field}
                        id="sharkType"
                        placeholder="Type of Shark"
                      />
                      {form.errors.sharkType && form.touched.sharkType ? (
                        <FormErrorMessage>
                          {form.errors.sharkType}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                <Field name="wasCaught">
                  {({ field, form }) => (
                    <FormControl isRequired marginTop={2}>
                      <HStack spacing="24px">
                        <Checkbox {...field} name="wasCaught" size="lg">
                          <FormLabel marginTop={2}>
                            I saw the shark get caught by a fisherman.
                          </FormLabel>
                        </Checkbox>
                      </HStack>
                      <FormHelperText>
                        Check this box if you saw the shark out of the water
                        after being removed by a human (even if it was later
                        returned safely).
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <SharkWasReleasedCheckboxField
                  name="wasReleased"
                  marginBottom={2}
                />

                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel mb={2} mt={2} htmlFor="description">
                        Is there other information you can provide?
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
                      {form.errors.description && form.touched.description ? (
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                  )}
                </Field>

                {currentStep === FormStep.AuthorInfo && (
                  <Box>
                    <Field name="authorName">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel mb={2} htmlFor="authorName">
                            Author Name
                          </FormLabel>
                          <Input
                            {...field}
                            id="authorName"
                            placeholder="Your Name"
                          />
                          {form.errors.authorName && form.touched.authorName ? (
                            <FormErrorMessage>
                              {form.errors.authorName}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel mb={2} mt={4} htmlFor="email">
                            Email
                          </FormLabel>
                          <Input
                            {...field}
                            id="email"
                            placeholder="Email"
                            type="email"
                          />
                          {form.errors.email && form.touched.email ? (
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
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
                )}
                {session == null && currentStep === FormStep.SightingDetails ? (
                  <Button
                    mt={4}
                    mb={2}
                    width="100%"
                    isDisabled={!props.dirty || !props.isValid}
                    isLoading={props.isSubmitting || props.isValidating}
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        currentStep === FormStep.SightingDetails &&
                        session == null
                      ) {
                        setCurrentStep(FormStep.AuthorInfo);
                      }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    mt={4}
                    mb={2}
                    width="100%"
                    isDisabled={!props.touched || !props.isValid}
                    isLoading={props.isSubmitting || props.isValidating}
                    type={"submit"}
                  >
                    Submit
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </VStack>
    </Flex>
  );
}

function SightingDateField(props: FieldConfig) {
  const { setFieldValue, setFieldError } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <FormControl isRequired isInvalid={meta.error && meta.touched}>
      <FormLabel mb={2} mt={2} htmlFor="sightingTime">
        When?
      </FormLabel>
      <DatePicker
        id="sightingTime"
        showTimeSelect
        dateFormat={"MMMM d, yyyy h:mm aa"}
        selected={
          field.value == null
            ? undefined
            : DateTime.fromISO(field.value).toJSDate()
        }
        onChange={(value) => {
          if (Array.isArray(value)) {
            setFieldError(field.name, "Date ranges are not supported.");
            return;
          }
          setFieldValue(field.name, DateTime.fromJSDate(value).toISO());
        }}
      />
      {meta.error && meta.touched ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

/**
 * @see https://formik.org/docs/examples/dependent-fields
 */
function SharkWasReleasedCheckboxField({
  marginBottom,
  ...fieldProps
}: FieldConfig & Pick<FormControlProps, "marginBottom">) {
  const {
    values: { wasCaught },
    setFieldValue,
  } = useFormikContext<{ wasCaught?: boolean }>();
  const [field, meta] = useField(fieldProps);

  React.useEffect(() => {
    if (!wasCaught) {
      setFieldValue(fieldProps.name, undefined, false);
    }
  }, [wasCaught, setFieldValue, fieldProps.name]);

  if (!wasCaught) {
    return null;
  }

  return (
    <FormControl
      isRequired
      isDisabled={!wasCaught}
      isInvalid={meta.error && meta.touched}
      marginBottom={marginBottom}
    >
      <Checkbox {...field} name="wasReleased" size="lg">
        <FormLabel marginTop={2}>
          The shark was safely released after being caught.
        </FormLabel>
      </Checkbox>
      {wasCaught && (
        <FormHelperText>
          Check this box if you saw the fisherman who caught the shark(s) also
          release them safely back into the ocean.
        </FormHelperText>
      )}
    </FormControl>
  );
}
