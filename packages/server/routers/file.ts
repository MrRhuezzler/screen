import path from "path";
import { rename } from "fs/promises";
import { Router } from "express";
import fileUpload from "../config/multer";
import { IMAGE_TYPES, VIDEO_TYPES } from "../config/contants";

const fileRouter = Router();

fileRouter.post("/", async (req, res, next) => {
  try {
    await fileUpload(req, res);
    if (!req.file) {
      next(new Error("File couldn't be uploaded"));
      return;
    }

    console.log(req.file);

    const file = req.file as Express.Multer.File;
    const extension = path.extname(file.originalname);

    let mediaType = null;

    IMAGE_TYPES.forEach((v) => {
      const result = v.test(extension);
      if (result) {
        mediaType = "IMAGE";
      }
    });

    VIDEO_TYPES.forEach((v) => {
      const result = v.test(extension);
      if (result) {
        mediaType = "VIDEO";
      }
    });

    if (!mediaType) {
      next(new Error("unsupported file format"));
      return;
    }

    const fileObj = await prisma?.file.create({
      data: {
        mediaType,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    if (fileObj) {
      const oldPath = path.join(__dirname, `../public/${file.originalname}`);
      const newPath = path.join(
        __dirname,
        `../public/${fileObj.id}${extension}`
      );
      const url = `${process.env.PUBLIC_BACKEND_URL}/${fileObj.id}${extension}`;

      const updatedFileObj = await prisma?.file.update({
        data: { path: newPath, url },
        where: { id: fileObj.id },
      });
      await rename(oldPath, newPath);

      return res.status(200).json(updatedFileObj);
    } else {
      throw new Error("Error uploading file");
    }
  } catch (err) {
    console.log(err);
    next(new Error("Error uploading file"));
  }
});

export default fileRouter;
