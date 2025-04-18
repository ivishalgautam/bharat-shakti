import { saveFile } from "../utils/file.js";

export const multipartPreHandler = async (
  req,
  reply,
  checkForArrayElements = []
) => {
  const parts = req.parts();
  const body = {};
  const filePaths = [];

  for await (const part of parts) {
    if (part.file) {
      // console.log(part);
      const filePath = await saveFile(part);
      // console.log({ filePath });
      part.fieldname in body
        ? body[part.fieldname].push(filePath)
        : (body[part.fieldname] = [filePath]);

      filePaths.push(filePath);
    } else {
      checkForArrayElements.includes(part.fieldname)
        ? (body[part.fieldname] = JSON.parse(part.value))
        : (body[part.fieldname] = part.value);
    }
  }
  // console.log(body);
  req.body = body;
  req.filePaths = filePaths;
};
