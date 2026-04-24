import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://samuelbush.me/');
  await page.locator('div').first().click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.locator('div').nth(2).click();
  await page.getByRole('link', { name: 'About Me' }).click();
  await page.getByLabel('Menu Button').click();
  await page.getByRole('link', { name: 'My Work' }).click();
  await page.locator('div').nth(1).click();
  await page.getByRole('link', { name: 'Blog' }).click();
  await page.getByLabel('Menu Button').click();
  await page.getByRole('link', { name: 'How To Reach Me' }).click();
  await page.getByText('Phone:').click();
});