import fs from "fs";
import md5 from "md5";
import nc from "next-connect";

const handler = nc();
handler.post((req, res) => {
  const { name, currentChunkIndex, totalChunks } = req.query;
  const firstChunk = parseInt(currentChunkIndex) === 0;
  const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;

  const ext = name?.split(".").pop();
  const data = req.body?.toString().split(",")[1];
  const buffer = new Buffer(data, "base64");
  const tmpFilename = "tmp_" + md5(name + req.ip) + "." + ext;
  if (firstChunk && fs.existsSync("./uploads/" + tmpFilename)) {
    fs.unlinkSync("./uploads/" + tmpFilename);
  }
  // fs.appendFileSync("./uploads/" + tmpFilename, buffer);
  // if (lastChunk) {
  //   const finalFilename = md5(Date.now()).substr(0, 6) + "." + ext;
  //   fs.renameSync("./uploads/" + tmpFilename, "./uploads/" + finalFilename);
  //   res.json({ finalFilename });
  // } else {
  //   res.json("ok");
  // }
  res.status(200).json({
    success: true,
    name,
    currentChunkIndex,
    totalChunks,
    firstChunk,
    lastChunk,
    ext,
    buffer,
  });
});

export default handler;
// export default function handler(req, res) {
//   const { name, currentChunkIndex, totalChunks } = req.query;
//   console.log("hello", body);

//   switch (req.method) {
//     case "GET":
//       // Get data from your database
//       res.status(200).json({ name: `User` });
//       break;
//     case "PUT":
//       // Update or create data in your database
//       res.status(200).json({ u: `User` });
//       break;
//     case "POST":

//       break;
//     default:
//       res.setHeader("Allow", ["GET", "PUT"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//     type: "application/octet-stream",
//     limit: "100mb",
//   },
// };
