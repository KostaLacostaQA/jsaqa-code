const { test, expect } = require("@playwright/test");
const user = require('./user.js')
const url = "https://netology.ru/?modal=sign_in";

 test('Successful authorization', async ({ page }) => {
   await page.goto(url);
   await expect(page).toHaveURL(url);

   await page.fill('input[placeholder="Email"]', user.email);
   await page.fill('input[placeholder="Пароль"]', user.password);
   await page.click('//button[text() = "Войти"]');
 
   await expect(page).toHaveURL('https://netology.ru/profile');
   await page.waitForSelector('h2');
   const profileTitle = await page.$('h2');
   const profileTitleText = await profileTitle.innerText();
   await expect(profileTitleText).toBe('Мои курсы и профессии');
 });

test('Unsuccessful authorization', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveURL(url);

  await page.fill('input[placeholder="Email"]', "Vasya@mail.ru");
  await page.fill('input[placeholder="Пароль"]', "admin");
  await page.click('//button[text() = "Войти"]');

  const errorText = await page.innerText('div[data-testid="login-error-hint"]');
  expect(errorText).toBe('Вы ввели неправильно логин или пароль');
});