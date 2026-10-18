import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
const portrait = (await readFile('public/images/arnav-portrait.jpg')).toString('base64')
const font = (
  await readFile(
    'node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2',
  )
).toString('base64')
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_BROWSER_PATH })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:Space;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;color:#111;background:#f8f4ea;font-family:Space,Arial;background-image:linear-gradient(#1111110a 1px,transparent 1px),linear-gradient(90deg,#1111110a 1px,transparent 1px);background-size:28px 28px}.copy{position:absolute;top:48px;left:65px}.logo{font-size:40px;letter-spacing:-3px}.tag{font-size:11px;letter-spacing:2px;margin-top:35px}h1{font-size:83px;line-height:.98;letter-spacing:-5px;margin:20px 0}h1 span{color:#ff7353}p{font-size:21px;line-height:1.6;margin-top:27px}.line{width:370px;height:7px;background:#b8f34a;transform:rotate(-2deg);margin-top:-8px}.frame{position:absolute;right:83px;top:63px;width:310px;background:#fffdf6;padding:15px 15px 0;border:3px solid;border-radius:14px;box-shadow:9px 9px #111;transform:rotate(5deg)}img{width:274px;height:350px;object-fit:cover;object-position:center 20%;border:2px solid;border-radius:6px}strong{display:block;font-size:25px;line-height:65px}.burst{position:absolute;right:24px;top:12px;font-size:145px;color:#ff7353;-webkit-text-stroke:2px #111}.ribbon{position:absolute;bottom:0;left:0;right:0;height:72px;background:#b8f34a;border-top:3px solid;display:flex;align-items:center;justify-content:center;font-size:22px;letter-spacing:1px}
</style></head><body><div class="copy"><div class="logo">AG. ✳</div><div class="tag">MUMBAI, INDIA / ALWAYS CURIOUS</div><h1>HEY THERE!<br>I'M ARNAV<span>.</span></h1><div class="line"></div><p>Computer Engineering Student.<br>Developer. Builder.</p></div><div class="burst">✳</div><div class="frame"><img src="data:image/jpeg;base64,${portrait}" alt="Arnav Gurao"><strong>@arnav.gurao ↗</strong></div><div class="ribbon">FULL-STACK DEVELOPMENT &nbsp; ✳ &nbsp; CLOUD COMPUTING &nbsp; ✳ &nbsp; MOBILE DEVELOPMENT</div></body></html>`)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: 'public/images/social-preview.jpg', type: 'jpeg', quality: 90 })
await browser.close()
console.log('Social preview rendered at 1200 × 630.')
