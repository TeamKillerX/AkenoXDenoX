//
import config from "dotenv";
config.config();

export const AKENOX_API_KEY: string  =  process.env.AKENOX_KEY as string;
export const BOT_TOKEN: string = process.env.BOT_TOKEN as string;
export const API_ENDPOINT: string = "https://randydev-ryu-js.hf.space/api/v1";
export const MONGO_URL: string = process.env.MONGO_URL as string;

if (!AKENOX_API_KEY) throw new Error("Missing AKENOX_API_KEY");
if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN");
if (!API_ENDPOINT) throw new Error("Missing API_ENDPOINT");
if (!MONGO_URL) throw new Error("Missing MONGO_URL");

export const CHAT_IDS = [
  -1002407639480, // @xpushz
];
