import { writeAsyncIterableToWritable } from "@remix-run/node";
import cloudinary from "cloudinary";

// type Props = {
//   data: AsyncIterable<Uint8Array>;
// };

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (data: AsyncIterable<Uint8Array>) => {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "seven-wonders",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });
  return uploadPromise;
};
