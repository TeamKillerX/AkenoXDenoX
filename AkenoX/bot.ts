import { Bot, InlineKeyboard } from "grammy";
import { autoRetry } from "@grammyjs/auto-retry";
import { BOT_TOKEN, CHAT_IDS } from "../config.ts";
import { ChatGptResponse } from "./chatgpt.ts";
import { ButtonUrl } from "./helper/helper_button.ts"; 
import { DbStartInBot } from "./database/database.ts";
import { get_me } from "./helper/helper_updates.ts";


const bot = new Bot(BOT_TOKEN);

bot.api.config.use(autoRetry());

bot.command("start", async (ctx) => {
  const reply_markup = ButtonUrl("Developer", "https://t.me/xpushz");
  const me = await get_me(ctx)
  await ctx.reply(`Hello! I am ${me.first_name}`, { reply_markup });
  await DbStartInBot(Number(ctx.from?.id ?? 0 ));
});

bot.command("ask", ChatGptResponse);

bot.catch((err) => {
  console.error("Error:", err);
});

export { bot };