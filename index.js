const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

/*
==================================================
                    ENV
==================================================
*/

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const KICK_CLIENT_ID = process.env.KICK_CLIENT_ID;
const KICK_CLIENT_SECRET = process.env.KICK_CLIENT_SECRET;

const PORT = process.env.PORT || 3000;
const CHECK_INTERVAL = 30000;

if (!BOT_TOKEN) {
    console.error("❌ BOT_TOKEN غير موجود");
    process.exit(1);
}

if (!CHANNEL_ID) {
    console.error("❌ CHANNEL_ID غير موجود");
    process.exit(1);
}

if (!KICK_CLIENT_ID || !KICK_CLIENT_SECRET) {
    console.error("❌ KICK_CLIENT_ID أو KICK_CLIENT_SECRET غير موجود");
    process.exit(1);
}

/*
==================================================
                 TELEGRAM
==================================================
*/

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});

/*
==================================================
                 RENDER SERVER
==================================================
*/

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("DREX STREAM BOT is running ✅");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        bot: "DREX STREAM BOT"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

/*
==================================================
                 CREATORS
==================================================
*/

const CREATORS = {

    Respect: [
        { name: "DREX_7A", youtube: null, kick: "drex-7a" },
        { name: "OGxHusni", youtube: null, kick: "ogxhusni" },
        { name: "NEFOXD", youtube: "NEFOXDRT", kick: "nefoxd" },
        { name: "Waakd", youtube: null, kick: "waakd" },
        { name: "Al_Hashidi", youtube: null, kick: "al_hashidi" },
        { name: "ALPHAA27", youtube: null, kick: "alphaa27" },
        { name: "ALRND", youtube: null, kick: "alrnd" },
        { name: "bobshayb", youtube: null, kick: "bobshayb" },
        { name: "Drb7h", youtube: null, kick: "drb7h" },
        { name: "F1aisal", youtube: "F1aisalRT", kick: "f1aisal" },
        { name: "Fhlwy", youtube: null, kick: "fhlwy" },
        { name: "Graficsaw", youtube: null, kick: "graficsaw" },
        { name: "Hook", youtube: null, kick: "hook" },
        { name: "iC4C", youtube: null, kick: "ic4c" },
        { name: "ID7O", youtube: null, kick: "id7o" },
        { name: "iiMaD", youtube: null, kick: null },
        { name: "iMonkey_D", youtube: "imonkey_d", kick: "imonkey_d" },
        { name: "iSLF", youtube: null, kick: "islf" },
        { name: "lHAJAR", youtube: null, kick: "lhajar" },
        { name: "Mohsen_18", youtube: null, kick: "mohsen_18" },
        { name: "moustache", youtube: null, kick: null },
        { name: "Musab", youtube: null, kick: "musab" },
        { name: "NASSER", youtube: null, kick: "nasser" },
        { name: "OKB8", youtube: null, kick: "okb8" },
        { name: "omar_enjoy", youtube: null, kick: "omar_enjoy" },
        { name: "Peerless", youtube: null, kick: "peerless" },
        { name: "RAYAN_A3", youtube: null, kick: "rayan_a3" },
        { name: "RAYN", youtube: null, kick: "rayn" },
        { name: "S5B", youtube: "S5B_Q", kick: "s5b" },
        { name: "Seagull", youtube: null, kick: "seagull" },
        { name: "SENSEI_09", youtube: null, kick: "sensei-09" },
        { name: "TAF86", youtube: null, kick: "taf86" },
        { name: "Vilwo", youtube: null, kick: "vilwo" },
        { name: "w1pey", youtube: null, kick: "w1pey" },
        { name: "wef0", youtube: null, kick: "wef0" },
        { name: "wolf", youtube: null, kick: "wolf" },
        { name: "xKnDrx", youtube: null, kick: null },
        { name: "ZOO6K", youtube: null, kick: null }
    ],

    MT: [],

    Falcons: [
        { name: "BO3OMAR22", youtube: null, kick: null },
        { name: "BanderitaX", youtube: null, kick: null },
        { name: "FZX", youtube: null, kick: null },
        { name: "LLE", youtube: null, kick: null },
        { name: "SaudCast", youtube: null, kick: null },
        { name: "RAED", youtube: null, kick: null },
        { name: "xSMA333", youtube: null, kick: null },
        { name: "Aziz", youtube: null, kick: null },
        { name: "Drb7h", youtube: null, kick: null },
        { name: "Abu Abeer", youtube: null, kick: null },
        { name: "oPiiLz", youtube: null, kick: null },
        { name: "3ADEL", youtube: null, kick: null },
        { name: "Mohammed Oden", youtube: null, kick: null }
    ],

    POWR: [
        { name: "Shongxbong", youtube: null, kick: null },
        { name: "Abu Nooh", youtube: null, kick: null },
        { name: "Mjrm Games", youtube: null, kick: null },
        { name: "FFearFFul", youtube: null, kick: null },
        { name: "D7oomy999", youtube: null, kick: null },
        { name: "Abu Khalil", youtube: null, kick: null },
        { name: "Klooode25", youtube: null, kick: null },
        { name: "MrFifa", youtube: null, kick: null },
        { name: "Abu 3abd", youtube: null, kick: null },
        { name: "Moskoo", youtube: null, kick: null },
        { name: "AbuSwe7l", youtube: null, kick: null },
        { name: "YZNSA", youtube: null, kick: null }
    ]
};

/*
==================================================
                 FLATTEN LIST
==================================================
*/

const creators = [];

for (const team of Object.keys(CREATORS)) {
    for (const creator of CREATORS[team]) {
        creators.push({
            ...creator,
            team
        });
    }
}

/*
==================================================
                 STATE
==================================================
*/

const liveState = new Map();
const postedStreams = new Map();

let kickAccessToken = null;
let kickTokenExpiresAt = 0;

/*
==================================================
                 KICK TOKEN
==================================================
*/

async function getKickToken() {

    if (
        kickAccessToken &&
        Date.now() < kickTokenExpiresAt
    ) {
        return kickAccessToken;
    }

    const response = await fetch(
        "https://id.kick.com/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: KICK_CLIENT_ID,
                client_secret: KICK_CLIENT_SECRET
            })
        }
    );

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `Kick OAuth ${response.status}: ${text}`
        );
    }

    const data = await response.json();

    kickAccessToken =
        data.access_token;

    kickTokenExpiresAt =
        Date.now() +
        ((data.expires_in || 3600) - 60) * 1000;

    console.log("🔑 Kick token obtained");

    return kickAccessToken;
}

/*
==================================================
                 KICK REQUEST
==================================================
*/

async function kickRequest(url) {

    const token =
        await getKickToken();

    const response = await fetch(
        url,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Client-ID":
                    KICK_CLIENT_ID,
                Accept:
                    "application/json"
            }
        }
    );

    if (!response.ok) {

        const text =
            await response.text();

        throw new Error(
            `Kick API ${response.status}: ${text}`
        );
    }

    return response.json();
}

/*
==================================================
                 CHECK KICK
==================================================
*/

async function checkKick(creator) {

    if (!creator.kick) {
        return null;
    }

    const username =
        encodeURIComponent(
            creator.kick
        );

    const data =
        await kickRequest(
            `https://api.kick.com/public/v1/channels?slug=${username}`
        );

    const channel =
        Array.isArray(data.data)
            ? data.data[0]
            : data.data;

    if (!channel) {
        return null;
    }

    /*
      Kick channel data contains live information.
    */

    if (
        channel.is_live === true ||
        channel.stream
    ) {

        const stream =
            channel.stream || {};

        return {
            id:
                stream.id ||
                channel.id ||
                creator.kick,

            title:
                stream.title ||
                channel.stream_title ||
                `${creator.name} بدأ البث 🔴`,

            url:
                `https://kick.com/${creator.kick}`
        };
    }

    return null;
}

/*
==================================================
                 SEND TELEGRAM
==================================================
*/

async function sendLiveAlert(
    creator,
    stream
) {

    const message =
`🔴 *بدأ البث الآن!*

👤 ${creator.name}
🏷️ ${creator.team}

🎬 ${stream.title}

📺 [مشاهدة البث على Kick](${stream.url})`;

    try {

        await bot.sendMessage(
            CHANNEL_ID,
            message,
            {
                parse_mode: "Markdown",
                disable_web_page_preview: false
            }
        );

        console.log(
            `📢 تم نشر: ${creator.name}`
        );

        return true;

    } catch (error) {

        console.error(
            `❌ Telegram: ${error.message}`
        );

        return false;
    }
}

/*
==================================================
                 MONITOR
==================================================
*/

let monitoring = false;

async function monitorCreators() {

    if (monitoring) return;

    monitoring = true;

    try {

        console.log(
            `🔎 فحص ${creators.length} حساب...`
        );

        /*
          الأولوية:
          DREX_7A أولاً
        */

        for (const creator of creators) {

            if (!creator.kick) {
                continue;
            }

            try {

                const stream =
                    await checkKick(
                        creator
                    );

                const key =
                    creator.kick
                        .toLowerCase();

                if (!stream) {

                    if (
                        liveState.get(key)
                    ) {

                        liveState.set(
                            key,
                            false
                        );

                        console.log(
                            `⚫ انتهى بث ${creator.name}`
                        );
                    }

                    continue;
                }

                liveState.set(
                    key,
                    true
                );

                const streamId =
                    String(
                        stream.id
                    );

                if (
                    postedStreams.get(key) ===
                    streamId
                ) {
                    continue;
                }

                const sent =
                    await sendLiveAlert(
                        creator,
                        stream
                    );

                if (sent) {

                    postedStreams.set(
                        key,
                        streamId
                    );
                }

            } catch (error) {

                console.error(
                    `❌ ${creator.name}: ${error.message}`
                );
            }
        }

    } finally {

        monitoring = false;
    }
}

/*
==================================================
                 COMMANDS
==================================================
*/

bot.onText(
    /^\/start$/,
    async msg => {

        await bot.sendMessage(
            msg.chat.id,

`🤖 *DREX STREAM BOT*

🟢 البوت يعمل

⭐ الأولوية:
DREX_7A

📡 مراقبة Kick مفعلة
📢 تنبيهات القناة مفعلة

استخدم:
/status
/creators`,
            {
                parse_mode: "Markdown"
            }
        );
    }
);

bot.onText(
    /^\/status$/,
    async msg => {

        let text =
            "📡 *حالة المراقبة*\n\n";

        for (const creator of creators) {

            if (!creator.kick) {
                continue;
            }

            const status =
                liveState.get(
                    creator.kick.toLowerCase()
                )
                ? "🔴 LIVE"
                : "⚫ Offline";

            text +=
`${creator.name} — ${status}\n`;
        }

        await bot.sendMessage(
            msg.chat.id,
            text,
            {
                parse_mode: "Markdown"
            }
        );
    }
);

bot.onText(
    /^\/creators$/,
    async msg => {

        let text =
            "📋 *قائمة المراقبة*\n\n";

        for (const team of Object.keys(CREATORS)) {

            text +=
                `\n🏷️ *${team}*\n`;

            for (
                const creator
                of CREATORS[team]
            ) {

                text +=
                    `• ${creator.name}` +
                    (
                        creator.kick
                            ? ` — @${creator.kick}`
                            : ""
                    ) +
                    "\n";
            }
        }

        await bot.sendMessage(
            msg.chat.id,
            text,
            {
                parse_mode: "Markdown"
            }
        );
    }
);

/*
==================================================
                 ERRORS
==================================================
*/

bot.on(
    "polling_error",
    error => {
        console.error(
            "❌ Telegram polling:",
            error.message
        );
    }
);

process.on(
    "unhandledRejection",
    error => {
        console.error(
            "❌ Unhandled:",
            error
        );
    }
);

process.on(
    "uncaughtException",
    error => {
        console.error(
            "❌ Exception:",
            error.message
        );
    }
);

/*
==================================================
                 START
==================================================
*/

console.log(
    "================================"
);

console.log(
    "🤖 DREX STREAM BOT"
);

console.log(
    "⭐ DREX_7A = PRIORITY #1"
);

console.log(
    `👥 Total creators: ${creators.length}`
);

console.log(
    "📡 Kick monitor: ON"
);

console.log(
    "📢 Telegram alerts: ON"
);

console.log(
    "================================"
);

monitorCreators();

setInterval(
    monitorCreators,
    CHECK_INTERVAL
);
