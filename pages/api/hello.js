import fs from "fs";
import md5 from "md5";
import nc from "next-connect";
import path from "path";

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
    const uploadPath = path.resolve("./public/");
    if (firstChunk && fs.existsSync(uploadPath + '/' + tmpFilename)) {
      fs.unlinkSync(uploadPath + '/' + tmpFilename);
    }
    fs.appendFileSync(uploadPath + '/' + tmpFilename, buffer);
    if (lastChunk) {
      const finalFilename = md5(Date.now()).substr(0, 6) + "." + ext;
      fs.renameSync(uploadPath + '/' + tmpFilename, uploadPath + finalFilename);
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
      });
    } else {
      res.json(uploadPath + '/' + tmpFilename);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

export default handler;