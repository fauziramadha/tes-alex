export default async function handler(req, res) {
    // 1. Mengizinkan akses (CORS) dari web kamu
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

    // Handle preflight request (Pengecekan awal dari browser)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Pastikan yang masuk adalah perintah DELETE
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Metode tidak diizinkan. Harus DELETE.' });
    }

    // 3. Tangkap ID Foto yang dikirim dari admin.html
    const { fileId } = req.query;

    if (!fileId) {
        return res.status(400).json({ error: 'fileId tidak dikirim' });
    }

    // 4. Tarik Private Key dari Environment Variables Vercel
    // Pastikan nama variabel di setting Vercel kamu adalah IMAGEKIT_PRIVATE_KEY
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY; 

    if (!privateKey) {
        return res.status(500).json({ error: 'Private Key belum dipasang di sistem Vercel' });
    }

    try {
        // 5. Ubah format Private Key menjadi Basic Auth (Syarat wajib ImageKit)
        const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');

        // 6. Tembak API Resmi ImageKit untuk menghapus file secara permanen
        const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader
            }
        });

        // 7. Berikan laporan kembali ke admin.html
        if (response.ok || response.status === 204) {
            return res.status(200).json({ success: true, message: 'File musnah dari ImageKit!' });
        } else {
            const errorData = await response.json();
            return res.status(response.status).json({ success: false, error: errorData });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
