import { expect, test } from '@playwright/test'

test.describe('BaldurDev portfolio smoke', () => {
  test('ES homepage renders hero and projects', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('BaldurDev')
    await expect(page.locator('#hero')).toContainText('Full Stack Software Engineer')
    await expect(page.locator('#projects')).toContainText('Ticador')
  })

  test('EN homepage renders hero and projects', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('h1')).toContainText('BaldurDev')
    await expect(page.locator('#hero')).toContainText('Full Stack Software Engineer')
    await expect(page.locator('#projects')).toContainText('Ticador')
  })

  test('locale switching works', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await expect(page.locator('#technologies')).toContainText('Capacidades')
    await page.getByLabel(/Idioma|Language/i).getByRole('button', { name: 'EN' }).click()
    await page.waitForURL(/\/en\/?/)
    await expect(page.locator('#technologies')).toContainText('Engineering capabilities')
  })

  test('navigation anchors scroll to sections', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Contacto|Contact/i }).first().click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('project media drawer opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Ver detalles|View details/i }).first().click()
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 10000 })
    await page.getByRole('button', { name: /Cerrar|Close/i }).click()
    await expect(page.locator('[role="dialog"]')).toBeHidden()
  })

  test('important CTA hrefs are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Hablemos|Let.s talk/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Ver proyectos|View projects/i }).first()).toBeVisible()
    await expect(page.locator('a[download]').first()).toHaveAttribute('href', /Baldur_Tamayo_Resume_EN\.pdf/)
  })

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    const body = page.locator('body')
    const width = await body.evaluate((el) => el.scrollWidth)
    const clientWidth = await body.evaluate((el) => el.clientWidth)
    expect(width).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('keyboard navigation reaches contact form', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Contacto|Contact/i }).first().press('Enter')
    await expect(page.locator('#contact')).toBeInViewport()
    await expect(page.locator('#contact input[name="name"]')).toBeVisible()
  })
})
