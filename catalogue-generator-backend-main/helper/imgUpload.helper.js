const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const UPLOADS_FOLDER = path.join(__dirname, 'uploads');


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
