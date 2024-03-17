import { PNG } from "pngjs";
import * as fs from "fs";
import Jimp from "jimp";
import { pdfToPng } from "pdf-to-png-converter";
import sharp from "sharp";

export const parseRichText = async (text, id, db) => {
    // console.log(text);
    let num_im = 0;
    const dir = "files/" + db + "/" + id;
    while (text.indexOf('<img src="data:image') >= 0) {
        let im_start = text.indexOf('<img src="data:image') + 10;
        let im_end = text.indexOf('"', im_start);
        let im_data = text.substring(im_start, im_end);
        // let img = new Image();
        // img.src = im_data;
        let path = "";
        sharp.cache(false);

        if (
            im_data.startsWith("data:image/jpeg") ||
            im_data.startsWith("data:image/png") ||
            im_data.startsWith("data:image/tiff") ||
            im_data.startsWith("data:image/webp") ||
            im_data.startsWith("data:image/gif")
        ) {
            let im_dat = im_data.replace(/^data:image\/(png|jpeg|webp|gif|tiff);base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            const image = await sharp(buffer, { animated: true });
            const md = await image.metadata();
            if (md.width > 1000 || md.height > 1000) {
                await image.resize(1000, 1000, { fit: "inside" });
            }
            if (md.pages > 10) {
                await image.webp({ quality: 30 });
            } else if (md.width > 400 || md.height > 400) {
                await image.webp({ quality: 60 });
            } else {
                await image.webp({ lossless: true });
            }
            path = dir + "/" + num_im + ".webp";
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            const ob = await image.toBuffer();
            fs.writeFileSync(path, ob);
        } else {
            const end_form = im_data.indexOf(";");
            const format = im_data.substring(11, end_form);
            // console.log(format);
            const end_head = im_data.indexOf(",") + 1;
            let im_dat = im_data.slice(end_head);
            // console.log(im_dat);
            path = dir + "/" + num_im + "." + format;
            const buffer = Buffer.from(im_dat, "base64");
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(path, buffer);
        }
        text = text.replace(im_data, path);
        num_im++;
    }
    if (fs.existsSync(dir)) {
        const filesInFolder = fs.readdirSync(dir);
        const filesToDelete = filesInFolder.filter(
            (file) => Number(file.match(/(\d+)\..*/)[1]) >= num_im,
        );
        filesToDelete.forEach((fileToDelete) => {
            fs.rmSync(dir + "/" + fileToDelete);
        });
    }
    return text;
};

export const retrieveRichText = async (text, db) => {
    while (text.indexOf('<img src="files/' + db) >= 0) {
        let im_start = text.indexOf('<img src="files/' + db) + 10;
        let im_end = text.indexOf('"', im_start);
        let im_data = text.substring(im_start, im_end);

        let ft = im_data.substring(im_data.lastIndexOf(".") + 1);
        // console.log(ft);
        let image = fs.readFileSync(im_data).toString("base64");
        const fullPath = "data:image/" + ft + ";base64," + image;
        text = text.replace(im_data, fullPath);
    }
    // console.log(text);
    return text;
};

export const exportImageFile = async (im_data, hq, name, id, db) => {
    if ((typeof im_data === "string" || im_data instanceof String) && im_data.startsWith("data:")) {
        if (im_data.startsWith("data:application/pdf")) {
            let buffer = Buffer.from(im_data, "base64");
            buffer = (await pdfToPng(buffer))[0].content;
            im_data = buffer.toString("base64");
        }
        let path = "files/" + db + "/" + id + "/" + name;
        if (im_data.startsWith("data:image/jpeg")) {
            let im_dat = im_data.replace(/^data:image\/jpeg;base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            path = path + ".jpeg";
            let image = await Jimp.read(buffer);
            if (image.getWidth() > 1000 || image.getHeight() > 1000) {
                image.scaleToFit(1000, 1000);
            }
            if (!hq && (image.getWidth() > 500 || image.getHeight() > 500)) {
                image.quality(60);
            }
            image.write(path);
        } else if (im_data.startsWith("data:image/png")) {
            let im_dat = im_data.replace(/^data:image\/png;base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            let png = PNG.sync.read(buffer);
            let alpha = png.alpha;
            let image = await Jimp.read(buffer);
            if (image.getWidth() > 1000 || image.getHeight() > 1000) {
                image.scaleToFit(1000, 1000);
            }
            if ((image.getWidth() > 400 || image.getHeight() > 400) && !alpha) {
                path = path + ".jpeg";
                image.quality(90);
            } else {
                path = path + ".png";
            }
            if (!hq && (image.getWidth() > 600 || image.getHeight() > 600)) {
                image.quality(60);
            }
            image.write(path);
        } else {
            const end_form = im_data.indexOf(";");
            const format = im_data.substring(11, end_form);
            const end_head = im_data.indexOf(",") + 1;
            let im_dat = im_data.slice(end_head);
            path = path + "." + format;
            const dir = "files/" + db + "/" + id;
            const buffer = Buffer.from(im_dat, "base64");
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(path, buffer);
        }
        return path;
    } else {
        return im_data;
    }
};

export const saveAlbumImage = async (im_data, path) => {
    if ((typeof im_data === "string" || im_data instanceof String) && im_data.startsWith("data:")) {
        if (
            im_data.startsWith("data:image/jpeg") ||
            im_data.startsWith("data:image/png") ||
            im_data.startsWith("data:image/tiff") ||
            im_data.startsWith("data:image/webp") ||
            im_data.startsWith("data:image/gif")
        ) {
            console.log(path);
            let im_dat = im_data.replace(/^data:image\/(png|jpeg|webp|gif|tiff);base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            const image = await sharp(buffer, { animated: true });
            const md = await image.metadata();
            if (md.size > 3 * 1000 * 1000 && (md.width > 2000 || md.height > 2000)) {
                await image.resize(2000, 2000, { fit: "inside" });
            }

            const ob = await image.toBuffer();
            fs.writeFileSync(path, ob);
        }
        return path;
    } else {
        return false;
    }
};

export const saveLogo = async (im_data, path) => {
    if ((typeof im_data === "string" || im_data instanceof String) && im_data.startsWith("data:")) {
        if (
            im_data.startsWith("data:image/jpeg") ||
            im_data.startsWith("data:image/png") ||
            im_data.startsWith("data:image/tiff") ||
            im_data.startsWith("data:image/webp") ||
            im_data.startsWith("data:image/gif")
        ) {
            console.log(path);
            let im_dat = im_data.replace(/^data:image\/(png|jpeg|webp|gif|tiff);base64,/, "");
            const buffer = Buffer.from(im_dat, "base64");
            const image = await sharp(buffer, { animated: true });
            const md = await image.metadata();
            if (md.width > 512 || md.height > 512) {
                await image.resize(512, 512, { fit: "inside" });
            }

            const ob = await image.toBuffer();
            fs.writeFileSync(path, ob);
            return path;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

export const retrieveImageFile = async (filename) => {
    if ((typeof filename === "string" || filename instanceof String) && fs.existsSync(filename)) {
        let ft = filename.substring(filename.lastIndexOf(".") + 1);
        let image = fs.readFileSync(filename).toString("base64");
        const b64Image = "data:image/" + ft + ";base64," + image;
        return b64Image;
    }
    return filename;
};

export const makePreviewImage = async (inputPath, outputPath) => {
    sharp.cache(false);
    if (
        inputPath.toLowerCase().endsWith("jpg") ||
        inputPath.toLowerCase().endsWith("jpeg") ||
        inputPath.toLowerCase().endsWith("png") ||
        inputPath.toLowerCase().endsWith("tiff") ||
        inputPath.toLowerCase().endsWith("webp") ||
        inputPath.toLowerCase().endsWith("gif")
    ) {
        const buffer = fs.readFileSync(inputPath);
        const image = await sharp(buffer, { animated: true });
        const md = await image.metadata();

        if (md.width > 400 || md.height > 400) {
            await image.resize(400, 400, { fit: "inside" });
        }
        await image.webp({ quality: 60 });
        if (md.pages > 10) {
            await image.webp({ quality: 30 });
        }
        const ob = await image.toBuffer();
        fs.writeFileSync(outputPath, ob);
    } else {
        const buffer = fs.readFileSync(inputPath);
        fs.writeFileSync(outputPath, buffer);
    }
};

export const deleteDatabaseImages = (id, db) => {
    const dir = "files/" + db + "/" + id + "/";
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
    }
};

export const renameImageFolder = (oldName, newName, db) => {
    const oldDir = "files/" + db + "/" + oldName + "/";
    const newDir = "files/" + db + "/" + newName + "/";
    if (fs.existsSync(oldDir)) {
        fs.renameSync(oldDir, newDir);
    }
};
