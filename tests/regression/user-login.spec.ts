import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { valid_users, invalid_users } from '@data/UserAccountData';
import { AppPaths } from '@enums/path';

test.describe('User login flow', () => {
  test('login with valid credential is successful', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    const user = valid_users[0];
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL(AppPaths.INVENTORY);
  });

  for (const user of invalid_users) {
    test(`login with ${user.type} credential type is failed`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToHome();
      await loginPage.login(user.username, user.password);

      const errorMessage = await loginPage.getErrorMessageText();
      expect(errorMessage).toContain(user.errorMessage);
      expect(page).toHaveURL(AppPaths.HOME);
    })
  }
});