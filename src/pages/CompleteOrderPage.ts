import { Page, Locator } from '@playwright/test';
import { NavBar } from '@components/NavBar';
import { navBarDataId } from '@utils/test-data';

export class CompleteOrderPage {
    readonly page: Page;
    readonly navbar: NavBar;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavBar(page.getByTestId(navBarDataId.mainHeader));
    }

    get completeHeader() {
        return this.page.getByTestId('complete-header');
    }

    get completeText() {
        return this.page.getByTestId('complete-text');
    }

    async isOrderComplete(): Promise<boolean> {
        const headerText = await this.completeHeader.innerText();
        return headerText === 'THANK YOU FOR YOUR ORDER';
    }

    async backToHome() {
        await this.page.getByTestId('back-to-products').click();
    }
}