import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: "https://ik.imagekit.io/tumbal"
});

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // DIAGNOSTIK: Cek apakah kunci sudah masuk atau belum
  if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    return res.status(500).json({ 
      error: "Kunci Private tidak ditemukan di Vercel!",
      tips: "Pastikan sudah klik 'Add' dan sudah 'Redeploy'."
    });
  }

  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      error: "ImageKit gagal memproses",
      pesan_asli: error.message 
    });
  }
}
