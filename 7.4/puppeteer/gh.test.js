
describe("Github page tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
    page.close();
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team");
  }, 10000);


  describe("Other pages tests", () => {
    let otherPage;

    beforeEach(async () => {
      otherPage = await browser.newPage();
      await otherPage.goto("https://github.com/security");
    });

    afterEach(() => {
      otherPage.close();
    });

    test("The h1 header content on other page", async () => {
      const header = await otherPage.waitForSelector("h1");
      const title = await otherPage.evaluate(element => element.textContent, header);
      expect(title.trim()).toEqual("Trusted by millions of developers");
    }, 10000);

    test("The first link attribute on other page", async () => {
      const actual = await otherPage.$eval("a", link => link.getAttribute('href'));
      expect(actual).toEqual("#start-of-content");
    }, 10000);

    test("The page contains Sign in button on other page", async () => {
      const btnSelector = "a.HeaderMenu-link--sign-in"
      await otherPage.waitForSelector(btnSelector, {
        visible: true,
      }, 10000);
      const actual = await otherPage.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Sign in")
    });
  });
 });