import client from "lib/mongodb";
import {NextApiRequest, NextApiResponse} from 'next';
import formidable from 'formidable';
import {ObjectId} from "mongodb";
import {first, get} from "lodash";
import {CategoryType, MarkerStatus} from "types";
import path from 'path'
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const form = formidable({});

        const [fields, files] = await new Promise<[formidable.Fields<string>, formidable.Files<string>]>((res, rej) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    rej(err)
                    return;
                }
                res([fields, files])
            })
        });

        const title = first(fields.title);
        const description = first(fields.description)
        const locationCategories = first(fields.categories); //
        const type = first(JSON.parse(locationCategories || "[]")) || CategoryType.Common;
        const coordinates = first(fields.coordinates)
        const oldImages = JSON.parse(first(fields.images) || "[]")
        const fileNames = get(files, "files", []).map(({originalFilename}) => originalFilename)

        await client.connect();
        const db = await client.db("diploma")

        const categoriesObjectIds = await db.collection('category').find().toArray()
            .then((categories) => categories
                .filter(category => locationCategories?.includes(category.type))
                .map(({_id}) => _id)
            );

        const location: Record<string, any> = {
            _id: first(fields.id) ? new ObjectId(first(fields.id)) : undefined,
            title,
            description,
            categories: categoriesObjectIds,
            coordinates,
            type,
            status: MarkerStatus.Open,
            // image
        }

        // update location
        if (location._id) {
            const image = JSON.stringify([...oldImages, ...fileNames.map((file) => `/images/zaporizhzhia/${String(location._id)}/${file}`)])

            await db.collection('location')
                .updateOne(
                    {
                        _id: location._id
                    },
                    {
                        $set: {...location, image}
                    });
        } else {
            // create location
            const result = await db.collection('location')
                .insertOne({
                    ...location,
                    image: "[]",
                });

            location._id = result.insertedId

            const image = JSON.stringify([...oldImages, ...fileNames.map((file) => `/images/zaporizhzhia/${String(location._id)}/${file}`)])

            await db.collection('location')
                .updateOne(
                    {
                        _id: location._id
                    },
                    {
                        $set: {image}
                    });
        }

        await db.collection('category').updateMany(
            {_id: {$in: categoriesObjectIds}},
            // @ts-ignore
            {$addToSet: {locations: location._id}}
        );

        // 2. Прибираємо локацію з решти категорій
        await db.collection('category').updateMany(
            {_id: {$nin: categoriesObjectIds}},
            // @ts-ignore
            {$pull: {locations: location._id}}
        );

        updateFiles(files, String(location._id))

        return res.json({id: location._id})
    } catch (e: any) {
        console.log(e)
        res.status(500).json({error: e.message});
    }
}

const updateFiles = (files: formidable.Files<string>, locationId: string) => {
    if (process.env.NEXT_DEV_MODE) {
        if (files?.files?.length) {
            let directoryPath = path.join(process.cwd(), "public", "images", "zaporizhzhia", locationId);
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, {recursive: true});
            }

            files?.files.forEach((file) => {
                if (!file.originalFilename) return;

                let rawData = fs.readFileSync(file.filepath)
                const filePath = path.join(directoryPath, file.originalFilename);

                fs.writeFileSync(filePath, rawData)
            })
        }
    }
}