const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'products',
        allowed_formats: ['jpeg', 'png', 'jpg'],
    },
});

const upload = multer({storage});

module.exports = upload;