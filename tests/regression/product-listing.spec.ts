import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/InventoryPage';
import { valid_users } from '@data/UserAccountData';
import { LoginPage } from '@pages/LoginPage';
import { AppPaths } from '@enums/path';
import { sortOptions } from '@data/SortOptionData';

test.describe('Product listing page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        const user = valid_users[0];
        await loginPage.login(user.username, user.password);
        expect(page).toHaveURL(AppPaths.INVENTORY);
    });

    for (const sortOption of sortOptions) {
        test(`verify product sorting by ${sortOption.description}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);
            await inventoryPage.sortBy(sortOption.type);
            const itemCards = await inventoryPage.getItemCards();
            var prices, sortedPrices;

            if (sortOption.sortedBy === 'name') {
                prices = await Promise.all(itemCards.map(async (item) => {
                    return await item.name.textContent();
                }));
                sortedPrices = [...prices].sort((a, b) =>
                    String(b).localeCompare(String(a))
                );
            } else {
                prices = await Promise.all(itemCards.map(async (item) => {
                    return parseFloat((await item.price.textContent())!.replace('$', ''));
                }));
                sortedPrices = [...prices].sort((a, b) => b - a);
            }

            if (sortOption.direction === 'desc') {
                expect(prices).toEqual(sortedPrices);
            } else {
                expect(prices).toEqual(sortedPrices.reverse());
            }
        })
    }
});