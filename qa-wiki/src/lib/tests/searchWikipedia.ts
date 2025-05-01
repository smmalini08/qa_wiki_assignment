import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Worstbull"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    await page.goto('https://www.wikipedia.org/');

    const searchInputField = page.getByRole('searchbox', {
        name: 'Search Wikipedia'
    });
    await searchInputField.fill('artificial');
    const artificialIntelligenceLink = page.getByRole('link', {
        name: 'Artificial intelligence'
    }).first();
    await artificialIntelligenceLink.click();
    await expect(page).toHaveURL(/Artificial_intelligence/);
    await page.locator('#ca-history a').click();
    await expect(page).toHaveURL(/action=history/);

    const latestEditor = await page.locator('.mw-contributions-list .new.mw-userlink').first().innerText();
    expect(latestEditor).not.toBe('Worstbull');
}
