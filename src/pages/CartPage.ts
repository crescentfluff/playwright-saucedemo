import { Page, Locator } from '@playwright/test';
import { ItemCard } from '@components/ItemCard';
import { CommonActions } from './CommonActions';
import { inventoryDataId } from '@utils/test-data';

export class CartPage extends CommonActions {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async clickCheckoutButton() {
        await this.page.getByTestId('checkout').click();
    }

    async clickContinueShoppingButton() {
        await this.page.getByTestId('continue-shopping').click();
    }

    get cartItems() {
        return this.page.getByTestId(inventoryDataId.inventoryItem);
    }

    async findByProductName(productName: string): Promise<boolean> {
        const available = await this.page.getByTestId(inventoryDataId.itemName).filter({
            hasText: productName
        });

        if (await available.count() <= 0) return false;
        return available.isVisible();
    }

    async getItemsInCart(): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = [];
        const itemCount = await this.cartItems.count();
        for (let i = 0; i < itemCount; i++) {
            const itemLocator = this.cartItems.nth(i);
            itemCards.push(new ItemCard(this.page, itemLocator));
        }

        return itemCards;
    }
}
