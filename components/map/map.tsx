import {APIProvider, Map} from "@vis.gl/react-google-maps";
import {Markers} from "./markers";
import {ICategory, ILocation} from "types";
import React from "react";
import {MapProps} from "@vis.gl/react-google-maps/src/components/map";
import styled from "@emotion/styled";
import {Filters} from "./filters";

const Wrapper = styled.div`
    width: 100%;
    height: calc(90vh - 68px);
`;

const settings: MapProps = {
    defaultZoom: 12,
    defaultCenter: {lat: 47.8290584, lng: 35.1549364},
    mapId: "71dc18a4565ae96c64de2f92",
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}

interface IMapComponent {
    locations: ILocation[];
    categories: ICategory[];
}

const MapComponent: React.FC<IMapComponent> = ({locations, categories}) => {
    return (
        <Wrapper>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string} libraries={["marker"]}>
                <Map {...settings}>
                    <Markers pois={locations} />
                    <Filters categories={categories} />
                </Map>
            </APIProvider>
        </Wrapper>
    )
};

export {MapComponent};