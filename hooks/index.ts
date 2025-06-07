import {useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";

export const useIsMobile = (query?: string) => {
	const isMobile = useMediaQuery(query || "(width < 40rem)");

	return {isMobile};
};

export const useUserLocation = () => {
	const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>();
	const [accuracyCircleLocation, setAccuracyCircleLocation] = useState<number>(0);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				setUserLocation(userLocation)

				const errorRange = position.coords.accuracy;

				setAccuracyCircleLocation(errorRange)
			});
		} else {
			// code for legacy browsers TODO show error modal
		}
	}, []);

	return {
		userLocation,
		accuracyCircleLocation,
	}
}