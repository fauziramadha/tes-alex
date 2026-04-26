import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  // Pengaturan CORS agar admin.html bisa mengakses API ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Menangani permintaan awal browser (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Menghasilkan token dan signature untuk ImageKit
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(500).json({ error: "Gagal memuat autentikasi" });
  }
}
