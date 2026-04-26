import { ImageKit } from "@imagekit/nodejs"; // Tambahkan tanda kurung kurawal { } di sini

// Inisialisasi dengan pengecekan ekstra untuk Vercel
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  // Atur Header CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Memanggil fungsi autentikasi
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    // Jika masih ada error, tampilkan detailnya untuk kita perbaiki
    res.status(500).json({ 
      error: "Gagal menghasilkan parameter", 
      debug: error.message 
    });
  }
}
