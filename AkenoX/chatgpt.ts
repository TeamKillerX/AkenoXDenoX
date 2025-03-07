/* # -*- coding: utf-8 -*-
# Credits @xpushz on telegram
# Copyright 2020-2025 (c) Randy W @xtdevs, @xtsea on telegram
#
# from : https://github.com/TeamKillerX
# Channel : @RendyProjects
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

 */

import { akenox_gpt } from "../scraper.ts";
import { ChatType } from "./helper/helper_chat.ts";
import { CHAT_IDS } from "../config.ts";

export async function ChatGptResponse(ctx:any): Promise<void> {
    if (ctx.message && ctx.message.text) {
        const prompt = ctx.message.text.replace("/ask", "").trim();

        if (await ChatType("private", ctx)) return;

        if (!CHAT_IDS.includes(ctx.chat?.id)) {
          await ctx.reply("Sorry, I can't help you here.", {
            reply_to_message_id: ctx.message?.message_id,
          });
          await ctx.leaveChat();
          return;
        }

        if (prompt) {
          try {
            const response = await akenox_gpt(prompt, ctx);
            const responseText = response.results
              .replace(/[_*[\]()~`>#+-=|{}.!]/g, "\\$&");

            await ctx.reply(responseText,{
              reply_to_message_id: ctx.message?.message_id,
              parse_mode: "MarkdownV2"
            });
          } catch (error) {
            console.error("API error:", error);
            await ctx.reply("Error getting response from API.", {
              reply_to_message_id: ctx.message?.message_id,
            });
          }
        } else {
          await ctx.reply("Please provide a prompt to generate a response.", {
            reply_to_message_id: ctx.message?.message_id,
          });
        }
      } else {
        await ctx.reply("Please provide a prompt to generate a response.", {
          reply_to_message_id: ctx.message?.message_id,
        });
    }
};
