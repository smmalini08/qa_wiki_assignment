import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    const articleCountText = await page.getByTitle("Special:Statistics").last().innerText();
    const articleCount = parseInt(articleCountText.replace(/,/g, ''));
    expect(articleCount).toBeLessThan(7_000_000);

    const font = await page.locator('#skin-client-prefs-vector-feature-custom-font-size')
    await font.locator("[class='cdx-label cdx-radio__label']").getByText('Standard').click();
    const sampleText = page.locator(".mp-contains-float").first()
    const defaultFontSize = await sampleText.evaluate((el) =>
        parseFloat(getComputedStyle(el).fontSize)
    );
    console.log(`${defaultFontSize}`)

    await font.locator("[class='cdx-label cdx-radio__label']").getByText('Small').click();
    const smallFontSize = await sampleText.evaluate((el) =>
        parseFloat(getComputedStyle(el).fontSize)
    );
    console.log(`${smallFontSize}`)
    expect(smallFontSize).toBeLessThan(defaultFontSize);


    await font.locator("[class='cdx-label cdx-radio__label']").getByText('Large').click();

    const largeFontSize = await sampleText.evaluate((el) =>
        parseFloat(getComputedStyle(el).fontSize)
    );
    console.log(`${largeFontSize}`)

    expect(largeFontSize).toBeGreaterThan(smallFontSize);
}
