export enum MarkerType {
    COMMON = "common",
}

export enum MarkerStatus {
    Open = "open",
    Hidden = "hidden",
}

export enum CategoryType {
    Historical = "Historical",
    Nature = "Nature",
    Museums = "Museums",
    Architecture = "Architecture",
    Culture = "Culture",
    Sports = "Sports",
    Gastronomy = "Gastronomy",
    Handicrafts = "Handicrafts",
    Family = "Family",
    Panorama = "Panorama"
}

export interface ILocation {
    id: string;
    title: string;
    coordinates: google.maps.LatLngLiteral;
    image: string;
    description: string;
    categories?: number[];
    status: MarkerStatus;
    type: MarkerType;
}

export interface ICategory {
    id: string;
    locations: string[];
    name: Record<string, string>;
    description: string;
    icon: string;
    type: CategoryType;
}