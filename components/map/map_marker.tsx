import React, {useCallback} from "react";
import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {Marker} from "@googlemaps/markerclusterer";
import {ILocation} from "types";

const CustomMarker = styled(Box)<{color?: string}>`
	background: #fff;
	border-radius: 4px;
	border: 2px solid ${({color}) => (color ? color : "#FFF")};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3px;
	padding: 5px;
	width: 100px;
	position: relative;
	color: #0d0d0d;

	&:hover {
		z-index: 9999;
	}

	p {
		color: #0d0d0d;
		text-align: center;
		font-family: var(--fontFamilySecond);
		font-size: 10px;
		font-style: normal;
		font-weight: 800;
		line-height: 110%; /* 11px */
		text-transform: uppercase;
	}

	&:after {
		display: block;
		content: "";
		width: 10px;
		height: 10px;
		border: 2px solid ${({color}) => (color ? color : "#FFF")};
		border-top: none;
		border-left: none;
		background: #fff;
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}
`;

interface IProps {
	poi: ILocation;
	zIndex: number;
	hoverId: string | null;
	onMouseEnter: (id: string | null) => void;
	onMouseLeave: () => void;
	setMarkerRef: (marker: Marker | null, key: string) => void;
}

export const MapMarker: React.FC<IProps> =
	({poi, zIndex, hoverId, onMouseEnter, onMouseLeave, setMarkerRef}) => {
		const map = useMap();
		// const {onOpenModal} = useViewController<IMapMarkerController>(
		// 	Bindings.MapMarkerController,
		// 	{
		// 		poi: poi,
		// 	}
		// );

		const {id, coordinates, type, image, title} = poi;
		// const isEventPoint = eq(type, MarkerType.EVENT);

		const handleClick = useCallback(
			(ev: google.maps.MapMouseEvent, id: string) => {
				if (!map) return;
				if (!ev.latLng) return;

				map.panTo(ev.latLng);

				setTimeout(() => {
					// onOpenModal();
				}, 500);
			},
			[map]
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
					transform: `scale(${[hoverId].includes(id) ? 1.4 : 1})`,
				}}
				title={title}>
				{/*{isEventPoint ? (*/}
				{/*	<CustomMarker color={color}>*/}
				{/*		{image && <img src={image} width={32} height={32} alt={title} />}*/}
				{/*		<p>{title}</p>*/}
				{/*	</CustomMarker>*/}
				{/*) : (*/}
					<Pin glyphColor={"#fff"} borderColor={"#000"}>
						{image && <img src={image} width={26} height={26} alt={title} />}
					</Pin>
				{/*)}*/}
			</AdvancedMarker>
		);
	};
