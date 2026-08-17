const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// ==================================================
// ENVIRONMENT VARIABLES
// ==================================================

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const KICK_CLIENT_ID = process.env.KICK_CLIENT_ID;
const KICK_CLIENT_SECRET = process.env.KICK_CLIENT_SECRET;

const PORT = process.env.PORT || 10000;

// ==================================================
// CHECK ENV
// ==================================================

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN غير موجود");
  process.exit(1);
}

if (!CHANNEL_ID) {
  console.error("❌ CHANNEL_ID غير موجود");
  process.exit(1);
}

if (!KICK_CLIENT_ID) {
  console.error("❌ KICK_CLIENT_ID غير موجود");
  process.exit(1);
}

if (!KICK_CLIENT_SECRET) {
  console.error("❌ KICK_CLIENT_SECRET غير موجود");
  process.exit(1);
}

// ==================================================
// EXPRESS - RENDER
// ==================================================

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Drex22Bot is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    bot: "Drex22Bot"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// ==================================================
// TELEGRAM
// ==================================================

let bot = null;

async function startTelegram() {
  try {
    console.log("🔄 Connecting to Telegram...");

    // اختبار التوكن قبل تشغيل polling
    const testBot = new TelegramBot(BOT_TOKEN, {
      polling: false
    });

    const me = await testBot.getMe();

    console.log(
      `✅ Telegram connected: @${me.username}`
    );

    bot = new TelegramBot(BOT_TOKEN, {
      polling: {
        interval: 1000,
        params: {
          timeout: 30
        }
      }
    });

    bot.on("polling_error", (error) => {
      console.error(
        "❌ Telegram polling:",
        error.message
      );

      if (
        error.response &&
        error.response.statusCode === 404
      ) {
        console.error(
          "⚠️ Telegram 404: تأكد من BOT_TOKEN في Render"
        );
      }
    });

    bot.on("error", (error) => {
      console.error(
        "❌ Telegram error:",
        error.message
      );
    });

    bot.onText(/^\/start$/, async (msg) => {
      try {
        await bot.sendMessage(
          msg.chat.id,
          "🤖 Drex22Bot\n\nالبوت يعمل بنجاح ✅"
        );
      } catch (error) {
        console.error(
          "❌ /start:",
          error.message
        );
      }
    });

    console.log(
      "🤖 Telegram polling started"
    );

  } catch (error) {
    console.error(
      "❌ Telegram connection failed"
    );

    if (error.response) {
      console.error(
        error.response.statusCode
      );

      console.error(
        error.response.body
      );
    } else {
      console.error(
        error.message
      );
    }
  }
}

// ==================================================
// KICK
// ==================================================

const KICK_API =
  "https://api.kick.com/public/v1";

const KICK_OAUTH =
  "https://id.kick.com/oauth/token";

let kickAccessToken = null;
let kickTokenExpiresAt = 0;

// ==================================================
// CREATORS
// ==================================================

const creators = [

  // ================================================
  // ⭐ الأولوية الأولى - Drex
  // ================================================

  {
    username: "Drexx7a",
    team: "Drex",
    priority: 1
  },

  // ================================================
  // 🟢 Respect
  // ================================================

  {
    username: "OGxHusni",
    team: "Respect",
    priority: 2
  },

  {
    username: "NEFOXD",
    team: "Respect",
    priority: 2
  },

  {
    username: "Waakd",
    team: "Respect",
    priority: 2
  },

  {
    username: "Al_Hashidi",
    team: "Respect",
    priority: 2
  },

  {
    username: "ALPHAA27",
    team: "Respect",
    priority: 2
  },

  {
    username: "ALRND",
    team: "Respect",
    priority: 2
  },

  {
    username: "bobshayb",
    team: "Respect",
    priority: 2
  },

  {
    username: "Drb7h",
    team: "Respect",
    priority: 2
  },

  {
    username: "F1aisal",
    team: "Respect",
    priority: 2
  },

  {
    username: "Fhlwy",
    team: "Respect",
    priority: 2
  },

  {
    username: "Graficsaw",
    team: "Respect",
    priority: 2
  },

  // ================================================
  // 🔵 Falcons
  // ================================================

  {
    username: "abu_abeer16",
    team: "Falcons",
    priority: 3
  },

  {
    username: "iFMG",
    team: "Falcons",
    priority: 3
  },

  // ================================================
  // 🟣 POWR
  // ================================================

  {
    username: "POWR7ilix",
    team: "POWR",
    priority: 4
  },

  {
    username: "powrEASY",
    team: "POWR",
    priority: 4
  },

  {
    username: "KLO25",
    team: "POWR",
    priority: 4
  },

  // ================================================
  // 🟠 MT
  // ================================================

  {
    username: "BinTalall",
    team: "MT",
    priority: 5
  },

  {
    username: "iMLKq",
    team: "MT",
    priority: 5
  },

  {
    username: "iim7f",
    team: "MT",
    priority: 5
  },

  {
    username: "iTAXR",
    team: "MT",
    priority: 5
  },

  {
    username: "7omah",
    team: "MT",
    priority: 5
  }
];

// ترتيب حسب الأولوية
creators.sort(
  (a, b) => a.priority - b.priority
);

// ==================================================
// LIVE STATUS
// ==================================================

const liveStatus = new Map();

// ==================================================
// KICK TOKEN
// ==================================================

async function getKickToken() {

  if (
    kickAccessToken &&
    Date.now() < kickTokenExpiresAt
  ) {
    return kickAccessToken;
  }

  try {

    console.log(
      "🔐 Getting Kick OAuth token..."
    );

    const response = await fetch(
      KICK_OAUTH,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: new URLSearchParams({
          grant_type:
            "client_credentials",

          client_id:
            KICK_CLIENT_ID,

          client_secret:
            KICK_CLIENT_SECRET
        })
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      console.error(
        "❌ Kick OAuth:",
        response.status,
        JSON.stringify(data)
      );

      return null;
    }

    kickAccessToken =
      data.access_token;

    const expires =
      Number(
        data.expires_in || 3600
      );

    kickTokenExpiresAt =
      Date.now() +
      (expires - 60) * 1000;

    console.log(
      "✅ Kick OAuth connected"
    );

    return kickAccessToken;

  } catch (error) {

    console.error(
      "❌ Kick OAuth error:",
      error.message
    );

    return null;
  }
}

// ==================================================
// GET KICK CHANNEL
// ==================================================

async function getKickChannel(username) {

  const token =
    await getKickToken();

  if (!token) {
    return null;
  }

  try {

    const url =
      `${KICK_API}/channels?slug=${encodeURIComponent(
        username
      )}`;

    const response =
      await fetch(
        url,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            Accept:
              "application/json"
          }
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      console.error(
        `❌ Kick ${username}:`,
        response.status,
        JSON.stringify(data)
      );

      return null;
    }

    if (
      !data.data ||
      !data.data.length
    ) {

      console.log(
        `⚠️ Kick account not found: ${username}`
      );

      return null;
    }

    return data.data[0];

  } catch (error) {

    console.error(
      `❌ Kick ${username}:`,
      error.message
    );

    return null;
  }
}

// ==================================================
// GET AVATAR
// ==================================================

function getAvatar(channel) {

  return (
    channel?.user?.profile_picture ||
    channel?.user?.profile_picture_url ||
    channel?.profile_picture ||
    channel?.profile_picture_url ||
    channel?.user?.avatar ||
    null
  );
}

// ==================================================
// GET STREAM DATA
// ==================================================

function getStreamData(channel) {

  const stream =
    channel?.stream || null;

  const title =
    channel?.stream_title ||
    stream?.title ||
    "بث مباشر";

  const category =
    channel?.category?.name ||
    stream?.category?.name ||
    "غير محدد";

  const viewers =
    stream?.viewer_count ??
    stream?.viewers ??
    channel?.viewer_count ??
    null;

  const isLive =
    channel?.is_live === true ||
    stream?.is_live === true ||
    !!stream;

  return {
    stream,
    title,
    category,
    viewers,
    isLive
  };
}

// ==================================================
// SEND LIVE MESSAGE
// ==================================================

async function sendLiveMessage(
  creator,
  channel
) {

  if (!bot) {

    console.error(
      "❌ Telegram bot غير متصل"
    );

    return;
  }

  const username =
    channel?.slug ||
    channel?.user?.username ||
    creator.username;

  const {
    title,
    category,
    viewers
  } =
    getStreamData(channel);

  const avatar =
    getAvatar(channel);

  let viewerText =
    "غير متاح";

  if (
    viewers !== null &&
    viewers !== undefined
  ) {
    viewerText =
      Number(viewers).toLocaleString("en-US");
  }

  const message =
`🔴 بث مباشر الآن

⭐ الفريق: ${creator.team}
👤 الستريمر: ${username}

🎮 التصنيف: ${category}
📝 العنوان: ${title}
👁️ المشاهدين: ${viewerText}

🔗 https://kick.com/${username}`;

  try {

    // ==============================================
    // إذا فيه صورة عرض
    // ==============================================

    if (avatar) {

      await bot.sendPhoto(
        CHANNEL_ID,
        avatar,
        {
          caption: message
        }
      );

    } else {

      await bot.sendMessage(
        CHANNEL_ID,
        message,
        {
          disable_web_page_preview: false
        }
      );
    }

    console.log(
      `📢 تم نشر بث ${username}`
    );

  } catch (error) {

    console.error(
      `❌ Telegram send ${username}:`,
      error.message
    );

    // إذا فشل إرسال الصورة، نرسل الرسالة بدون صورة
    if (avatar) {

      try {

        await bot.sendMessage(
          CHANNEL_ID,
          message,
          {
            disable_web_page_preview: false
          }
        );

        console.log(
          `📢 تم إرسال معلومات ${username} بدون صورة`
        );

      } catch (secondError) {

        console.error(
          "❌ Telegram fallback:",
          secondError.message
        );
      }
    }
  }
}

// ==================================================
// CHECK CREATOR
// ==================================================

async function checkCreator(
  creator
) {

  const channel =
    await getKickChannel(
      creator.username
    );

  if (!channel) {
    return;
  }

  const streamData =
    getStreamData(channel);

  const isLive =
    streamData.isLive;

  const key =
    creator.username.toLowerCase();

  const wasLive =
    liveStatus.get(key) || false;

  // ==============================================
  // بدأ بث جديد
  // ==============================================

  if (
    isLive &&
    !wasLive
  ) {

    liveStatus.set(
      key,
      true
    );

    console.log(
      `🔴 LIVE: ${creator.username} [${creator.team}]`
    );

    await sendLiveMessage(
      creator,
      channel
    );

    return;
  }

  // ==============================================
  // ما زال مباشر
  // ==============================================

  if (
    isLive &&
    wasLive
  ) {

    liveStatus.set(
      key,
      true
    );

    return;
  }

  // ==============================================
  // انتهى البث
  // ==============================================

  if (
    !isLive &&
    wasLive
  ) {

    liveStatus.set(
      key,
      false
    );

    console.log(
      `⚫ OFFLINE: ${creator.username}`
    );

    return;
  }

  liveStatus.set(
    key,
    false
  );
}

// ==================================================
// CHECK ALL CREATORS
// ==================================================

let checking = false;

async function checkAllCreators() {

  if (checking) {
    return;
  }

  checking = true;

  console.log(
    `🔎 Checking ${creators.length} Kick accounts...`
  );

  try {

    for (
      const creator
      of creators
    ) {

      await checkCreator(
        creator
      );

      // تأخير بسيط بين الحسابات
      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            500
          )
      );
    }

  } catch (error) {

    console.error(
      "❌ Monitor error:",
      error.message
    );

  } finally {

    checking = false;
  }
}

// ==================================================
// START
// ==================================================

(async () => {

  console.log(
    "================================"
  );

  console.log(
    "🚀 Drex22Bot Starting..."
  );

  console.log(
    "================================"
  );

  await startTelegram();

  // أول فحص
  await checkAllCreators();

  // فحص كل دقيقة
  setInterval(
    checkAllCreators,
    60 * 1000
  );

})();
