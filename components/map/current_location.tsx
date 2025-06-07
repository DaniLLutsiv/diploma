import React, {Fragment} from "react";
import {Marker, useMap,} from "@vis.gl/react-google-maps";
import {Circle} from "@react-google-maps/api";
import {useUserLocation} from "hooks";

const blueDot = {
    fillColor: "#4285F4",
    fillOpacity: 1,
    path: 0,
    scale: 8,
    strokeColor: "rgb(255,255,255)",
    strokeWeight: 2,
};

const accuracyCircle = {
    fillColor: "#61a0bf",
    fillOpacity: 0.4,
    strokeColor: "#1bb6ff",
    strokeOpacity: 0.4,
    strokeWeight: 1,
}

export const CurrentLocation = () => {
    const map = useMap();
    const {userLocation, accuracyCircleLocation} = useUserLocation()

    if (!userLocation) {
        return null;
    }

    return (
        <Fragment>
            <Marker
                icon={blueDot}
                position={userLocation}
            />
            <Circle
                center={userLocation}
                radius={accuracyCircleLocation}
                options={accuracyCircle}
                // @ts-ignore
                map={map}
            />
        </Fragment>
    )
}