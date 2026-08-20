const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

/* =========================
   ENV
========================= */

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

/* =========================
   TELEGRAM
========================= */

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});

/* =========================
   SERVER
========================= */

const app = express();

app.get("/", (req, res) => {
    res.send("DREX STREAM BOT is running ✅");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        bot: "DREX STREAM BOT"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

/* =========================
   CREATORS
========================= */

const CREATORS = {

    Respect: [
        { name: "DREX_7A", kick: "drex-7a" },
        { name: "OGxHusni", kick: "ogxhusni" },
        { name: "NEFOXD", kick: "nefoxd" },
        { name: "Waakd", kick: "waakd" },
        { name: "Al_Hashidi", kick: "al_hashidi" },
        { name: "ALPHAA27", kick: "alphaa27" },
        { name: "ALRND", kick: "alrnd" },
        { name: "bobshayb", kick: "bobshayb" },
        { name: "Drb7h", kick: "drb7h" },
        { name: "F1aisal", kick: "f1aisal" },
        { name: "Fhlwy", kick: "fhlwy" },
        { name: "Graficsaw", kick: "graficsaw" },
        { name: "Hook", kick: "hook" },
        { name: "iC4C", kick: "ic4c" },
        { name: "ID7O", kick: "id7o" },
        { name: "iiMaD", kick: null },
        { name: "iMonkey_D", kick: "imonkey_d" },
        { name: "iSLF", kick: "islf" },
        { name: "lHAJAR", kick: "lhajar" },
        { name: "Mohsen_18", kick: "mohsen_18" },
        { name: "moustache", kick: null },
        { name: "Musab", kick: "musab" },
        { name: "NASSER", kick: "nasser" },
        { name: "OKB8", kick: "okb8" },
        { name: "omar_enjoy", kick: "omar_enjoy" },
        { name: "Peerless", kick: "peerless" },
        { name: "RAYAN_A3", kick: "rayan_a3" },
        { name: "RAYN", kick: "rayn" },
        { name: "S5B", kick: "s5b" },
        { name: "Seagull", kick: "seagull" },
        { name: "SENSEI_09", kick: "sensei-09" },
        { name: "TAF86", kick: "taf86" },
        { name: "Vilwo", kick: "vilwo" },
        { name: "w1pey", kick: "w1pey" },
        { name: "wef0", kick: "wef0" },
        { name: "wolf", kick: "wolf" }
    ],

    MT: [],

    Falcons: [
        { name: "BO3OMAR22", kick: null },
        { name: "BanderitaX", kick: null },
        { name: "FZX", kick: null },
        { name: "LLE", kick: null },
        { name: "SaudCast", kick: null },
        { name: "RAED", kick: null },
        { name: "xSMA333", kick: null },
        { name: "Aziz", kick: null },
        { name: "Drb7h", kick: null },
        { name: "Abu Abeer", kick: null },
        { name: "oPiiLz", kick: null },
        { name: "3ADEL", kick: null },
        { name: "Mohammed Oden", kick: null }
    ],

    POWR: [
        { name: "Shongxbong", kick: null },
        { name: "Abu Nooh", kick: null },
        { name: "Mjrm Games", kick: null },
        { name: "FFearFFul", kick: null },
        { name: "D7oomy999", kick: null },
        { name: "Abu Khalil", kick: null },
        { name: "Klooode25", kick: null },
        { name: "MrFifa", kick: null },
        { name: "Abu 3abd", kick: null },
        { name: "Moskoo", kick: null },
        { name: "AbuSwe7l", kick: null },
        { name: "YZNSA", kick: null }
    ],

    ArabKick: [

        { name: "absi", kick: "absi" },
        { name: "sxb", kick: "sxb" },
        { name: "3mr", kick: "3mr" },
        { name: "3li_boltx", kick: "3li_boltx" },
        { name: "odayyouyou", kick: "odayyouyou" },
        { name: "hoova88", kick: "hoova88" },
        { name: "mansourko", kick: "mansourko" },
        { name: "bigbossff", kick: "bigbossff" },
        { name: "ii2a", kick: "ii2a" },
        { name: "bashaiq1", kick: "bashaiq1" },
        { name: "majah92", kick: "majah92" },
        { name: "gooba_off", kick: "gooba_off" },
        { name: "tmsahff", kick: "tmsahff" },
        { name: "klash", kick: "klash" },
        { name: "zemb99", kick: "zemb99" },
        { name: "sehamx", kick: "sehamx" },
        { name: "kartona", kick: "kartona" },
        { name: "S_AM1", kick: "s_am1" },
        { name: "Nxv7", kick: "nxv7" },
        { name: "Saad", kick: "saad" },
        { name: "NAHAR_KW", kick: "nahar-kw" },
        { name: "iAS18", kick: "ias18" },
        { name: "BIGJOE_TV", kick: "bigjoe_tv" },
        { name: "NaderHD", kick: "naderhd" },
        { name: "ostv9", kick: "ostv9" },
        { name: "kb_ttv6", kick: "kb-ttv6" },
        { name: "Sa3dola", kick: "sa3dola" },
        { name: "L3viGamer", kick: "L3viGamer" },
        { name: "xshryan", kick: "xshryan" },
        { name: "mwalid07", kick: "mwalid07" },
        { name: "SAUDK10", kick: "saudk10" },
        { name: "sa7rawiyt", kick: "sa7rawiyt" },

        { name: "raoufbelkacemi", kick: "raoufbelkacemi" },
        { name: "maherco", kick: "maherco" },
        { name: "fwaz", kick: "fwaz" },
        { name: "abuswe7l", kick: "abuswe7l" },
        { name: "mustafa_go", kick: "mustafa_go" },
        { name: "alkrky99", kick: "alkrky99" },
        { name: "beroiq", kick: "beroiq" },
        { name: "firas", kick: "firas" },
        { name: "ogabdullah", kick: "ogabdullah" },
        { name: "abdulrhman", kick: "abdulrhman" },

        { name: "milslem1", kick: "milslem1" },
        { name: "IHxHI", kick: "IHxHI" },
        { name: "malikos038", kick: "malikos038" },
        { name: "Z_z3tr", kick: "Z_z3tr" },
        { name: "Psn_Hakoom", kick: "Psn_Hakoom" },
        { name: "Rick_702", kick: "Rick_702" },
        { name: "skabuddyy", kick: "skabuddyy" },
        { name: "aminekickh", kick: "aminekickh" },
        { name: "7qu10", kick: "7qu10" },
        { name: "Q8_OuTLaWz", kick: "Q8_OuTLaWz" },
        { name: "ABO_NG", kick: "ABO_NG" },
        { name: "kok10", kick: "kok10" },
        { name: "ssfgaming", kick: "ssfgaming" },
        { name: "Rkuoz", kick: "Rkuoz" },
        { name: "KANFN", kick: "KANFN" },
        { name: "c2j6", kick: "c2j6" },
        { name: "Rami7r", kick: "Rami7r" },
        { name: "abdullahepic", kick: "abdullahepic" },
        { name: "JustSehl", kick: "JustSehl" },
        { name: "normal80", kick: "normal80" },
        { name: "F0XER", kick: "F0XER" },
        { name: "Ahmedmkk", kick: "Ahmedmkk" },
        { name: "sanovr", kick: "sanovr" },
        { name: "aboturki", kick: "aboturki" },
        { name: "ProfessorQ8", kick: "ProfessorQ8" },
        { name: "RTG_VENOM", kick: "RTG_VENOM" },
        { name: "XFOR_GAMER", kick: "XFOR_GAMER" },
        { name: "RSTO122", kick: "RSTO122" },
        { name: "AbdMehdi", kick: "AbdMehdi" },
        { name: "Albasrawi", kick: "Albasrawi" },
        { name: "FHD_01", kick: "FHD_01" },
        { name: "i_ZERO_i", kick: "i_ZERO_i" },
        { name: "ramizalabdullah", kick: "ramizalabdullah" },
        { name: "Budh", kick: "Budh" },
        { name: "jaafarGM", kick: "jaafarGM" },
        { name: "Agapios", kick: "Agapios" },
        { name: "C41S", kick: "C41S" },
        { name: "GOGOLIVE", kick: "GOGOLIVE" },
        { name: "Edrs", kick: "Edrs" },
        { name: "sddfn", kick: "sddfn" },
        { name: "casper002", kick: "casper002" },
        { name: "Drk07", kick: "Drk07" },
        { name: "Ghaithh", kick: "Ghaithh" },
        { name: "Pesawigaming", kick: "Pesawigaming" },
        { name: "Ali_II42", kick: "Ali_II42" },
        { name: "xYaser111x", kick: "xYaser111x" },
        { name: "QuadroSquad", kick: "QuadroSquad" },

        { name: "Gaming_Souhail", kick: "Gaming_Souhail" },
        { name: "ojaymaw", kick: "ojaymaw" },
        { name: "OMAR44Q", kick: "OMAR44Q" },
        { name: "kangakon", kick: "kangakon" },
        { name: "GAMER_o3", kick: "GAMER_o3" },
        { name: "Elshakoumy", kick: "Elshakoumy" },
        { name: "MINATOO9", kick: "MINATOO9" },
        { name: "the_admiral", kick: "the_admiral" },
        { name: "SOFLLER", kick: "SOFLLER" },
        { name: "Cyber7X", kick: "Cyber7X" },
        { name: "Hicham_Panda", kick: "Hicham_Panda" },

        { name: "Parker_Seifddine", kick: "Parker_Seifddine" },
        { name: "Amoury22", kick: "Amoury22" },
        { name: "N4IFCO", kick: "N4IFCO" },
        { name: "saudalk", kick: "saudalk" },
        { name: "Abunoo7", kick: "Abunoo7" },
        { name: "ab-arab", kick: "ab-arab" }
    ]
};

/* =========================
   BUILD CREATOR LIST
========================= */

const creators = [];

for (const team of Object.keys(CREATORS)) {

    for (const creator of CREATORS[team]) {

        if (!creator.kick) {
            continue;
        }

        creators.push({
            ...creator,
            team
        });
    }
}

/* =========================
   REMOVE DUPLICATES
========================= */

const uniqueCreators = [];
const seen = new Set();

for (const creator of creators) {

    const key =
        creator.kick.toLowerCase();

    if (seen.has(key)) {
        continue;
    }

    seen.add(key);
    uniqueCreators.push(creator);
}

/* =========================
   STATE
========================= */

const liveState = new Map();
const postedStreams = new Map();

let kickAccessToken = null;
let kickTokenExpiresAt = 0;
let monitoring = false;

/*
  الحسابات التي شاهدناها
  عند تشغيل البوت لأول مرة.
*/

const firstSeen = new Set();

/* =========================
   KICK TOKEN
========================= */

async function getKickToken() {

    if (
        kickAccessToken &&
        Date.now() < kickTokenExpiresAt
    ) {
        return kickAccessToken;
    }

    const response =
        await fetch(
            "https://id.kick.com/oauth/token",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    new URLSearchParams({
                        grant_type:
                            "client_credentials",

                        client_id:
                            KICK_CLIENT_ID,

                        client_secret:
                            KICK_CLIENT_SECRET
                    })
            }
        );

    if (!response.ok) {

        const text =
            await response.text();

        throw new Error(
            `Kick OAuth ${response.status}: ${text}`
        );
    }

    const data =
        await response.json();

    kickAccessToken =
        data.access_token;

    kickTokenExpiresAt =
        Date.now() +
        ((data.expires_in || 3600) - 60) *
        1000;

    console.log(
        "🔑 Kick token obtained"
    );

    return kickAccessToken;
}

/* =========================
   KICK API
========================= */

async function kickRequest(url) {

    const token =
        await getKickToken();

    const response =
        await fetch(
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

/* =========================
   CHECK STREAM
========================= */

async function checkKick(creator) {

    const slug =
        encodeURIComponent(
            creator.kick
        );

    const data =
        await kickRequest(
            `https://api.kick.com/public/v1/channels?slug=${slug}`
        );

    const channel =
        Array.isArray(data.data)
            ? data.data[0]
            : data.data;

    if (!channel) {
        return null;
    }

    if (channel.is_live !== true) {
        return null;
    }

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

/* =========================
   SEND TELEGRAM
========================= */

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
                parse_mode:
                    "Markdown",

                disable_web_page_preview:
                    false
            }
        );

        console.log(
            `📢 تم النشر: ${creator.name}`
        );

        return true;

    } catch (error) {

        console.error(
            `❌ Telegram: ${error.message}`
        );

        return false;
    }
}

/* =========================
   MONITOR
========================= */

async function monitorCreators() {

    if (monitoring) {
        return;
    }

    monitoring = true;

    try {

        console.log(
            `🔎 فحص ${uniqueCreators.length} حساب...`
        );

        for (
            const creator
            of uniqueCreators
        ) {

            const key =
                creator.kick.toLowerCase();

            try {

                const stream =
                    await checkKick(
                        creator
                    );

                /*
                  OFFLINE
                */

                if (!stream) {

                    liveState.set(
                        key,
                        false
                    );

                    continue;
                }

                /*
                  LIVE
                */

                const streamId =
                    String(stream.id);

                const wasLive =
                    liveState.get(key) === true;

                /*
                  أول مرة نشوف الحساب
                */

                if (!firstSeen.has(key)) {

                    firstSeen.add(key);

                    liveState.set(
                        key,
                        true
                    );

                    console.log(
                        `👀 ${creator.name} LIVE عند بدء التشغيل — تم تجاهله`
                    );

                    continue;
                }

                /*
                  نفس البث
                */

                if (
                    wasLive &&
                    postedStreams.get(key) ===
                    streamId
                ) {

                    continue;
                }

                /*
                  بث جديد
                */

                if (!wasLive) {

                    if (
                        postedStreams.get(key) ===
                        streamId
                    ) {

                        liveState.set(
                            key,
                            true
                        );

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
                }

                liveState.set(
                    key,
                    true
                );

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

/* =========================
   START
========================= */

bot.onText(
    /^\/start$/,
    async msg => {

        await bot.sendMessage(
            msg.chat.id,

`🤖 DREX STREAM BOT

🟢 البوت يعمل

⭐ DREX_7A = الأولوية #1

📡 Kick فقط
📢 تنبيهات البث مفعلة

👥 الحسابات:
${uniqueCreators.length}

/status
/creators`
        );
    }
);

/* =========================
   STATUS
========================= */

bot.onText(
    /^\/status$/,
    async msg => {

        let text =
            "📡 حالة البث:\n\n";

        for (
            const creator
            of uniqueCreators
        ) {

            const live =
                liveState.get(
                    creator.kick.toLowerCase()
                );

            text +=
                `${live ? "🔴" : "⚫"} ${creator.name}\n`;
        }

        await bot.sendMessage(
            msg.chat.id,
            text
        );
    }
);

/* =========================
   CREATORS
========================= */

bot.onText(
    /^\/creators$/,
    async msg => {

        let text =
            "📋 حسابات المراقبة:\n\n";

        for (
            const team
            of Object.keys(CREATORS)
        ) {

            text +=
                `🏷️ ${team}\n`;

            for (
                const creator
                of CREATORS[team]
            ) {

                if (!creator.kick) {
                    continue;
                }

                text +=
                    `• ${creator.name} — @${creator.kick}\n`;
            }

            text += "\n";
        }

        /*
          Telegram عنده حد لطول الرسالة.
          نقسم القائمة إذا كانت طويلة.
        */

        const MAX =
            4000;

        for (
            let i = 0;
            i < text.length;
            i += MAX
        ) {

            await bot.sendMessage(
                msg.chat.id,
                text.substring(
                    i,
                    i + MAX
                )
            );
        }
    }
);

/* =========================
   TELEGRAM ERRORS
========================= */

bot.on(
    "polling_error",
    error => {

        console.error(
            "❌ Telegram polling:",
            error.message
        );
    }
);

/* =========================
   PROCESS ERRORS
========================= */

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

/* =========================
   START BOT
========================= */

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
    `👥 Unique Kick accounts: ${uniqueCreators.length}`
);

console.log(
    "📡 Kick monitor: ON"
);

console.log(
    "📢 Telegram alerts: ON"
);

console.log(
    "🎥 YouTube: OFF"
);

console.log(
    "================================"
);

/*
  الفحص الأول
*/

monitorCreators();

/*
  الفحص الدوري
*/

setInterval(
    monitorCreators,
    CHECK_INTERVAL
);
