import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_BROWSER_PATH })
const page = await browser.newPage({ reducedMotion: 'reduce' })
await page.route('https://api.github.com/**', (route) => route.abort())
for (const width of [320, 360, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 950 })
  await page.goto('http://127.0.0.1:5173')
  await page.evaluate(() => document.fonts.ready)
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll('main *')]
      .filter((el) => {
        const b = el.getBoundingClientRect()
        return b.right > innerWidth + 1 && !el.closest('.marquee-shell')
      })
      .map((el) => ({
        tag: el.tagName,
        class: el.className,
        right: Math.round(el.getBoundingClientRect().right),
      }))
      .slice(0, 20),
  }))
  console.log(JSON.stringify(layout))
  if ([390, 1440].includes(width)) await page.screenshot({ path: `.artifacts/hero-${width}.png` })
}
await browser.close()
