import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

// import fs from "fs";
// import md5 from "md5";
// import nc from "next-connect";
// import path from "path";

// const handler = nc();
// handler.post((req, res) => {
//   try {
//     const { name: fileName, currentChunkIndex, totalChunks } = req.query;
//     const firstChunk = parseInt(currentChunkIndex) === 0;
//     const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;

//     const ext = fileName?.split(".").pop();
//     const data = req.body?.toString().split(",")[1];
//     const buffer = new Buffer(data, "base64");
//     const tmpFilename = "tmp_" + md5(fileName + req.ip) + "." + ext;
//     const uploadPath = path.resolve("./public/");
//     if (firstChunk && fs.existsSync(uploadPath + '/' + tmpFilename)) {
//       fs.unlinkSync(uploadPath + '/' + tmpFilename);
//     }
//     fs.appendFileSync(uploadPath + '/' + tmpFilename, buffer);
//     if (lastChunk) {
//       const finalFilename = md5(Date.now()).substr(0, 6) + "." + ext;
//       fs.renameSync(uploadPath + '/' + tmpFilename, uploadPath + finalFilename);
//       res.status(200).json({
//         success: true,
//         finalFilename,
//         fileName,
//         currentChunkIndex,
//         totalChunks,
//         firstChunk,
//         lastChunk,
//         ext,
//         uploadPath,
//       });
//     } else {
//       res.json(uploadPath + '/' + tmpFilename);
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error
//     });
//   }
// });
// export default handler;


// export default function handler(req, res) {
  // handler.get()
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

// import nc from 'next-connect';
// import {join as pathJoin,dirname} from 'path';
// import { openSync, closeSync, appendFileSync,existsSync as fsExists,renameSync,chmodSync,rmdirSync } from 'fs';
// import {getFullPath} from 'lib/api-helpers';
// import {mkdir} from 'shelljs';
// import {platform} from 'os';
// import asyncAtt, {createFromFile} from 'models/Attachments';
// import { ObjectId } from 'mongodb';

// const handler=nc();
// handler.post(async function(req,res){
//   if(req.session.files==undefined) req.session.files={};

//   let fd=0,sess;
//   let sessFiles=req.session.get('files');
//   const autoAttach=typeof req.body['autoAttach']=='boolean'?req.body.autoAttach:true;

//   if(sessFiles?req.session.files[req.body.tempId]==undefined:true)
//   {
//       sess={...req.body};

//       if(sess['autoAttach']!=undefined) delete sess.autoAttach;

//       delete sess.tempId;
//       delete sess.content;
//       sess.mime=sess.mime.split(';')[0];
//       sess.tempFile=getFullPath(pathJoin('.tmp','uploads',req.body.tempId,sess.fileName));

//       if(!sessFiles) sessFiles={};

//       sessFiles[req.body.tempId]=sess;
//   }else{
//       sessFiles[req.body.tempId].index=req.body.index;
//       sess=sessFiles[req.body.tempId];
//   }

//   req.session.set('files',sessFiles);

//   if(!fsExists(dirname(sess.tempFile))) mkdir('-p',dirname(sess.tempFile));

//   const buffer=Buffer.from(req.body.content,'base64');
//   let result={
//       index:req.body.index,
//       size:buffer.length
//   };

//   fd=openSync(sess.tempFile,'as');
//   appendFileSync(fd,buffer);
//   //ensure file is written correctly, wait for 500ms
//   await (new Promise((resolve)=>{
//       setTimeout(() => {
//          resolve();
//       }, 500);
//   }));
//   closeSync(fd);

//   if(sess.index==sess.parts-1)
//   {
//     if(autoAttach)
//     {
//         const names=sess.fileName.split('.'),now=new Date();
//         const ext=names.pop(),
//         //baseDir is public/uploads/YYYY-MM/
//         baseDir=getFullPath(pathJoin('public','uploads',now.getFullYear()+'-'+(now.getMonth()+1).toString().padStart(2,'0')));

//         if(!fsExists(baseDir)) {
//             await mkdir('-p',baseDir);

//             if(platform()!='win32') chmodSync(baseDir,0o775);
//         }

//         const newFile=pathJoin(baseDir,names.join('.')+'-'+req.body.tempId+'.'+ext);
//         //move uploaded file from temp directory to destined uploads dir
//         renameSync(sess.tempFile,newFile);
//         //remove temporary directory
//         rmdirSync(dirname(sess.tempFile));

//         if(platform()!='win32') chmodSync(newFile,0o664);

//         delete req.session.files[req.body.tempId];

//         try{
//            const attachment=await createFromFile(newFile,{
//                  fileSize:sess.fileSize,
//                  mime:sess.mime
//            });

//            if(attachment) result=await attachment.safe;
//         }catch(err){
//            res.json({
//                success:false,
//                result:err
//            });
//            return;
//         }
//     }else{
//         result.tempFile=sess.tempFile;
//     }
//  }

//  res.status(200).json({
//     success:true,
//     result
//  });
// });
// export default handler;
