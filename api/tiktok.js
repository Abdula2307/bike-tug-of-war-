const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '2172556',
    key: 'b5805a7e3fff9d836f8d',
    secret: '014e76fd732f639c3ec1',
    cluster: 'eu',
    useTLS: true
});

const GIFT_MAP = {
    'Rose':      'girl',
    'Heart':     'superGirl',
    'TikTok':    'boy',
    'Confetti':  'superBoy',
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const { giftName, uniqueId } = req.body;
        const command = GIFT_MAP[giftName];
        if (command) {
            console.log(`[GIFT] ${uniqueId} sent "${giftName}" → ${command}`);
            await pusher.trigger('tug-of-war', 'gift', { command });
        }
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
