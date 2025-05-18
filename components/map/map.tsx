import {APIProvider, Map} from "@vis.gl/react-google-maps";

const settings = {
    // defaultZoom: 17,
    // defaultCenter: {lat: 49.288682, lng: -123.1144678},
    mapId: "71dc18a4565ae96c2089cc99",
    // gestureHandling: "greedy",
    // clickableIcons: false,
    // disableDefaultUI: true,
}

const MapComponent = () => {
    return (
        <div className="h-[600px] w-full">
            <APIProvider apiKey={"AIzaSyBrqM03mFA9phPmYZjAQHc1QxraW1-q9o4"} libraries={["marker"]}>
                <Map {...settings}>
                    {/*<Markers pois={locations} />*/}
                    {/*<Overlay data={overlayData} />*/}
                </Map>
            </APIProvider>
        </div>
    )
};

export {MapComponent};