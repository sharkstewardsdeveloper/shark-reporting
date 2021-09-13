import { debounce } from "lodash";
import React from "react";

export async function fetchCurrentLocation(
  enableHighAccuracy: boolean
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy,
    });
  });
}

export function useIsGeolocationApiAvailable(): boolean {
  const [isLocationApiAvailable, setIsLocationApiAvailable] =
    React.useState(false);

  // Once the document is loaded and the component is mounted, check
  // if the Geolocation API is available.
  React.useEffect(() => {
    if (navigator?.geolocation != null) {
      setIsLocationApiAvailable(true);
    }
  }, []);

  return isLocationApiAvailable;
}

// ------------ Google Maps API -------------

const DEFAULT_PLACES_REQUEST_OPTIONS = () => ({
  location: new google.maps.LatLng(37.653534, -122.170185),
});

async function getPlacePredictions(
  autocompleteService: google.maps.places.AutocompleteService,
  query: string
): Promise<google.maps.places.AutocompletePrediction[]> {
  return new Promise((resolve, reject) => {
    autocompleteService.getPlacePredictions(
      {
        // ...DEFAULT_PLACES_REQUEST_OPTIONS(),
        input: query,
      },
      (result, status) => {
        switch (status) {
          case google.maps.places.PlacesServiceStatus.OK:
          case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
            resolve(result ?? []);
            break;
          default:
            reject(
              new Error(
                `Google Places Search rejected request with status: ${status}`
              )
            );
            break;
        }
      }
    );
  });
}

export async function getPlaceLocation(
  placesService: google.maps.places.PlacesService,
  placeId: string
): Promise<google.maps.LatLng | undefined> {
  return new Promise((resolve, reject) => {
    placesService.getDetails(
      {
        placeId,
        fields: ["geometry.location"],
      },
      (result, status) => {
        switch (status) {
          case google.maps.places.PlacesServiceStatus.OK:
            resolve(result.geometry?.location);
            break;
          default:
            reject(
              `Google Places Details Search rejected request with status: ${status}`
            );
            break;
        }
      }
    );
  });
}

export function useLocationAutocomplete() {
  const autocompleteService = React.useRef(
    new window.google.maps.places.AutocompleteService()
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const search = React.useMemo(
    () =>
      debounce(async (query: string) => {
        if (query == null || query.trim() === "") {
          setIsLoading(false);
          setResults([]);
          return;
        }

        setIsLoading(true);
        try {
          const predictions = await getPlacePredictions(
            autocompleteService.current,
            query
          );
          setResults(predictions);
        } catch (error) {
          console.error(error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    [autocompleteService]
  );

  return {
    isLoading,
    search,
    results,
  };
}
