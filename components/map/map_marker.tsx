import React, {useCallback} from "react";
import {AdvancedMarker, useMap} from "@vis.gl/react-google-maps";
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {Marker} from "@googlemaps/markerclusterer";
import {useTranslation} from "next-i18next";
import {ILocation} from "types";
import {poiCommon, poiIcons} from "constants";
import {useIsMobile} from "hooks";

const CustomMarker = styled(Box)<{ color?: string }>`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    padding: 5px;
    position: relative;
    color: #0d0d0d;
    transition: all .2s ease-in-out;

    &:hover {
        z-index: 9999;
    }
`;

interface IProps {
    location: ILocation;
    zIndex: number;
    hoverId: string | null;
    onMouseEnter: (id: string | null) => void;
    onMouseLeave: () => void;
    setMarkerRef: (marker: Marker | null, key: string) => void;
    onOpenModal?: (id: string) => void;
}

export const MapMarker: React.FC<IProps> =
    ({location, zIndex, hoverId, onMouseEnter, onMouseLeave, setMarkerRef, onOpenModal}) => {
        const {i18n} = useTranslation();
        const map = useMap();
        const {isMobile} = useIsMobile()
        const {id, coordinates} = location;
        const title = location.title[i18n.language];
        const poiImage = poiIcons[location.type] || poiCommon;

        const handleClick = useCallback(
            (ev: google.maps.MapMouseEvent, id: string) => {
                if (!map) return;
                if (!ev.latLng) return;

                const bounds = map.getBounds();
                if (!bounds) return;

                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                const latRange = ne.lat() - sw.lat();

                const newCenter = {
                    lat: isMobile ? ev.latLng.lat() - latRange * 0.25 : ev.latLng.lat(),
                    lng: ev.latLng.lng(),
                };

                map.panTo(newCenter);

                setTimeout(() => {
                    onOpenModal?.(id);
                }, 500);
            },
            [map, onOpenModal, isMobile]
        );

        const ref = useCallback(
            (marker: google.maps.marker.AdvancedMarkerElement) => {
                setMarkerRef(marker, id);
            },
            [setMarkerRef, id]
        );

        return (
            <AdvancedMarker
                key={id}
                position={coordinates}
                zIndex={zIndex}
                className="custom-marker"
                onClick={(ev) => handleClick(ev, id)}
                onMouseEnter={() => onMouseEnter(id)}
                onMouseLeave={onMouseLeave}
                ref={ref}
                style={{
                    transform: `scale(${[hoverId].includes(id) ? 1.3 : 1})`,
                }}
                title={title}>
                <CustomMarker>
                    {poiImage && <img src={poiImage} width={26} height={26} alt={title}/>}
                </CustomMarker>
            </AdvancedMarker>
        );
    };
