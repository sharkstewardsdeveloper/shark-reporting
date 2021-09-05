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
