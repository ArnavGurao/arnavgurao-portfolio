import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredUrl =
    env.VITE_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '')
  // This is the actual origin returned by Sites registration, not an invented domain.
  const origin = new URL(configuredUrl || 'https://arnav-gurao-portfolio.algolabs14.chatgpt.site')
    .origin
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-social-metadata',
        transformIndexHtml(html: string) {
          return {
            html: html.replaceAll(
              'content="/images/social-preview.jpg"',
              `content="${origin}/images/social-preview.jpg"`,
            ),
            tags: [
              {
                tag: 'link',
                attrs: { rel: 'canonical', href: `${origin}/` },
                injectTo: 'head' as const,
              },
              {
                tag: 'meta',
                attrs: { property: 'og:url', content: `${origin}/` },
                injectTo: 'head' as const,
              },
            ],
          }
        },
      },
    ],
    build: { target: 'es2022' },
  }
})
