import { test, expect } from '@playwright/test'

test('VIKRANTA web foundation renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('VIKRANTA')
  await expect(page.locator('.tagline')).toContainText('Valor is the Root of Victory.')
})

test('backend configuration is never required for the static shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#status')).toBeVisible()
})
