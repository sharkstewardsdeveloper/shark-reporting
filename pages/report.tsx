import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Spinner,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Field,
  FieldConfig,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  useField,
  useFormikContext,
} from "formik";
import { useSessionUser } from "../session/useSessionUser";
import { DateTime } from "luxon";
import { DatePicker } from "../components/DatePicker";
import {
  SharkType,
  UnsubmittedFormResponse,
  reportFormSchema,
} from "../model/form_submission";
import { PostReportResponse } from "./api/postReport";
import {
  fetchCurrentLocation,
  getPlaceLocation,
  useIsGeolocationApiAvailable,
  useLocationAutocomplete,
} from "../utils/geolocationApi";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import {
  Status as GoogleMapsLoadStatus,
  Wrapper as GoogleMapsLoader,
} from "@googlemaps/react-wrapper";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { SearchIcon } from "@chakra-ui/icons";
import { useBeforeUnload } from "react-use";
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

function useInitialFormValues(
  storageFolder: UnsubmittedFormResponse["storage_folder"]
): UnsubmittedFormResponse {
  const email = useSessionUser().session?.user.email;
  return {
    sighting_time: DateTime.now().toISO(),
    shark_type: SharkType.other,
    was_caught: false,
    was_released: false,
    email,
    should_subscribe: false,
    confirmed_get_app_updates: false,
    storage_folder: storageFolder,
  };
}

export default function Report() {
  const [currentStep, setCurrentStep] = useState(FormStep.SightingDetails);
  const { session } = useSessionUser();
  const [storageFolder, setStorageFolder] = useState(uuidv4());
  const defaultFormFormValues = useInitialFormValues(storageFolder);
  const [isPhotoLoading, setPhotoLoading] = useState(false);
  const submitForm = useSubmitSharkSightingForm();
  const toast = useToast();
  const [uploadedPhotoKeys, setUpLoadedPhotoKeys] = useState([]);

  const [isFormDirty, toggleDirtyForm] = useState(false);
  const checkDirty = useCallback(() => {
    return isFormDirty;
  }, [isFormDirty]);

  useBeforeUnload(checkDirty, "You have unsaved changes, are you sure?");

  useEffect(() => {
    console.log(uploadedPhotoKeys);
  }, [uploadedPhotoKeys]);

  const deleteUploadedPhotos = useCallback(async () => {
    for (let i = 0; i < uploadedPhotoKeys.length; i++) {
      const { data, error } = await supabase.storage
        .from("user-report-images")
        .remove(uploadedPhotoKeys[i]);
      console.log(data, error);
    }
  }, [uploadedPhotoKeys]);

  useEffect(() => {
    if (checkDirty) {
      deleteUploadedPhotos();
    }
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) {
      toast({
        title: "Check to make sure the file(s) exist.",
        description: "Cannot find file",
        status: "error",
        isClosable: true,
      });
      e.target.value = null;
      setStorageFolder(null);
      return;
    }
    if (fileList.length > 4) {
      toast({
        title: "You can only upload 4 images per report",
        description: "Too many images",
        status: "error",
        isClosable: true,
      });
      e.target.value = null;
      setStorageFolder(null);
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList);
      if (!fileList[i]) {
        toast({
          title: "Check to make sure the file(s) exist.",
          description: "Cannot find file",
          status: "error",
          isClosable: true,
        });
        e.target.value = null;
        setStorageFolder(null);
        return;
      }
      // 5242880 = 5mb
      if (fileList[i].size > 5242880) {
        toast({
          title: `${fileList[i].name} size too large`,
          description: "5MB is the max size limit for images",
          status: "error",
          isClosable: true,
        });
        e.target.value = null;
        setStorageFolder(null);
        return;
      }

      try {
        setPhotoLoading(true);
        const { data, error } = await supabase.storage
          .from("user-report-images")
          .upload(`./${storageFolder}/${fileList[i].name}`, fileList[i], {
            upsert: false,
          });
        if (data) {
          console.log(data);
          let photoKey = data.Key.replace("user-report-images/", "");
          setUpLoadedPhotoKeys([...uploadedPhotoKeys, photoKey]);
        }
      } catch (error: unknown) {
        console.log(error);
        toast({
          title: `Something went wrong with your upload.`,
          description: `${error}`,
          status: "error",
          isClosable: true,
        });
        e.target.value = null;
        setPhotoLoading(false);
        setStorageFolder(null);
        return;
      } finally {
        toggleDirtyForm(true);
        setPhotoLoading(false);
        // testing trying to delete uploaded photos without user navigating off page
        const { data, error } = await supabase.storage
          .from("user-report-images")
          .remove(uploadedPhotoKeys[i]);
        console.log(data, error);
      }
    }
  };

  return (
    <Container>
      <Head>
        <title>Report a Shark Sighting · Shark Stewards</title>
      </Head>
      <VStack marginBottom="8">
        <Alert status="info" colorScheme="gray" variant="left-accent">
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
                  <LocationField />

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

                  <Box>
                    <FormControl mb={5}>
                      <FormLabel>Do you have pictures of the sharks?</FormLabel>
                      <Input
                        multiple
                        mb={2}
                        pt={1}
                        type="file"
                        onChange={onFileChange}
                        accept="image/*"
                      />
                      {isPhotoLoading && <p>Loading...</p>}
                      <FormHelperText>
                        Any images you can provide will improve our research 🔬
                        We accept up to 4 images under 5MB each.
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  <StringFormField
                    fieldName="description"
                    label="Is there other information you'd like provide?"
                    placeholder="Details..."
                    hint="Helpful details: How many sharks were there? Were they harmed by other people?"
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
                  isDisabled={!props.dirty || !props.isValid}
                  isLoading={props.isSubmitting || props.isValidating}
                  type={"submit"}
                >
                  Submit
                </Button>
              )}
              {session == null && currentStep === FormStep.AuthorInfo && (
                <Button
                  mb={2}
                  width="100%"
                  variant="ghost"
                  isDisabled={props.isSubmitting || props.isValidating}
                  onClick={() => {
                    setCurrentStep(FormStep.SightingDetails);
                  }}
                >
                  Previous
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </VStack>
    </Container>
  );
}

function useSubmitSharkSightingForm() {
  const toast = useToast();
  const router = useRouter();
  const { session } = useSessionUser();

  async function submitForm<FormValuesType>(
    values: FormValuesType,
    actions: FormikHelpers<FormValuesType>
  ) {
    try {
      const data = await fetch("/api/postReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session == null ? {} : { Authorization: session.access_token }),
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

  return submitForm;
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
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  inputType?: "short_answer" | "email" | "long_answer";
  /** Additional helper text displayed below the text input. */
  hint?: React.ReactNode;
}

/**
 * A Formik field for string-type inputs that renders using Chakra's form components.
 * @see https://formik.org/docs/api/field#component
 *
 * You can specify an `inputType` in this component's props to create a default text input. Provide
 * children instead if you'd like to render custom inputs (i.e. Autocompletes or other inputs with
 * accessories).
 */
function StringFormField({
  fieldName,
  label,
  placeholder,
  hint,
  inputType = "short_answer",
  isRequired = false,
  isDisabled,
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
            {children == null ? (
              <TextInputComponent
                {...field}
                id={fieldName}
                placeholder={placeholder}
                isDisabled={isDisabled}
                type={
                  inputType !== "short_answer" && inputType !== "long_answer"
                    ? inputType
                    : undefined
                }
              />
            ) : (
              <InputGroup>{children}</InputGroup>
            )}
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
          Was the shark safely released after being caught?
        </FormLabel>
      </Checkbox>
    </FormControl>
  );
}

function LocationField() {
  const renderNonSuccessfulStatuses = (status: GoogleMapsLoadStatus) => {
    if (status === GoogleMapsLoadStatus.LOADING) {
      return <Spinner />;
    } else if (status === GoogleMapsLoadStatus.FAILURE) {
      return <ManualLocationField isSearchEnabled={false} />;
    } else {
      return null;
    }
  };

  return (
    <GoogleMapsLoader
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      render={renderNonSuccessfulStatuses}
      libraries={["places"]}
    >
      <AutocompleteLocationField />
    </GoogleMapsLoader>
  );
}

function AutocompleteLocationField() {
  const formContext = useFormikContext<UnsubmittedFormResponse>();
  const {
    isLoading: isLoadingSuggestions,
    search,
    results,
  } = useLocationAutocomplete();
  const placesService = React.useMemo(
    () => new google.maps.places.PlacesService(document.createElement("div")),
    []
  );

  function handleSelect(placeId: string) {
    const selectedPrediction = results.find(
      (result) => result.place_id === placeId
    );
    if (selectedPrediction != null) {
      formContext.setFieldValue(
        "location_name",
        selectedPrediction.description
      );
      getPlaceLocation(placesService, placeId)
        .then((location) => {
          if (location != null) {
            formContext.setFieldValue(
              "location_lat",
              String(location.lat()),
              true
            );
            formContext.setFieldValue(
              "location_long",
              String(location.lng()),
              true
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <AutoComplete
      openOnFocus
      freeSolo
      onChange={handleSelect}
      filter={() => true}
    >
      <ManualLocationField
        isSearchEnabled={true}
        isLoading={isLoadingSuggestions}
        onChange={(e) => {
          const value = e.target.value;
          const selectedPrediction = results.find(
            (result) => result.place_id === value
          );
          if (selectedPrediction == null) {
            formContext.setFieldValue("location_name", value);
            search(value);
          }
        }}
      />
      <AutoCompleteList>
        {results.map((suggestion) => (
          <AutoCompleteItem
            key={`place-${suggestion.place_id}`}
            value={suggestion.place_id}
          >
            {suggestion.description}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
const locationNameFieldKey = "location_name";

function ManualLocationField({
  isSearchEnabled,
  onChange,
  isLoading,
}: {
  isSearchEnabled: boolean;
  onChange?: InputProps["onChange"];
  isLoading?: boolean;
}) {
  const formContext = useFormikContext<UnsubmittedFormResponse>();
  const isLocationApiAvailable = useIsGeolocationApiAvailable();
  const {
    isUsingCurrentLocation,
    isFetchingCurrentLocation,
    locationFetchErrorType,
    handleSelectCurrentLocation,
    handleClearCurrentLocation,
  } = useSelectCurrentLocation(locationNameFieldKey);

  let hint: React.ReactNode;
  if (isUsingCurrentLocation) {
    hint = null;
  } else {
    const prompt = isSearchEnabled
      ? "Search for a location by typing above"
      : "Enter the sighting location";
    hint = (
      <>
        {prompt}
        {isLocationApiAvailable &&
          (locationFetchErrorType === "permission_denied" ? (
            "."
          ) : (
            <>
              {" "}
              or choose <strong>My Location.</strong>
            </>
          ))}
      </>
    );
  }

  return (
    <StringFormField
      fieldName={locationNameFieldKey}
      isRequired
      label="Where did you see the shark(s)?"
      hint={hint}
    >
      {isSearchEnabled && (
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      )}
      <AutoCompleteInput
        placeholder={`Pier 39`}
        isDisabled={isUsingCurrentLocation}
        onChange={
          onChange ??
          ((e) =>
            formContext.setFieldValue(locationNameFieldKey, e.target.value))
        }
        wrapStyles={{ flexGrow: 1 }}
        value={formContext.values.location_name}
      />

      {isLoading && (
        <InputRightElement>
          <Spinner />
        </InputRightElement>
      )}
      {isLocationApiAvailable &&
        (isUsingCurrentLocation ? (
          <Button
            variant="ghost"
            size="sm"
            padding="5"
            onClick={handleClearCurrentLocation}
          >
            Clear
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            padding="5"
            isLoading={isFetchingCurrentLocation}
            isDisabled={locationFetchErrorType === "permission_denied"}
            onClick={handleSelectCurrentLocation}
          >
            📍 My Location
          </Button>
        ))}
    </StringFormField>
  );
}

function useSelectCurrentLocation(
  locationNameFieldKey: Extract<keyof UnsubmittedFormResponse, "location_name">
) {
  const formContext = useFormikContext<UnsubmittedFormResponse>();
  const toast = useToast();

  const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] =
    useState(false);
  const [locationFetchErrorType, setLocationFetchErrorType] = useState<
    "permission_denied" | "unable_to_resolve"
  >();
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

  const handleSelectCurrentLocation = React.useCallback(async () => {
    setIsFetchingCurrentLocation(true);

    try {
      const { coords } = await fetchCurrentLocation(true);
      formContext.setFieldValue(
        locationNameFieldKey,
        "📍 Current Location",
        true
      );
      formContext.setFieldValue("location_lat", String(coords.latitude), true);
      formContext.setFieldValue(
        "location_long",
        String(coords.longitude),
        true
      );
      setIsUsingCurrentLocation(true);
    } catch (e: unknown) {
      const error = e as GeolocationPositionError;
      if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
        setLocationFetchErrorType("permission_denied");
        toast({
          status: "error",
          title: "Access to your location has been blocked",
          description:
            "Enable location permissions and refresh the page to use your current location. You can also search for a location instead.",
        });
      } else {
        setLocationFetchErrorType("unable_to_resolve");
        toast({
          status: "error",
          title: "Your location could not be determined",
          description: "Please try again or search for a location instead.",
        });
      }
    } finally {
      setIsFetchingCurrentLocation(false);
    }
  }, [
    locationNameFieldKey,
    formContext,
    toast,
    setIsFetchingCurrentLocation,
    setLocationFetchErrorType,
    setIsUsingCurrentLocation,
  ]);

  const handleClearCurrentLocation = () => {
    setIsUsingCurrentLocation(false);
    formContext.setFieldValue(locationNameFieldKey, "", true);
    formContext.setFieldValue("location_lat", undefined, false);
    formContext.setFieldValue("location_long", undefined, false);
  };

  return {
    isUsingCurrentLocation,
    isFetchingCurrentLocation,
    locationFetchErrorType,
    handleSelectCurrentLocation,
    handleClearCurrentLocation,
  };
}
