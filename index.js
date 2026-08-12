const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

/*
==================================================
                 ENVIRONMENT
==================================================
*/

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const KICK_CLIENT_ID = process.env.KICK_CLIENT_ID;
const KICK_CLIENT_SECRET = process.env.KICK_CLIENT_SECRET;

const PORT = process.env.PORT || 3000;

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

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});

/*
==================================================
              صناع المحتوى
==================================================
*/

const creators = {

    Respect: [
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
                 دوال القوائم
==================================================
*/

function getTeam(team) {
    return creators[team] || [];
}

function getAllCreators() {
    const all = [];

    for (const team of Object.keys(creators)) {
        for (const creator of creators[team]) {
            all.push({
                team,
                ...creator
            });
        }
    }

    return all;
}

/*
==================================================
                 أوامر البوت
==================================================
*/

bot.onText(/^\/start$/, async (msg) => {

    await bot.sendMessage(
        msg.chat.id,
        `
🔥 أهلاً بك في Drex22 Bot

📋 الأوامر:

/creators - جميع صناع المحتوى
/respect - Respect
/mt - MT Life
/falcons - Falcons
/powr - POWR
/status - حالة البوت

🟢 مراقبة Kick مفعلة.
`
    );
});

async function sendCreators(chatId, team) {

    const list = getTeam(team);

    if (!list.length) {
        return bot.sendMessage(
            chatId,
            `❌ لا توجد قائمة مضافة لفريق ${team} حاليًا.`
        );
    }

    let text = `🔥 ${team}\n\n`;

    for (const creator of list) {

        text += `👤 ${creator.name}\n`;

        if (creator.kick) {
            text += `🟢 Kick: https://kick.com/${creator.kick}\n`;
        }

        text += "\n";
    }

    await bot.sendMessage(chatId, text, {
        disable_web_page_preview: true
    });
}

bot.onText(/^\/respect$/, (msg) => {
    sendCreators(msg.chat.id, "Respect");
});

bot.onText(/^\/mt$/, (msg) => {
    sendCreators(msg.chat.id, "MT");
});

bot.onText(/^\/falcons$/, (msg) => {
    sendCreators(msg.chat.id, "Falcons");
});

bot.onText(/^\/powr$/, (msg) => {
    sendCreators(msg.chat.id, "POWR");
});

bot.onText(/^\/creators$/, async (msg) => {

    const all = getAllCreators();

    let text = "🔥 جميع صناع المحتوى\n\n";

    for (const creator of all) {

        text += `🏷️ ${creator.team}\n`;
        text += `👤 ${creator.name}\n`;

        if (creator.kick) {
            text += `🟢 Kick: https://kick.com/${creator.kick}\n`;
        }

        text += "\n";
    }

    await bot.sendMessage(msg.chat.id, text, {
        disable_web_page_preview: true
    });
});

bot.onText(/^\/status$/, async (msg) => {

    await bot.sendMessage(
        msg.chat.id,
        "✅ البوت شغال ومراقبة Kick مفعلة."
    );
});

/*
==================================================
                 KICK API
==================================================
*/

let kickAccessToken = null;
let tokenExpiresAt = 0;

async function getKickToken() {

    if (
        kickAccessToken &&
        Date.now() < tokenExpiresAt - 60000
    ) {
        return kickAccessToken;
    }

    const body = new URLSearchParams();

    body.append("grant_type", "client_credentials");
    body.append("client_id", KICK_CLIENT_ID);
    body.append("client_secret", KICK_CLIENT_SECRET);

    const response = await fetch(
        "https://id.kick.com/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },
            body
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Kick token error ${response.status}: ${errorText}`
        );
    }

    const data = await response.json();

    kickAccessToken = data.access_token;

    tokenExpiresAt =
        Date.now() +
        ((data.expires_in || 3600) * 1000);

    console.log("✅ Kick access token obtained");

    return kickAccessToken;
}

/*
==================================================
        جلب معلومات قنوات Kick
==================================================
*/

async function getKickChannels(slugs) {

    const token = await getKickToken();

    const params = new URLSearchParams();

    for (const slug of slugs) {
        params.append("slug", slug);
    }

    const response = await fetch(
        `https://api.kick.com/public/v1/channels?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `Kick channels error ${response.status}: ${text}`
        );
    }

    return await response.json();
}

/*
==================================================
       جلب البثوث المباشرة
==================================================
*/

async function getLiveStreams(userIds) {

    if (!userIds.length) {
        return [];
    }

    const token = await getKickToken();

    const params = new URLSearchParams();

    for (const id of userIds) {
        params.append(
            "broadcaster_user_id",
            String(id)
        );
    }

    const response = await fetch(
        `https://api.kick.com/public/v1/livestreams?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `Kick livestream error ${response.status}: ${text}`
        );
    }

    const data = await response.json();

    return data.data || [];
}

/*
==================================================
             حالة البث السابقة
==================================================
*/

const liveState = new Map();

/*
==================================================
              إرسال تنبيه البث
==================================================
*/

async function sendLiveNotification(creator, stream) {

    const title =
        stream.title ||
        "بث مباشر";

    const category =
        stream.category?.name ||
        "غير محدد";

    const viewerCount =
        stream.viewer_count ??
        stream.viewerCount ??
        0;

    const thumbnail =
        stream.thumbnail ||
        stream.thumbnail_url ||
        stream.thumbnailUrl ||
        null;

    const slug =
        creator.kick;

    const text = `
🔴 <b>${creator.name} بدأ بث مباشر!</b>

🎬 <b>العنوان:</b> ${title}

🎮 <b>التصنيف:</b> ${category}

👥 <b>المشاهدون:</b> ${viewerCount}

🟢 <b>Kick:</b>
https://kick.com/${slug}
`;

    try {

        if (thumbnail) {

            await bot.sendPhoto(
                CHANNEL_ID,
                thumbnail,
                {
                    caption: text,
                    parse_mode: "HTML"
                }
            );

        } else {

            await bot.sendMessage(
                CHANNEL_ID,
                text,
                {
                    parse_mode: "HTML",
                    disable_web_page_preview: false
                }
            );
        }

        console.log(
            `📢 تم إرسال تنبيه ${creator.name}`
        );

    } catch (error) {

        console.error(
            `❌ فشل إرسال تنبيه ${creator.name}:`,
            error.message
        );
    }
}

/*
==================================================
             مراقبة Kick
==================================================
*/

async function checkKick() {

    try {

        const allCreators = getAllCreators();

        const kickCreators =
            allCreators.filter(
                creator => creator.kick
            );

        if (!kickCreators.length) {
            console.log("⚠️ لا توجد حسابات Kick للمراقبة");
            return;
        }

        /*
        نطلب معلومات القنوات على دفعات
        */

        const slugs =
            kickCreators.map(
                creator => creator.kick
            );

        const channelsResponse =
            await getKickChannels(slugs);

        const channels =
            channelsResponse.data || [];

        if (!channels.length) {
            console.log("ℹ️ لم يتم العثور على قنوات Kick");
            return;
        }

        const userIds =
            channels
                .map(channel =>
                    channel.user_id ??
                    channel.broadcaster_user_id ??
                    channel.user?.id
                )
                .filter(Boolean);

        const streams =
            await getLiveStreams(userIds);

        const liveByUser =
            new Map();

        for (const stream of streams) {

            const userId =
                stream.broadcaster_user_id ??
                stream.broadcaster?.user_id ??
                stream.channel?.user_id;

            if (userId) {
                liveByUser.set(
                    String(userId),
                    stream
                );
            }
        }

        for (const creator of kickCreators) {

            const channel =
                channels.find(channel => {

                    const slug =
                        String(
                            channel.slug ||
                            channel.username ||
                            channel.user?.username ||
                            ""
                        ).toLowerCase();

                    return slug ===
                        creator.kick.toLowerCase();

                });

            if (!channel) {
                continue;
            }

            const userId =
                channel.user_id ??
                channel.broadcaster_user_id ??
                channel.user?.id;

            if (!userId) {
                continue;
            }

            const stream =
                liveByUser.get(
                    String(userId)
                );

            const currentlyLive =
                Boolean(stream);

            const wasLive =
                liveState.get(
                    creator.kick
                ) || false;

            /*
            أول مرة نكتشف أنه مباشر:
            نرسل التنبيه.
            */

            if (currentlyLive && !wasLive) {

                await sendLiveNotification(
                    creator,
                    stream
                );
            }

            liveState.set(
                creator.kick,
                currentlyLive
            );
        }

        console.log(
            `🔎 Kick check completed | ${new Date().toISOString()}`
        );

    } catch (error) {

        console.error(
            "❌ Kick monitoring error:",
            error.message
        );
    }
}

/*
==================================================
          فحص Kick كل دقيقة
==================================================
*/

setInterval(
    checkKick,
    60 * 1000
);

/*
تشغيل أول فحص بعد 10 ثوانٍ
*/

setTimeout(
    checkKick,
    10 * 1000
);

/*
==================================================
                Render Server
==================================================
*/

const app = express();

app.get("/", (req, res) => {
    res.status(200).send(
        "Drex22 Bot is online ✅"
    );
});

app.get("/health", (req, res) => {

    res.status(200).json({
        status: "online",
        kickMonitoring: true,
        youtube: false
    });
});

app.listen(PORT, () => {

    console.log(
        `🌐 Web server running on port ${PORT}`
    );
});

/*
==================================================
                    أخطاء
==================================================
*/

bot.on("polling_error", error => {

    console.error(
        "❌ Telegram Polling Error:",
        error.message
    );
});

process.on(
    "unhandledRejection",
    error => {
        console.error(
            "❌ Unhandled Rejection:",
            error
        );
    }
);

process.on(
    "uncaughtException",
    error => {
        console.error(
            "❌ Uncaught Exception:",
            error
        );
    }
);

console.log("=================================");
console.log("✅ Drex22 Bot started");
console.log("🟢 Kick monitoring: ON");
console.log("📺 YouTube: OFF");
console.log("🖼️ Live thumbnail alerts: ON");
console.log("=================================");
