import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { createVCard, escapeVCard } from '../src/lib/vcard'

const user = { login: 'ArnavGurao', public_repos: 6, followers: 2, bio: null }
const repos = [
  {
    id: 1,
    name: 'DataGaurd',
    html_url: 'https://github.com/ArnavGurao/DataGaurd',
    description: 'CSV validation',
    language: 'Python',
    stargazers_count: 1,
    fork: false,
  },
]
async function mockGitHub(page: Page) {
  await page.route('https://api.github.com/users/ArnavGurao**', (route) =>
    route.fulfill({ json: route.request().url().includes('/repos?') ? repos : user }),
  )
}

for (const width of [320, 360, 375, 390, 430, 768, 1024, 1440]) {
  test(`complete page fits ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await mockGitHub(page)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("I'M ARNAV")
    await expect(page.locator('.portrait-photo img')).toBeVisible()
    expect(
      await page
        .locator('.portrait-photo img')
        .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
    ).toBeTruthy()
    for (const id of ['about', 'skills', 'projects', 'github', 'resume', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBeTruthy()
    }
    await expect(page.locator('.project-card')).toHaveCount(3)
    expect(errors).toEqual([])
    if (width === 390 || width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({ path: `.artifacts/portfolio-${width}.png`, fullPage: true })
    }
  })
}

test('mobile navigation, Escape, anchors, and expandable project details work', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await mockGitHub(page)
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Projects' })
    .click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  const details = page.locator('.project-card').first().locator('details')
  await details.locator('summary').click()
  await expect(details).toHaveAttribute('open', '')
  await expect(details).toContainText('Asynchronous Python processing')
})

test('contact methods, external safety, resume assets and downloads', async ({ page, request }) => {
  await mockGitHub(page)
  await page.goto('/')
  await expect(page.locator('a[href="tel:+918928510537"]')).toHaveCount(1)
  await expect(page.locator('a[href="mailto:arnavagurao@gmail.com"]')).toHaveCount(1)
  await expect(page.locator('.contact-tile')).toHaveCount(5)
  for (const link of await page.locator('a[target="_blank"]').all())
    expect(await link.getAttribute('rel')).toContain('noopener')
  expect(await page.locator('a[href="#"]').count()).toBe(0)
  const pdf = await request.get('/resume/Arnav_Gurao_Resume.pdf')
  expect(pdf.status()).toBe(200)
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF')
  for (const src of await page
    .locator('img')
    .evaluateAll((images) => images.map((img) => img.getAttribute('src')!)))
    expect((await request.get(src)).ok()).toBeTruthy()
  const resumeDownload = page.waitForEvent('download')
  await page.getByRole('link', { name: 'DOWNLOAD RESUME', exact: true }).click()
  expect((await resumeDownload).suggestedFilename()).toBe('Arnav_Gurao_Resume.pdf')
  const contactDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: 'SAVE MY CONTACT', exact: true }).first().click()
  const download = await contactDownload
  expect(download.suggestedFilename()).toBe('Arnav_Gurao_Contact.vcf')
  expect(await readFile((await download.path())!, 'utf8')).toBe(createVCard())
})

test('vCard uses escaped values, required fields, CRLF and valid UTF-8 folding', () => {
  const card = createVCard()
  expect(card).toMatch(/^BEGIN:VCARD\r\nVERSION:3.0\r\n/)
  expect(card).toContain('N:Gurao;Arnav;Ashish;;\r\n')
  expect(card).toContain('TEL;TYPE=CELL:+918928510537')
  expect(card).toContain('EMAIL;TYPE=INTERNET:arnavagurao@gmail.com')
  expect(card).toContain('URL:https://www.instagram.com/ar.nav4048/')
  expect(card.endsWith('END:VCARD\r\n')).toBeTruthy()
  for (const line of card.split('\r\n'))
    expect(Buffer.byteLength(line, 'utf8')).toBeLessThanOrEqual(75)
  expect(escapeVCard('A,B;C\nD\\E')).toBe('A\\,B\\;C\\nD\\\\E')
})

test('GitHub shows real returned values and caches the response', async ({ page }) => {
  let calls = 0
  await page.route('https://api.github.com/users/ArnavGurao**', (route) => {
    calls++
    return route.fulfill({ json: route.request().url().includes('/repos?') ? repos : user })
  })
  await page.goto('/')
  await expect(page.locator('.github-stats')).toContainText('6PUBLIC REPOSITORIES')
  await expect(page.locator('.repo')).toContainText('DataGaurd')
  const initialCalls = calls
  await page.reload()
  await expect(page.locator('.repo')).toContainText('DataGaurd')
  expect(calls).toBe(initialCalls)
})

test('GitHub rate limit fallback retries successfully and never fabricates metrics', async ({
  page,
}) => {
  await page.route('https://api.github.com/**', (route) =>
    route.fulfill({ status: 403, json: { message: 'API rate limit exceeded' } }),
  )
  await page.goto('/')
  await expect(page.getByText("The code's still there.")).toBeVisible()
  await expect(page.locator('.github-stats')).toHaveCount(0)
  await page.unroute('https://api.github.com/**')
  await mockGitHub(page)
  await page.getByRole('button', { name: 'TRY AGAIN' }).click()
  await expect(page.locator('.repo')).toContainText('DataGaurd')
})

test('GitHub handles empty repositories and stale cache offline', async ({ page }) => {
  await page.route('https://api.github.com/users/ArnavGurao**', (route) =>
    route.fulfill({
      json: route.request().url().includes('/repos?') ? [] : { ...user, public_repos: 0 },
    }),
  )
  await page.goto('/')
  await expect(page.getByText('No original public repositories to show yet.')).toBeVisible()
  await page.evaluate(
    ({ user, repos }) =>
      localStorage.setItem(
        'portfolio:github:ArnavGurao:v1',
        JSON.stringify({ user, repos, fetchedAt: Date.now() - 3600000 }),
      ),
    { user, repos },
  )
  await page.unroute('https://api.github.com/users/ArnavGurao**')
  await page.route('https://api.github.com/**', (route) => route.abort())
  await page.reload()
  await expect(page.getByText('Last available snapshot')).toBeVisible()
  await expect(page.locator('.repo')).toContainText('DataGaurd')
})

test('marquee can be paused and reduced motion disables continuous animation', async ({ page }) => {
  await mockGitHub(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Pause expertise animation' }).click()
  await expect(page.locator('.marquee-shell')).toHaveClass(/is-paused/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(
    await page.locator('.marquee-track').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
  expect(
    await page
      .locator('.tech-sticker')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
})
