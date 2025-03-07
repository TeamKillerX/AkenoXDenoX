import { Bot, InlineKeyboard } from "grammy";
import { autoRetry } from "@grammyjs/auto-retry";
import { BOT_TOKEN, CHAT_IDS } from "../config.ts";
import { ChatGptResponse } from "./chatgpt.ts";
import { ButtonUrl } from "./helper/helper_button.ts";
import { DbStartInBot } from "./database/database.ts";
import { get_me } from "./helper/helper_updates.ts";
import { verifyUser } from "./helper/helper_chat.ts";

import {
   AdminBannedUser,
   AdminUnbanndUser,
   AdminKIckUser,
   AdminMuteUser,
  } from "./admins.ts";

const bot = new Bot(BOT_TOKEN);

bot.api.config.use(autoRetry({
  maxRetryAttempts: 10,
  maxDelaySeconds: 3,
}));

bot.command("start", async (ctx) => {
  const reply_markup = ButtonUrl("Developer", "https://t.me/xpushz");
  const me = await get_me(ctx)
  await ctx.reply(`Hello! I am ${me.first_name}`, { reply_markup });
  await DbStartInBot(Number(ctx.from?.id ?? 0 ));
});

bot.command("check", async (ctx) => {
  const userId = ctx.message?.reply_to_message?.from?.id ?? null;
  if (!userId) return ctx.reply("Reply to a user to check.");

  const user = await verifyUser(ctx, userId);
  if (user) {
      await ctx.reply(`User verified: ${user.first_name} and ${user.id}`);
  } else {
      await ctx.reply("User not found.");
  }
});

// custom command
bot.command("ask", ChatGptResponse);

// admin
bot.command("ban", AdminBannedUser);
bot.command("kick", AdminKIckUser);
bot.command("unban", AdminUnbanndUser);
bot.command("mute", AdminMuteUser);

// callback data
bot.callbackQuery(/^unban:(\d+)$/, async (ctx) => {
  const match = ctx.match;
  if (!match) return;

  const userId = Number(match[1]);
  const chatId = ctx.chat?.id;

  if (!chatId) {
      return await ctx.answerCallbackQuery({
        text: "This action can only be used in a group.",
        show_alert: true
      });
  }
  try {
      await ctx.api.unbanChatMember(chatId, userId);
      await ctx.answerCallbackQuery({
        text: "User has been unbanned.",
        show_alert: true
      });
      if (ctx.callbackQuery.message && ctx.chat) {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
      }
  } catch (error) {
      console.error("Failed to unban user:", error);
      await ctx.answerCallbackQuery("Failed to unban user.");
  }
});

bot.callbackQuery(/^unmute:(\d+)$/, async (ctx) => {
  const match = ctx.match;
  if (!match) return;

  const userId = Number(match[1]);
  const chatId = ctx.chat?.id;

  if (!chatId) {
      return await ctx.answerCallbackQuery({
        text: "This action can only be used in a group.",
        show_alert: true
      });
  }
  try {
    await ctx.api.restrictChatMember(chatId, userId, {
      can_send_messages: true,
      can_send_other_messages: true,
      can_add_web_page_previews: true
    });
    await ctx.answerCallbackQuery({
        text: "User has been unmuted.",
        show_alert: true
      });
      if (ctx.callbackQuery.message && ctx.chat) {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
      }
  } catch (error) {
      console.error("Failed to unmuted user:", error);
      await ctx.answerCallbackQuery("Failed to unmuted user.");
  }
});

bot.catch((err) => {
  console.error("Error:", err);
});

export { bot };
