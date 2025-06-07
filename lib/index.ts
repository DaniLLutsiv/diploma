import {Document, WithId} from "mongodb";
import {CategoryType, ILocation} from "types";

export const fixJson = <T = any>(data: T) => JSON.parse(JSON.stringify(data));

export const formatLocation = (location: Document) => ({
    ...location,
    id: location._id,
    coordinates: JSON.parse(location.coordinates),
    title: JSON.parse(location.title),
    description: JSON.parse(location.description),
    images: JSON.parse(location.image),
    categories: location.categories.map(({type}: {type: CategoryType}) => type),
}) as unknown as ILocation

export const formatLocations = (data: Document[]) => {
    return fixJson(data.map(formatLocation))
}

export const formatCategories = (data: WithId<Document>[]) => {
    return fixJson(data.map((category) => ({
        ...category,
        id: category._id,
        name: JSON.parse(category.name)
    })))
}