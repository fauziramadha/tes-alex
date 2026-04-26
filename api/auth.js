// File: api/auth.js (Vercel Serverless Function)
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/tumbal",
  publicKey: "public_XKAN1YH/RnUD5N+4hS/qIvqDJNc=",
  // Private Key disembunyikan di Environment Variables Vercel demi keamanan
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY 
});

module.exports = function (req, res) {
  // Mengizinkan CORS (Cross-Origin Resource Sharing)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat autentikasi ImageKit" });
  }
};
