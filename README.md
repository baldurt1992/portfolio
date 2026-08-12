# BaldurDev Portfolio

Personal portfolio of **Andrés Baldur Tamayo**, Full Stack Software Engineer based in Colombia and available for remote work.

The site is built to present real engineering work and production experience across SaaS, multi-tenant ERP, APIs, custom WordPress solutions, CI/CD and deployment.

## Selected work

- **Ticador** — production SaaS ecosystem with multi-tenant provisioning, workforce attendance, real-time flows and automated delivery.
- **Cosmos ERP** — multi-tenant ERP built with Laravel, Nuxt and TypeScript, including invoicing, document workflows and POS operations.
- **Dental clinic platform** — WordPress solution with a custom booking plugin, Bold Payments integration and automated notifications.

The portfolio also includes **Showcase Lab**, a separate collection of frontend demos used to explore different industries, stacks and visual systems.

## Stack

- Nuxt 4 / Vue 3 / TypeScript
- Nuxt UI / Tailwind CSS
- Vue I18n — Spanish and English
- GSAP for restrained interface motion
- EmailJS + Cloudflare Turnstile for contact
- Playwright for end-to-end smoke tests
- GitHub Pages deployment through GitHub Actions

## Local development

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Deployment

Production is prerendered with Nuxt's GitHub Pages preset. The workflow provides the public site URL and base path used by canonical URLs, hreflang, sitemap and other SEO metadata.

## SEO and accessibility

The portfolio includes:

- prerendered Spanish and English routes
- canonical URLs and `hreflang` / `x-default`
- XML sitemap
- index/follow robots metadata
- Open Graph and Twitter metadata
- Schema.org `WebSite`, `WebPage` and `Person` structured data
- keyboard navigation and skip link
- reduced-motion support
- responsive layouts and project media

## License

See [LICENSE](LICENSE).
