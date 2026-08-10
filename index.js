const TelegramBot = require("node-telegram-bot-api");
const Parser = require("rss-parser");
const cron = require("node-cron");
const express = require("express");

const token = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID || "";
const PORT = process.env.PORT || 3000;

if (!token) {
    console.error("❌ BOT_TOKEN غير موجود في Environment Variables");
    process.exit(1);
}

const bot = new TelegramBot(token, {
    polling: true
});

const parser = new Parser();

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
              أدوات القوائم
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

function sendCreators(chatId, team) {

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

        if (creator.youtube) {
            text += `▶️ YouTube: https://youtube.com/@${creator.youtube}\n`;
        }

        if (creator.kick) {
            text += `🟢 Kick: https://kick.com/${creator.kick}\n`;
        }

        text += "\n";
    }

    bot.sendMessage(chatId, text, {
        disable_web_page_preview: true
    });
}

/*
==================================================
                  START
==================================================
*/

bot.onText(/^\/start$/, (msg) => {

    const message = `
🔥 أهلاً بك في Drex22_bot

📋 الأوامر:

/creators - جميع صناع المحتوى
/respect - Respect
/mt - MT Life
/falcons - Falcons
/powr - POWR

📺 يتم عرض روابط YouTube و Kick المتوفرة.
`;

    bot.sendMessage(msg.chat.id, message);
});

/*
==================================================
             جميع صناع المحتوى
==================================================
*/

bot.onText(/^\/creators$/, (msg) => {

    const all = getAllCreators();

    let text = "🔥 جميع صناع المحتوى\n\n";

    for (const creator of all) {

        text += `🏷️ ${creator.team}\n`;
        text += `👤 ${creator.name}\n`;

        if (creator.youtube) {
            text += `▶️ YouTube: https://youtube.com/@${creator.youtube}\n`;
        }

        if (creator.kick) {
            text += `🟢 Kick: https://kick.com/${creator.kick}\n`;
        }

        text += "\n";
    }

    bot.sendMessage(msg.chat.id, text, {
        disable_web_page_preview: true
    });
});

/*
==================================================
                  الأوامر
==================================================
*/

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

/*
==================================================
              YouTube Auto Post
==================================================
*/

const youtubeChannels = [
    {
        name: "NEFOXD",
        username: "NEFOXDRT"
    },
    {
        name: "F1aisal",
        username: "F1aisalRT"
    },
    {
        name: "iMonkey_D",
        username: "imonkey_d"
    },
    {
        name: "S5B",
        username: "S5B_Q"
    }
];

const sentVideos = new Set();

async function checkYouTube() {

    if (!CHANNEL_ID) {
        return;
    }

    for (const channel of youtubeChannels) {

        try {

            const feed = await parser.parseURL(
                `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.username}`
            );

            if (!feed.items || !feed.items.length) {
                continue;
            }

            const video = feed.items[0];

            if (sentVideos.has(video.id)) {
                continue;
            }

            sentVideos.add(video.id);

            const message = `
🎬 فيديو جديد!

👤 ${channel.name}

📺 ${video.title}

🔗 ${video.link}
`;

            await bot.sendMessage(
                CHANNEL_ID,
                message,
                {
                    disable_web_page_preview: false
                }
            );

        } catch (error) {

            console.error(
                `YouTube Error - ${channel.name}:`,
                error.message
            );
        }
    }
}

/*
==================================================
       فحص YouTube كل 5 دقائق
==================================================
*/

cron.schedule("*/5 * * * *", () => {
    checkYouTube();
});

/*
==================================================
              Render Web Server
==================================================
*/

const app = express();

app.get("/", (req, res) => {
    res.send("Drex22_bot is online ✅");
});

app.get("/health", (req, res) => {
    res.json({
        status: "online",
        bot: "Drex22_bot"
    });
});

app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

/*
==================================================
                  أخطاء
==================================================
*/

bot.on("polling_error", (error) => {
    console.error("❌ Polling Error:", error.message);
});

process.on("unhandledRejection", (error) => {
    console.error("❌ Unhandled Rejection:", error);
});

console.log("✅ Drex22_bot يعمل الآن!");
