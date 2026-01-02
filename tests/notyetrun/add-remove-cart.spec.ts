import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/InventoryPage';
import { loginAsDefault } from '@utils/helper-action';
import { NON_NUMERIC_REGEX } from '@utils/test-data';

test.beforeEach(async ({ page }) => {
    await loginAsDefault(page);
});

test.describe('Add and Remove items from Cart', () => {
    test('Add items to cart and verify cart count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        const cartCount = await inventoryPage.getItemCards();
        expect((await inventoryPage.headerBar.getTotalItemsInCart()).valueOf()).toBe(1);
    });

    test('Remove items from cart and verify cart count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.removeItemCardByName('Sauce Labs Backpack');
        expect((await inventoryPage.headerBar.getTotalItemsInCart()).valueOf()).toBe(0);
    });
});