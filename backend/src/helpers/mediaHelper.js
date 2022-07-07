import imageConversion from 'image-conversion';
import {PNG} from 'pngjs';
import * as fs from 'fs';
import {Blob} from 'node:buffer';
import b64toBlob from 'b64-to-blob';
import Jimp from "jimp";
import {Readable} from 'stream';

export const parseRichText =  async (text, id, db) => {
    // console.log(text);
    let num_im = 0
    while(text.indexOf('<img src="data:image') >=  0) {
        let im_start = text.indexOf('<img src="data:image') + 10;
        let im_end = text.indexOf('"', im_start);
        let im_data = text.substring(im_start,im_end);
        // let img = new Image();
        // img.src = im_data;
        let path = "";
        if (im_data.startsWith("data:image/jpeg")) {
            let im_dat = im_data.replace(/^data:image\/jpeg;base64,/, "");
            // console.log(im_dat);
            const buffer = Buffer.from(im_dat, "base64");
            path = "files/" + db + "/" + id + "/" + num_im +".jpeg"
            let image = await Jimp.read(buffer);
            if(image.getWidth() > 1000 || image.getHeight() > 1000) {
                image.scaleToFit(1000,1000);
            }
            if(image.getWidth() > 500 || image.getHeight() > 500) {
                image.quality(60);
            }
            image.write(path);
        }
        else if (im_data.startsWith("data:image/png")) {
            console.log("png")
            let im_dat = im_data.replace(/^data:image\/png;base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            let png = PNG.sync.read(buffer);
            let alpha = png.alpha;
            // console.log(alpha);
            let image = await Jimp.read(buffer);
            if(image.getWidth() > 1000 || image.getHeight() > 1000) {
                image.scaleToFit(1000,1000);
            }
            path = "files/" + db + "/" + id + "/" + num_im + ".png"
            if((image.getWidth() > 400 || image.getHeight() > 400) && !alpha) {
                // console.log("ooh no")
                path = "files/" + db + "/" + id + "/" + num_im + ".jpeg"
                image.quality(80);
            }
            if(image.getWidth() > 600 || image.getHeight() > 600) {
                image.quality(60);
            }
            image.write(path);
        }
        else {
            const end_form = im_data.indexOf(";")
            const format = im_data.substring(11,end_form);
            // console.log(format);
            const end_head = im_data.indexOf(",") + 1
            let im_dat = im_data.slice(end_head);
            // console.log(im_dat);
            path = "files/" + db + "/" + id + "/" + num_im + "." + format
            const dir = "files/" + db + "/" + id
            const buffer = Buffer.from(im_dat, "base64");
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(path, buffer);


        }
        text = text.replace(im_data, path)
        num_im++
    }
    return text
}

export const retrieveRichText =  async (text, db) => {
    while(text.indexOf('<img src="files/' + db) >=  0) {
        let im_start = text.indexOf('<img src="files/' + db) + 10;
        let im_end = text.indexOf('"', im_start);
        let im_data = text.substring(im_start, im_end);

        let ft = im_data.substring(im_data.lastIndexOf(".") + 1);
        // console.log(ft);
        let image = fs.readFileSync(im_data).toString('base64')
        const fullPath = "data:image/" + ft + ";base64," + image;
        text = text.replace(im_data, fullPath);
    }
    // console.log(text);
    return text;
}


