import ImageKit from "@imagekit/nodejs";

// Logika untuk menangani perbedaan cara import di Vercel
const ImageKitConstructor = ImageKit.default || ImageKit;

const imagekit = new ImageKitConstructor({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  // Pengaturan keamanan agar web kamu bisa mengakses API ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ 
      error: "Gagal menghasilkan parameter", 
      debug: error.message 
    });
  }
}
