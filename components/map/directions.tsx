import React, {useEffect, useState} from "react";
import {DirectionsRenderer} from "@react-google-maps/api";
import {useMap} from "@vis.gl/react-google-maps";
import {useUserLocation} from "hooks";

interface IDirections {
    destination?: google.maps.LatLngLiteral;
}

export const Directions: React.FC<IDirections> = ({destination}) => {
    const map = useMap();
    const {userLocation} = useUserLocation()
    const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);

    useEffect(() => {
        if (!destination || !userLocation) return;
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: userLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );

    }, [destination, userLocation, setDirections, map]);

    return (
        <DirectionsRenderer
            directions={directions}
            options={{
                suppressMarkers: true
            }}
            // @ts-ignore
            map={directions ? map : null}
        />
    )
}