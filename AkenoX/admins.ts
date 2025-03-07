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

import { GrammyError } from "grammy";
import { ButtonText } from "./helper/helper_button.ts";

export async function AdminBannedUser(ctx: any) {
    const message = ctx.message;
    const chatId = message.chat.id;
    let targetId;
    if (message.reply_to_message) {
        targetId = message.reply_to_message.from.id;
    } else {
        const args = message.text.split(" ");
        if (args.length > 1) {
            targetId = parseInt(args[1], 10);
            if (isNaN(targetId)) {
                return ctx.reply("Invalid user ID.", {
                    reply_to_message_id: ctx.message?.message_id
                });
            }
        }
    }

    if (!targetId) {
        return ctx.reply("Reply to a message or provide a user ID to ban.", {
            reply_to_message_id: ctx.message?.message_id
        });
    }

    try {
        const reply_markup = ButtonText("Unban", `unban:${targetId}`);
        await ctx.api.banChatMember(chatId, targetId);
        await ctx.reply(`User ${targetId} has been banned.`, {
            reply_to_message_id: ctx.message?.message_id,
            reply_markup: reply_markup
        }
    );
    } catch (error) {
        if (error instanceof GrammyError) {
            console.error("Grammy API error:", error.message);
            await ctx.reply(`Failed to ban user: ${error.description}`, {
                reply_to_message_id: ctx.message?.message_id
            });
        } else {
            console.error("Unexpected error:", error);
            await ctx.reply("error banning the user.", {
                reply_to_message_id: ctx.message?.message_id
            });
        }
    }
}

export async function AdminUnbanndUser(ctx: any) {
    const message = ctx.message;
    const chatId = message.chat.id;
    let targetId;
    if (message.reply_to_message) {
        targetId = message.reply_to_message.from.id;
    } else {
        const args = message.text.split(" ");
        if (args.length > 1) {
            targetId = parseInt(args[1], 10);
            if (isNaN(targetId)) {
                return ctx.reply("Invalid user ID.", {
                    reply_to_message_id: ctx.message?.message_id
                });
            }
        }
    }

    if (!targetId) {
        return ctx.reply("Reply to a message or provide a user ID to ban.", {
            reply_to_message_id: ctx.message?.message_id
        });
    }

    try {
        await ctx.api.unbanChatMember(chatId, targetId);
        await ctx.reply(`User ${targetId} has been unbanned.`, {
            reply_to_message_id: ctx.message?.message_id
        }
    );
    } catch (error) {
        if (error instanceof GrammyError) {
            console.error("Grammy API error:", error.message);
            await ctx.reply(`Failed to ban user: ${error.description}`);
        } else {
            console.error("error:", error);
            await ctx.reply("error banning the user.");
        }
    }
}

export async function AdminKIckUser(ctx: any) {
    const message = ctx.message;
    const chatId = message.chat.id;
    let targetId;
    if (message.reply_to_message) {
        targetId = message.reply_to_message.from.id;
    } else {
        const args = message.text.split(" ");
        if (args.length > 1) {
            targetId = parseInt(args[1], 10);
            if (isNaN(targetId)) {
                return ctx.reply("Invalid user ID.");
            }
        }
    }

    if (!targetId) {
        return ctx.reply("Reply to a message or provide a user ID to ban.", {
            reply_to_message_id: ctx.message?.message_id
        });
    }

    try {
        await ctx.api.kickChatMember(chatId, targetId);
        await ctx.reply(`User ${targetId} has been kicked.`, {
            reply_to_message_id: ctx.message?.message_id
        }
    );
    } catch (error) {
        if (error instanceof GrammyError) {
            console.error("Grammy API error:", error.message);
            await ctx.reply(`Failed to ban user: ${error.description}`);
        } else {
            console.error("error:", error);
            await ctx.reply("error banning the user.");
        }
    }
}

export async function AdminMuteUser(ctx: any) {
    const message = ctx.message;
    const chatId = message.chat.id;
    let targetId;
    if (message.reply_to_message) {
        targetId = message.reply_to_message.from.id;
    } else {
        const args = message.text.split(" ");
        if (args.length > 1) {
            targetId = parseInt(args[1], 10);
            if (isNaN(targetId)) {
                return ctx.reply("Invalid user ID.");
            }
        }
    }

    if (!targetId) {
        return ctx.reply("Reply to a message or provide a user ID to ban.", {
            reply_to_message_id: ctx.message?.message_id
        });
    }

    try {
        const reply_markup = ButtonText("Unmute", `unmute:${targetId}`);
        await ctx.api.restrictChatMember(chatId, targetId, {
            can_send_messages: true,
            can_send_other_messages: true,
            can_add_web_page_previews: true
        });
        await ctx.reply(`User ${targetId} has been Muted.`, {
            reply_to_message_id: ctx.message?.message_id,
            reply_markup: reply_markup
        }
    );
    } catch (error) {
        if (error instanceof GrammyError) {
            console.error("Grammy API error:", error.message);
            await ctx.reply(`Failed to ban user: ${error.description}`);
        } else {
            console.error("error:", error);
            await ctx.reply("error banning the user.");
        }
    }
}
