import {APIProvider, Map} from "@vis.gl/react-google-maps";
import styled from "@emotion/styled";
import React from "react";
import {Markers} from "components/map/markers";
import {ILocation} from "types";
import {CurrentLocation} from "../map/current_location";
import {Directions} from "../map/directions";

const Wrapper = styled.div`
    width: 100%;
    height: max(300px, 30vh);
`;

const settings = {
    defaultZoom: 13,
    mapId: "71dc18a4565ae96c64de2f92",
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}

interface IMapComponent {
    location: ILocation;
    showDirection: boolean;
}

const LocationMap: React.FC<IMapComponent> = ({location, showDirection}) => {
    return (
        <Wrapper>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string} libraries={["marker"]}>
                <Map {...settings} defaultCenter={location.coordinates}>
                    <Markers locations={[location]} selectedLocationId={location.id}/>
                    <CurrentLocation/>
                    {showDirection && (
                        <Directions destination={location.coordinates}/>
                    )}
                </Map>
            </APIProvider>
        </Wrapper>
    )
};

export {LocationMap};