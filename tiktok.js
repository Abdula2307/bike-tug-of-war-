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

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { giftName, uniqueId } = body;

        const command = GIFT_MAP[giftName];
        if (command) {
            console.log(`[GIFT] ${uniqueId} sent "${giftName}" → ${command}`);
            await pusher.trigger('tug-of-war', 'gift', { command });
        }

        return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};