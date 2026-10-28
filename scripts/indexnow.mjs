// Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver...).
// Run AFTER a production deploy:  node scripts/indexnow.mjs
// The key file public/<key>.txt must be live at https://<domain>/<key>.txt.
import { readFileSync, readdirSync } from "node:fs";

const key = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f))?.replace(".txt", "");
if (!key) throw new Error("IndexNow key file not found in public/");
const xml = readFileSync("out/sitemap.xml", "utf8");
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const host = new URL(urlList[0]).host;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs for ${host})`);
