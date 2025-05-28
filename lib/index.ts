import {Document, WithId} from "mongodb";

export const fixJson = <T = any>(data: T) => JSON.parse(JSON.stringify(data));

export const formatLocations = (data: WithId<Document>[]) => {
    return fixJson(data.map((location) => ({
        ...location,
        id: location._id,
        coordinates: JSON.parse(location.coordinates)
    })))
}

export const formatCategories = (data: WithId<Document>[]) => {
    return fixJson(data.map((category) => ({
        ...category,
        id: category._id,
        name: JSON.parse(category.name)
    })))
}