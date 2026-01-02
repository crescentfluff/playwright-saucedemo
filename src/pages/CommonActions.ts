import { Page, Locator } from "@playwright/test";
import { NavBar } from "@components/NavBar";
import { navBarDataId } from "@utils/test-data";
import { AppPaths } from "@enums/path";

export class CommonActions {
    readonly page: Page;
    readonly navbar: NavBar;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavBar(page.getByTestId(navBarDataId.mainHeader));

    }

    async navigateToHome() {
        await this.page.goto(AppPaths.HOME);
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    get currentUrl(): string {
        return this.page.url();
    }

}
