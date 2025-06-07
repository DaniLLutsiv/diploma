import {APIProvider, Map} from "@vis.gl/react-google-maps";
import styled from "@emotion/styled";
import React, {useState} from "react";
import {Markers} from "./markers";
import {ICategory, ILocation} from "types";
import {Filters} from "components/map/filters";
import {LocationModal} from "components/map/location_modal";
import {CurrentLocation} from "./current_location";

const Wrapper = styled.div`
    width: 100%;
    height: calc(90vh - 68px);
`;

const settings = {
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
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
    const selectedLocation = locations.find((location) => location.id === selectedLocationId);

    const closeModal = () => {
        setSelectedLocationId(null);
    }

    return (
        <Wrapper>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string} libraries={["marker"]}>
                <Map {...settings}>
                    <Markers locations={locations} onOpenModal={setSelectedLocationId} selectedLocationId={selectedLocationId}/>
                    <Filters categories={categories} />
                    <LocationModal location={selectedLocation} onClose={closeModal} />
                    <CurrentLocation />
                </Map>
            </APIProvider>
        </Wrapper>
    )
};

export {MapComponent};