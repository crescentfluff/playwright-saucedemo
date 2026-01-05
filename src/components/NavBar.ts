import { Locator } from '@playwright/test';
import { navBarDataId } from '@utils/test-data'

export class NavBar {
    readonly root: Locator;

    constructor(private readonly locator: Locator) {
        this.root = locator;
    }

    private get page() {
        return this.root.page();
    }

    async openMenu() {
        const btn = await this.root.locator('//div[img[@data-test="%s"]]/button'
            .replace('%s', navBarDataId.burgerMenu));
        btn.click();
        await this.page
            .getByTestId(navBarDataId.closeMenu)
            .waitFor({ state: 'visible' });
    }

    async closeMenu() {
        await this.page.getByTestId(navBarDataId.closeMenu).click();
        await this.page
            .getByTestId(navBarDataId.burgerMenu)
            .waitFor({ state: 'visible' });
    }

    get secondaryHeader() {
        return this.page.getByTestId(navBarDataId.secondaryHeader);
    }

    get cartMenu() {
        return this.root.getByTestId(navBarDataId.cartMenu)
    }

    async logout() {
        await this.page.getByTestId(navBarDataId.logoutMenu).click();
    }

    async resetState() {
        await this.page.getByTestId(navBarDataId.resetMenu).click();
    }

    async goToCart() {
        await this.cartMenu.click();
    }

    async goToInventory() {
        await this.page.getByTestId(navBarDataId.allItemsMenu).click();
    }

    async goToAbout() {
        await this.page.getByTestId(navBarDataId.aboutMenu).click();
    }
}