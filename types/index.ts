export enum Language {
    EN = "en",
    UA = "ua",
}

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
    Common = "Common",
}

export interface ILocation {
    id: string;
    title: Record<string, string>;
    coordinates: google.maps.LatLngLiteral;
    images: string[];
    description: Record<string, string>;
    categories?: CategoryType[];
    status: MarkerStatus;
    type: CategoryType;
}

export interface ICategory {
    id: string;
    locations: string[];
    name: Record<string, string>;
    description: string;
    icon: string;
    type: CategoryType;
}

export interface IAdmin {
    _id: string;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
}