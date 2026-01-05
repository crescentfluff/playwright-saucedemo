import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { valid_users } from '@data/UserAccountData';
import { InventoryPage } from '@pages/InventoryPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CheckoutPaymentPage } from '@pages/CheckoutPaymentPage';
import { CartPage } from '@pages/CartPage';
import { CompleteOrderPage } from '@pages/CompleteOrderPage';
import { NON_NUMERIC_REGEX } from '@utils/test-data';
import { AppPaths } from '@enums/path';

test.describe('E2E - Create order until paid flow', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        page.goto(AppPaths.HOME);

        const user = valid_users[0];
        await loginPage.login(user.username, user.password);
        expect(page).toHaveURL(AppPaths.INVENTORY);

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navbar.openMenu();
        await inventoryPage.navbar.resetState();
        expect(inventoryPage.navbar.cartMenu).toBeEmpty();
    });

    test('single item order', async ({ page }) => {
        const inventory = new InventoryPage(page);

        const itemCards = await inventory.getItemCards();
        await itemCards[0].addToCartButton.click();
        const selectedItemName = await itemCards[0].name.textContent();

        let cartItemCount = (await inventory.navbar.cartMenu.textContent()) || '0';
        expect(Number(cartItemCount)).toBe(1);

        await inventory.navbar.goToCart();

        const cart = new CartPage(page);
        expect(cart.navbar.secondaryHeader).toHaveText('Your Cart');

        const cartItems = await cart.getItemsInCart();
        const cartItemName = await cartItems[0].name.textContent();

        expect(cartItems.length).toBe(1);
        expect(cartItemName).toBe(selectedItemName);

        await cart.clickCheckoutButton();
        const checkout = new CheckoutPage(page);

        expect(checkout.navbar.secondaryHeader).toHaveText('Checkout: Your Information');

        await checkout.fillCheckoutInformation('John', 'Doe', '12345');
        await checkout.clickContinue();

        const checkoutPayment = new CheckoutPaymentPage(page);
        expect(checkoutPayment.navbar.secondaryHeader).toHaveText('Checkout: Overview');

        const checkoutItems = await checkoutPayment.getTotalInventoryAmount();
        const itemTotalValue = parseFloat((await checkoutPayment.itemTotalValue.textContent())!
            .replace(NON_NUMERIC_REGEX, ''));
        const taxValue = parseFloat((await checkoutPayment.taxValue.textContent())!
            .replace(NON_NUMERIC_REGEX, ''));
        const subtotalValue = parseFloat((await checkoutPayment.totalPriceValue.textContent())!
            .replace(NON_NUMERIC_REGEX, ''));

        console.log('Checkout Items Total:', checkoutItems);
        console.log('Item Total Value:', itemTotalValue);
        console.log('Tax Value:', taxValue);
        console.log('Subtotal Value:', subtotalValue);

        expect(checkoutItems).toBeCloseTo(subtotalValue, 2);
        expect(itemTotalValue).toBeCloseTo(subtotalValue + taxValue, 2);

        await checkoutPayment.clickFinish();
        const completeOrder = new CompleteOrderPage(page);

        expect(completeOrder.completeHeader.isVisible()).toBeTruthy();
        expect((await completeOrder.completeHeader.textContent())?.toUpperCase())
            .toContain('THANK YOU FOR YOUR ORDER');
    });
});