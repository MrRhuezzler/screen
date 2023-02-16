export const IMAGE_TYPES = (process.env.IMAGE_TYPES as string)
  .split(",")
  .map((v) => {
    return new RegExp(v);
  });

export const VIDEO_TYPES = (process.env.VIDEO_TYPES as string)
  .split(",")
  .map((v) => {
    return new RegExp(v);
  });
