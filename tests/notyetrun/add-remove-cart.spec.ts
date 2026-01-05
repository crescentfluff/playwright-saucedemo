import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/InventoryPage';
import { NON_NUMERIC_REGEX } from '@utils/test-data';
import { AppPaths } from '@enums/path';
import { LoginPage } from '@pages/LoginPage';
import { sampleProductNames, userCredentials } from '@utils/config';

test.describe('Add and Remove items from cart', () => {
    test.beforeEach(async ({ page }) => {
        page.goto(AppPaths.HOME);
        const login = new LoginPage(page);
        await login.login(userCredentials.validUser, userCredentials.password);
        expect(page).toHaveURL(AppPaths.INVENTORY);
    });

    test('single item order', async ({ page }) => {
        const inventory = new InventoryPage(page);
        const itemName = sampleProductNames.singleProductName;

        const isAdded = await inventory.addToCartByName(itemName);
        expect(isAdded).toBeTruthy();

        let cartCount = (await inventory.navbar.cartMenu.textContent()) || '0';
        expect(Number(cartCount)).toBe(1);

        const isRemoved = await inventory.removeFromCartByName(itemName);
        expect(isRemoved).toBeTruthy();

        cartCount = (await inventory.navbar.cartMenu.textContent()) || '0';
        expect(Number(cartCount)).toBe(0);
    });



    test('multi items order', async ({ page }) => {
        const inventory = new InventoryPage(page);
        const itemNames = sampleProductNames.multiProductName.split(',');
        let itemInCart = 0;

        for (const item of itemNames) {
            const isAdded = await inventory.addToCartByName(item);
            expect(isAdded).toBeTruthy();
            itemInCart += 1;
        }

        let cartCount = (await inventory.navbar.cartMenu.textContent()) || '0';
        expect(Number(cartCount)).toBe(itemInCart);


        for (const item of itemNames) {
            const isAdded = await inventory.removeFromCartByName(item);
            expect(isAdded).toBeTruthy();
            itemInCart -= 1;
        }

        cartCount = (await inventory.navbar.cartMenu.textContent()) || '0';
        expect(Number(cartCount)).toBe(0);
    });
});