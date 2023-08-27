const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const { uploadFile, allowedFileTypes, maxFileSize } = require('../secret');

const uploadDir = uploadFile

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
      cb(null, Date.now() + "-" +sanitizedFilename+ extname) // before=> file.originalname.replace(extname, '')
    }
  })

  const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    // console.log(extname)
    if(!allowedFileTypes.includes(extname.substring(1))){
      return cb(new Error('FileType not allowed'), false); 
    }
    cb(null, true)
  }
  
  const upload = multer({ storage: storage , limits: {fileSize: maxFileSize}, fileFilter })

  module.exports = upload;