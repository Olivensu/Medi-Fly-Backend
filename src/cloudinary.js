import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dgrwar1eh', 
  api_key: '279136714214184', 
  api_secret: 'O2kUFGCqnTLSczPQb8pZ8cDFzXM' 
});

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

  module.exports = cloudinary;