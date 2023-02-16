import { rm } from "fs/promises";
import { Router } from "express";

const slideRouter = Router();

slideRouter.get("/", async (req, res, next) => {
  try {
    const slides = await prisma?.slide.findMany({
      where: {
        isActive: true,
      },
      orderBy: { order: "asc" },
      include: {
        file: true,
      },
    });
    res.status(200).json(slides);
  } catch (err) {
    next(new Error("Something went wrong"));
  }
});

slideRouter.post("/", async (req, res, next) => {
  try {
    const { fileId, name, order } = req.body;
    const slide = await prisma?.slide.create({
      data: { file: { connect: { id: fileId } }, order, name },
    });
    res.status(200).json(slide);
  } catch (err) {
    next(new Error("Something went wrong"));
  }
});

slideRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await prisma?.slide.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        file: true,
      },
    });
    res.status(200).json(slide);
  } catch (err) {
    next(new Error("Something went wrong"));
  }
});

slideRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fileId, name, order, isActive } = req.body;
    const slide = await prisma?.slide.update({
      data: {
        file: { update: { id: fileId } },
        order,
        name,
        isActive,
      },
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json(slide);
  } catch (err) {
    next(new Error("Something went wrong"));
  }
});

slideRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await prisma?.slide.delete({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        file: true,
      },
    });
    if (slide) {
      const file = await prisma?.file.delete({
        where: {
          id: slide?.file?.id,
        },
      });
      if (file && file.path) {
        await rm(file.path);
      }
    }
    res.status(200).json(slide);
  } catch (err) {
    next(new Error("Something went wrong"));
  }
});

export default slideRouter;
