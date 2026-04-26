// File: api/auth.js (Vercel Serverless Function)
// Menggunakan library
const ImageKit = require("@imagekit/nodejs"); 

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/tumbal",
  // Memanggil Public Key dari Environment Variables yang sudah di pasang
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
  // Private Key aman
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY 
});

module.exports = function (req, res) {
  // Mengizinkan CORS agar bisa diakses dari domain web kamu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Menangani preflight request untuk browser
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat autentikasi ImageKit" });
  }
};
