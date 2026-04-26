const ImageKit = require("@imagekit/nodejs"); // Perubahan di sini

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ error: "Gagal menghasilkan parameter otentikasi" });
  }
}
