import { bot } from "./AkenoX/bot.ts";
import { connectToDatabase } from "./AkenoX/database/database.ts";

connectToDatabase();
console.log("Bot is running...");
bot.start();
