import {NextApiRequest, NextApiResponse} from 'next';
import client from "lib/mongodb";
import {IAdmin} from "types";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        await client.connect();
        const db = await client.db("diploma")

        const admin = await db.collection('admin')
            .findOne<IAdmin>({
                email: req.body.email,
            });

        if (!admin) {
            return res.status(401).json({error: "login.error.non_auth"});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, admin.passwordSalt);

        if (hashedPassword === admin.password) {
            const token = jwt.sign({userId: admin._id}, process.env.JWT_SECRET, {
                expiresIn: '1Y',
            });

            res.setHeader('Set-Cookie', `accessToken=${token}; path=/; httpOnly; max-age=${365 * 24 * 60 * 60}`)

            return res.json({})
        } else {
            return res.status(401).json({error: "login.error.non_auth"});
        }
    } catch (e: any) {
        console.log(e)
        res.status(500).json({error: e.message});
    }
}