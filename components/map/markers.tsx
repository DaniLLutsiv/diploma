import React, {Fragment, useCallback, useEffect, useRef, useState} from "react";
// import {MapMarker} from "views/components/map_marker/map_marker.component";
import {Marker, MarkerClusterer} from "@googlemaps/markerclusterer";
import {useMap} from "@vis.gl/react-google-maps";
import {ILocation, MarkerStatus} from "types";
import {MapMarker} from "components/map/map_marker";

interface IMarkers {
	pois: ILocation[];
}

export const Markers: React.FC<IMarkers> = ({pois}) => {
	const map = useMap();
	const [hoverId, setHoverId] = useState<string | null>(null);
	const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
	const clusterer = useRef<MarkerClusterer | null>(null);

	const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
	const onMouseLeave = useCallback(() => setHoverId(null), []);

	// Initialize MarkerClusterer, if the map has changed
	useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({
				map,
				onClusterClick: (event) => {
					map.set("zoom", map.get("zoom") + 3);
					if (event.latLng) {
						map.panTo(event.latLng);
					}
				},
				algorithmOptions: {maxZoom: 90},
			});
		}
	}, [map]);

	// Update markers, if the markers array has changed
	useEffect(() => {
		clusterer.current?.clearMarkers();

		clusterer.current?.addMarkers(Object.values(markers));

		return () => {
			clusterer.current?.clearMarkers();
		};
	}, [markers]);

	const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
		setMarkers((markers) => {
			if ((marker && markers[key]) || (!marker && !markers[key])) return markers;

			if (marker) {
				return {...markers, [key]: marker};
			} else {
				const {[key]: _, ...newMarkers} = markers;

				return newMarkers;
			}
		});
	}, []);

	return (
		<Fragment>
			{pois.map((poi, index) => {
				const zIndex = hoverId === poi.id ? pois.length + 1 : index + 1;

				if (poi.status === MarkerStatus.Hidden) {
					return null;
				}

				return (
					<MapMarker
						key={poi.id}
						poi={poi}
						zIndex={zIndex}
						hoverId={hoverId}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						setMarkerRef={setMarkerRef}
					/>
				);
			})}
		</Fragment>
	);
};
