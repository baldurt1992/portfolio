import { expect, test } from '@playwright/test'

test.describe('BaldurDev portfolio smoke', () => {
  test('ES homepage renders role and projects', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Full Stack Software Engineer')
    await expect(page.locator('#hero')).toContainText('Andrés Baldur Tamayo')
    await expect(page.locator('#projects')).toContainText('Ticador')
    await expect(page.locator('#landings')).toContainText('VantaPay')
    await expect(page.locator('#landings')).toContainText('NovaAI')
    await expect(
      page.locator('#landings').getByRole('link', { name: /Explorar landings/i })
    ).toHaveAttribute('href', /\/showcase\/?$/)
  })

  test('hero heading stays visible after hydration', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('#hero h1')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveCSS('opacity', '1')
    await expect(page.locator('#projects')).toBeVisible()
    await expect
      .poll(async () => {
        return heading.evaluate((el) => Number(getComputedStyle(el).opacity))
      })
      .toBe(1)
  })

  test('project hover videos are not fetched on first paint', async ({ page }) => {
    const videoUrls: string[] = []
    page.on('request', (request) => {
      if (request.url().includes('/videos/') && request.url().includes('.mp4')) {
        videoUrls.push(request.url())
      }
    })

    await page.goto('/')
    await expect(page.locator('#hero h1')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()

    expect(videoUrls, 'los mp4 no deben pedirse hasta hover o viewport').toEqual([])
  })

  test('EN homepage renders role and projects', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('h1')).toContainText('Full Stack Software Engineer')
    await expect(page.locator('#hero')).toContainText('Andrés Baldur Tamayo')
    await expect(page.locator('#projects')).toContainText('Ticador')
    await expect(page.locator('#landings')).toContainText('VantaPay')
    await expect(page.locator('#landings')).toContainText('NovaAI')
    await expect(
      page.locator('#landings').getByRole('link', { name: /Explore landing pages/i })
    ).toHaveAttribute('href', /\/en\/showcase\/?$/)
  })

  test('locale switching works', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await expect(page.locator('#technologies')).toContainText('Capacidades')
    await page
      .getByLabel(/Idioma|Language/i)
      .getByRole('button', { name: 'EN' })
      .click()
    await page.waitForURL(/\/en\/?/)
    await expect(page.locator('#technologies')).toContainText('Engineering capabilities')
  })

  test('navigation anchors scroll to sections', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('link', { name: /Contacto|Contact/i })
      .first()
      .click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('project media drawer opens and closes', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('button', { name: /Ver detalles|View details/i })
      .first()
      .click()
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 10000 })
    await page.getByRole('button', { name: /Cerrar|Close/i }).click()
    await expect(page.locator('[role="dialog"]')).toBeHidden()
  })

  test('important CTA hrefs are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Ver trabajos|View work/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Contactar|Contact/i }).first()).toBeVisible()
    await expect(page.locator('a[download]').first()).toHaveAttribute(
      'href',
      /Baldur_Tamayo_Resume_EN_2026\.pdf/
    )
  })

  test('home exposes canonical and language alternates', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://baldurdev.com/'
    )
    await expect(page.locator('link[rel="alternate"][hreflang="es-CO"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1)
  })

  test('showcase exposes its own canonical and hreflang cluster', async ({ page }) => {
    await page.goto('/showcase/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/showcase\/$/)
    await expect(page.locator('link[rel="alternate"][hreflang="es-CO"]')).toHaveAttribute(
      'href',
      /\/showcase\/$/
    )
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute(
      'href',
      /\/en\/showcase\/$/
    )
  })

  test('showcase cards link to each landing under the showcase base URL', async ({ page }) => {
    await page.goto('/showcase/')
    await expect(page.getByRole('heading', { name: 'VantaPay' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'NovaAI' })).toBeVisible()
    await expect(page.locator('a[href$="/fintech/"]')).toHaveCount(1)
    await expect(page.locator('a[href$="/ai/"]')).toHaveCount(1)
    await expect(page.getByRole('img', { name: /VantaPay/ })).toBeVisible()
    await expect(page.getByRole('img', { name: /NovaAI/ })).toBeVisible()
  })

  test('integrated landing pages expose canonical metadata and portfolio return', async ({
    page
  }) => {
    for (const slug of ['fintech', 'ai']) {
      await page.goto(`/showcase/${slug}/`)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://baldurdev.com/showcase/${slug}/`
      )
      await expect(page.locator('.portfolio-back')).toBeVisible()
      await expect(page.locator('.portfolio-back')).toHaveAttribute('href', '/showcase/')
    }
  })

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    const body = page.locator('body')
    const width = await body.evaluate((el) => el.scrollWidth)
    const clientWidth = await body.evaluate((el) => el.clientWidth)
    expect(width).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('Hostinger partner badge and referral code are consistent', async ({ page }) => {
    const referralUrl = 'https://www.hostinger.com/co?REFERRALCODE=BALDURDEV92'
    const coupon = 'BALDURDEV92'

    await page.goto('/')

    await expect(
      page.locator('#about').getByRole('link', { name: 'Hostinger Partner' })
    ).toBeVisible()
    await expect(page.locator('#about')).toContainText('Partner de Hostinger')
    await expect(page.locator('#contact')).toContainText(coupon)
    await expect(
      page.locator('[data-site-footer]').getByRole('link', { name: 'Hostinger Partner' })
    ).toBeVisible()
    await expect(page.locator('[data-site-footer]')).toContainText(coupon)
    await expect(
      page.locator('[data-site-footer]').getByRole('button', {
        name: `Copiar cupón de Hostinger ${coupon}`
      })
    ).toBeVisible()

    const hostingerLinks = page.locator(`a[href="${referralUrl}"]`)
    await expect(hostingerLinks.first()).toBeVisible()
    const count = await hostingerLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)

    for (let i = 0; i < count; i++) {
      const link = hostingerLinks.nth(i)
      await expect(link).toHaveAttribute('target', '_blank')
      const rel = await link.getAttribute('rel')
      expect(rel).toContain('sponsored')
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
      const href = await link.getAttribute('href')
      const referralCode = new URL(href ?? '').searchParams.get('REFERRALCODE')
      expect(referralCode).toBe(coupon)
    }

    await expect(page.locator('body')).not.toContainText('YLPANDRESK8K')
  })

  test('EN Hostinger partner surfaces use the same referral code', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('#contact')).toContainText('BALDURDEV92')
    await expect(
      page.locator('#contact').getByRole('link', { name: /Visit Hostinger/i })
    ).toHaveAttribute('href', 'https://www.hostinger.com/co?REFERRALCODE=BALDURDEV92')
  })

  test('keyboard navigation reaches contact form', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('link', { name: /Contacto|Contact/i })
      .first()
      .press('Enter')
    await expect(page.locator('#contact')).toBeInViewport()
    await expect(page.locator('#contact input[name="name"]')).toBeVisible()
  })
})
