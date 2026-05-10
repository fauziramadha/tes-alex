export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { message } = req.body;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 1. Cek apakah Vercel berhasil membaca kunci rahasia
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error("GAGAL: Kunci Token atau Chat ID kosong / tidak terbaca oleh Vercel!");
        return res.status(500).json({ error: "Kredensial tidak terbaca" });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        
        // 2. Cek apakah Telegram menolak pesannya
        if (!result.ok) {
            console.error("DITOLAK TELEGRAM:", result);
            return res.status(400).json(result);
        }

        // 3. Jika berhasil
        console.log("BERHASIL KIRIM KE TELEGRAM:", result);
        return res.status(200).json(result);
        
    } catch (error) {
        console.error("SISTEM ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
}
