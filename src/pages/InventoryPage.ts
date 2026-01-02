import { Page, Locator } from '@playwright/test';
import { NavBar } from '@components/NavBar';
import { ItemCard } from '@components/ItemCard';
import { count } from 'node:console';
import { CommonActions } from './CommonActions';
import { inventoryDataId, navBarDataId } from '@utils/test-data';

export class InventoryPage extends CommonActions {
    readonly page: Page;
    readonly navbar: NavBar;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.navbar = new NavBar(page.getByTestId(navBarDataId.mainHeader));
    }

    get sortDropdown() {
        return this.page.locator('.product_sort_container');
    }

    get inventoryItems() {
        return this.page.locator('.inventory_item');
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async inventoryItemByName(productName: string) {
        return this.page.locator(
            "[data-test='inventory-item']",
            {
                has: this.page.locator(
                    "[data-test='inventory-item-name']",
                    { hasText: productName }
                )
            }
        );
    }

    async getItemCards(): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = [];
        const countItems = await this.inventoryItems.count();

        for (let i = 0; i < countItems; i++) {
            const card = this.inventoryItems.nth(i);
            itemCards.push(new ItemCard(this.page, card));
        }

        return itemCards;
    }

    static normalizeProductName(productName: string): string {
        return productName.trim().toLowerCase().replaceAll(' ', '-');
    }

    async addToCartByName(productName: string) {
        let normalName = InventoryPage.normalizeProductName(productName);
        const itemCard = await this.inventoryItemByName(productName);
        try {
            await itemCard.getByTestId(inventoryDataId.addToCartBtn(normalName)).click();
            await itemCard.getByTestId(inventoryDataId.remove(normalName)).waitFor({ state: 'visible' });
            return true;
        } catch (e) {
            console.log(`Failed to add product: ${productName}`, e);
            return false;
        }
    }

    async removeFromCartByName(productName: string) {
        let normalName = InventoryPage.normalizeProductName(productName);
        const itemCard = await this.inventoryItemByName(productName);
        await itemCard.getByTestId(inventoryDataId.remove(normalName)).click();
        await itemCard.getByTestId(inventoryDataId.addToCartBtn(normalName)).waitFor({ state: 'visible' });
    }

    async addItemToCartByCount(count: number): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = await this.getItemCards() || [];
        const addedItemCards: ItemCard[] = [];

        for (let i = 0, max = itemCards.length; i < count && i < max; i++) {
            await itemCards[i].addToCartButton.click();
            addedItemCards.push(itemCards[i]);
        }

        return addedItemCards;
    }
}