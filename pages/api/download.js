import axios from 'axios';
import sharp from "sharp";

export default async function handler (req, res) {
    const url = req.body.url;
    const type = req.body.url;

    const response = await axios.get(url, {responseType: "arraybuffer"})
    const base64 = Buffer.from(response.data, "binary").toString("base64");

    if(type == 'png') {
        const png = await sharp(Buffer.from(base64, "base64")).png().toBuffer();
        const pngBase64 = Buffer.from(png, "binary").toString("base64");
        res.status(200).json( { result: `data:image/png;base64,${pngBase64}`});
    } else if (type == 'jpg'){
        const jpg = await sharp(Buffer.from(base64, "base64")).jpg().toBuffer();
        const jpgBase64 = Buffer.from(jpg, "binary").toString("base64");
        res.status(200).json( { result: `data:image/jpg;base64,${jpgBase64}`});
    } else if (type == 'avi'){
        const avif = await sharp(Buffer.from(base64, "base64")).avif().toBuffer();
        const avifBase64 = Buffer.from(avif, "binary").toString("base64");
        res.status(200).json( { result: `data:image/avif;base64,${avifBase64}`});
    } else {
        const webp = await sharp(Buffer.from(base64, "base64")).webp().toBuffer();
        const webpBase64 = Buffer.from(webp, "binary").toString("base64");
        res.status(200).json( { result: `data:image/webp;base64,${webpBase64}`}); 
    }
}