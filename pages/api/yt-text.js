import { YtToText } from "../../lib/yt-to-text"

export default async function handler(req, res) {

    try {

        if (req.method === 'POST') {            
            const body = req.body;
            const yt = await YtToText( body.link );
            await res.status(200).json( yt )
        } else {
        }    
    } catch (error) {
        throw error;
    }
    
}