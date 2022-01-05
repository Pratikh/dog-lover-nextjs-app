import fs from "fs";
import md5 from "md5";
import nc from "next-connect";
import path from "path";
import mv from "mv";

const handler = nc();
handler.post((req, res) => {
  try {
    const { name: fileName, currentChunkIndex, totalChunks } = req.query;
    const firstChunk = parseInt(currentChunkIndex) === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;

    const ext = fileName?.split(".").pop();
    const data = req.body?.toString().split(",")[1];
    const buffer = new Buffer(data, "base64");
    const tmpFilename = "tmp_" + md5(fileName + req.ip) + "." + ext;
    const uploadPath = path.resolve("/tmp");
    const tempFilePath = uploadPath + "/" + tmpFilename;
    if (firstChunk && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    fs.appendFileSync(tempFilePath, buffer);
    if (lastChunk) {
      const finalFilename = md5(Date.now()).substr(0, 6) + "." + ext;
      const renamePath = uploadPath + "/" + finalFilename;
      mv(tempFilePath, renamePath, (error) => {
        res.status(500).json({
          success: false,
          error,
        });
      });

      res.status(200).json({
        success: true,
        finalFilename,
        fileName,
        currentChunkIndex,
        totalChunks,
        firstChunk,
        lastChunk,
        ext,
        uploadPath,
        tempFilePath
      });
    } else {
      res.json(uploadPath + "/" + tmpFilename);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});
export default handler;
