// next api
import {NextApiRequest,NextApiResponse} from "next";

const handler = async (req:NextApiRequest,res:NextApiResponse) => {
    res.status(200).json({message: 'You are authenticated'})
}

export default handler