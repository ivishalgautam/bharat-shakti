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
    // console.log(part);
    if (part.file) {
      const filePath = await saveFile(part);
      if (part.fieldname in body) {
        body[part.fieldname].push(filePath);
      } else {
        body[part.fieldname] = [];
      }

      body[part.fieldname];
      filePaths.push(filePath);
    } else {
      if (checkForArrayElements.includes(part.fieldname)) {
        console.log({ part });
      }
      checkForArrayElements.includes(part.fieldname)
        ? (body[part.fieldname] = JSON.parse(part.value))
        : (body[part.fieldname] = part.value);
    }
  }
  // Attach parsed body and file paths to the request
  req.body = body;
  req.filePaths = filePaths;
};
