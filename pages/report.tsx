import React, { PropsWithChildren, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
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
  Container,
  useToast,
  Heading,
  Divider,
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
  FieldProps,
} from "formik";
import { useSessionUser } from "../session/useSessionUser";
import { DateTime } from "luxon";
import { DatePicker } from "../components/DatePicker";
import {
  reportFormSchema,
  SharkType,
  UnsubmittedFormResponse,
} from "../model/form_submission";
import { PostReportResponse } from "./api/postReport";

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

function useInitialFormValues(): UnsubmittedFormResponse {
  const email = useSessionUser().session?.user.email;
  return {
    location_name: undefined,
    sighting_time: DateTime.now().toISO(),
    shark_type: SharkType.other,
    was_caught: false,
    was_released: false,
    author_name: undefined,
    email,
    should_subscribe: false,
    confirmed_get_app_updates: false,
  };
}

export default function Report() {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(FormStep.SightingDetails);
  const router = useRouter();
  const { session } = useSessionUser();
  const defaultFormFormValues = useInitialFormValues();

  async function submitForm<FormValuesType>(
    values: FormValuesType,
    actions: FormikHelpers<FormValuesType>
  ) {
    try {
      const data = await fetch("/api/postReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session == null ? {} : { Authorization: session.accessToken }),
        },
        body: JSON.stringify(values),
      });
      const response: PostReportResponse = await data.json();
      // `=== true` narrows the type in the else-case
      if (response.success === true) {
        toast({
          title: "Report submitted successfully! Finishing up...",
          status: "success",
        });
        router.push("/confirmReport");
        return;
      }

      if (data.status === 422) {
        toast({
          title: "Check the form for errors",
          description: response.error,
          status: "error",
          isClosable: true,
        });
      } else if (data.status === 401) {
        toast({
          title: "Your session has expired",
          description: "Please log in again to continue.",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check your connection and try again.",
          status: "error",
          isClosable: true,
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Something went wrong",
        description: "Please check your connection and try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Container>
      <VStack marginBottom="8">
        <Alert status="info" colorScheme="gray">
          <AlertIcon />
          Fill out the information below to report what you have seen. This data
          is used for ocean conservation research purposes only.
        </Alert>
        <Formik
          initialValues={defaultFormFormValues}
          validationSchema={reportFormSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            submitForm(values, actions);
          }}
        >
          {(props) => (
            <Form>
              {currentStep == FormStep.SightingDetails && (
                <>
                  <StringFormField
                    fieldName="location_name"
                    isRequired
                    label="Where did you see the shark(s)?"
                    placeholder={`Pier 39`}
                    hint={
                      <>
                        Search for a location by typing above or select{" "}
                        <strong>My Location.</strong>
                      </>
                    }
                  >
                    <Button variant="ghost" size="sm" padding="5">
                      📍 My Location
                    </Button>
                  </StringFormField>

                  <SightingDateField name="sighting_time" />

                  <StringFormField
                    fieldName="shark_type"
                    isRequired
                    label="What kind of shark did you see?"
                    placeholder="Type of Shark"
                  />

                  <Box marginTop="8" marginBottom="8">
                    <CheckboxFormField
                      fieldName="was_caught"
                      label="I saw the shark get caught by a fisherman."
                      hint="Check this box if you saw the shark out of the water after being removed by a human (even if it was later returned safely)."
                    />
                    <SharkWasReleasedCheckboxField name="was_released" />
                  </Box>

                  <StringFormField
                    fieldName="description"
                    label="Is there other information you'd like provide?"
                    placeholder="Details..."
                    hint="The more accurate our data, the more of an impact you can make!"
                    inputType="long_answer"
                  />
                </>
              )}

              {currentStep === FormStep.AuthorInfo && (
                <Box marginTop="4" marginBottom="4">
                  <Heading size="sm">
                    Can we contact you about your report or other shark
                    preservation efforts? Your information will never be given
                    to a third party.
                  </Heading>
                  <Divider marginTop="2" marginBottom="3" />
                  <StringFormField
                    fieldName="author_name"
                    label="Your Name (optional)"
                    placeholder="Shark Friend"
                  />
                  <StringFormField
                    fieldName="email"
                    label="Your Email Address (optional)"
                    placeholder="shark.helper@example.com"
                    inputType="email"
                  />
                  <CheckboxFormField
                    fieldName="should_subscribe"
                    label="Subscribe to Shark Stewards updates"
                  />

                  <CheckboxFormField
                    fieldName="confirmed_get_app_updates"
                    label="I'd like to be notified when we improve this site"
                  />
                </Box>
              )}
              {session == null && currentStep === FormStep.SightingDetails ? (
                <Button
                  mt={4}
                  mb={2}
                  width="100%"
                  isDisabled={!props.touched || !props.isValid}
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
      </VStack>
    </Container>
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
        placeholderText="Pick a time..."
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

interface StringFormFieldProps {
  fieldName: keyof UnsubmittedFormResponse;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  inputType?: "short_answer" | "email" | "long_answer";
  /** Additional helper text displayed below the text input. */
  hint?: React.ReactNode;
}

/**
 * A Formik field for string-type inputs that renders using Chakra's form components.
 * @see https://formik.org/docs/api/field#component
 */
function StringFormField({
  fieldName,
  label,
  placeholder,
  hint,
  inputType = "short_answer",
  isRequired = false,
  children,
}: PropsWithChildren<StringFormFieldProps>) {
  const TextInputComponent = inputType === "long_answer" ? Textarea : Input;
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel marginTop={2} htmlFor={fieldName}>
        {label}
      </FormLabel>
      <Field name={fieldName}>
        {({ field, form }: FieldProps<string, UnsubmittedFormResponse>) => (
          <>
            <HStack>
              <TextInputComponent
                {...field}
                id={fieldName}
                placeholder={placeholder}
                type={
                  inputType !== "short_answer" && inputType !== "long_answer"
                    ? inputType
                    : undefined
                }
              />
              {children}
            </HStack>
            {hint && <FormHelperText>{hint}</FormHelperText>}
            {form.errors[fieldName] != null && form.touched[fieldName] ? (
              <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            ) : null}
          </>
        )}
      </Field>
    </FormControl>
  );
}

interface CheckboxFormFieldProps {
  fieldName: keyof UnsubmittedFormResponse;
  label: string;
  isRequired?: boolean;
  /** Additional helper text displayed below the text input. */
  hint?: React.ReactNode;
}

/**
 * A Formik field for boolean-type inputs that renders using Chakra's form components.
 * @see https://formik.org/docs/api/field#component
 */
function CheckboxFormField({
  fieldName,
  label,
  hint,
  isRequired = false,
}: CheckboxFormFieldProps) {
  return (
    <FormControl isRequired={isRequired}>
      <Field name={fieldName}>
        {({
          field,
          form,
        }: FieldProps<string | number, UnsubmittedFormResponse>) => (
          <>
            <Checkbox {...field} id={fieldName} size="lg">
              <FormLabel htmlFor={fieldName} paddingTop={2}>
                {label}
              </FormLabel>
            </Checkbox>
            {hint && <FormHelperText>{hint}</FormHelperText>}
            {form.errors[fieldName] != null && form.touched[fieldName] ? (
              <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            ) : null}
          </>
        )}
      </Field>
    </FormControl>
  );
}

/**
 * @see https://formik.org/docs/examples/dependent-fields
 */
function SharkWasReleasedCheckboxField(fieldProps: FieldConfig) {
  const {
    values: { was_caught: wasCaught },
    setFieldValue,
  } = useFormikContext<Pick<UnsubmittedFormResponse, "was_caught">>();
  const [field, meta] = useField(fieldProps);
  const fieldName = fieldProps.name;

  React.useEffect(() => {
    if (!wasCaught) {
      setFieldValue(fieldName, false, false);
    }
  }, [wasCaught, setFieldValue, fieldName]);

  if (!wasCaught) {
    return null;
  }

  return (
    <FormControl
      isRequired
      isDisabled={!wasCaught}
      isInvalid={meta.error && meta.touched}
    >
      <Checkbox {...field} size="lg" id={fieldName}>
        <FormLabel paddingTop={2} htmlFor={fieldName}>
          Was the shark was safely released after being caught?
        </FormLabel>
      </Checkbox>
    </FormControl>
  );
}
