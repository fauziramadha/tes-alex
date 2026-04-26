import ImageKit from "@imagekit/nodejs";

// Inisialisasi ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  // Header keamanan agar web bisa mengakses API ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // PERUBAHAN UTAMA: Tambahkan .helper sebelum getAuthenticationParameters()
    const authenticationParameters = imagekit.helper.getAuthenticationParameters();
    
    res.status(200).json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ 
      error: "Gagal menghasilkan parameter", 
      debug: error.message 
    });
  }
}
