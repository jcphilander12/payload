import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { AdminUrlUtil } from '../helpers/adminUrlUtil';
import { initPayloadE2E } from '../helpers/configHelpers';

const { beforeAll, describe } = test;
let url: AdminUrlUtil;

describe('Admin Panel', () => {
  let page: Page;

  beforeAll(async ({ browser }) => {
    const { serverURL } = await initPayloadE2E(__dirname);
    url = new AdminUrlUtil(serverURL, 'posts');

    const context = await browser.newContext();
    page = await context.newPage();
  });

  test('example test', async () => {
    await page.goto(url.list);

    const textCell = page.locator('.row-1 .cell-text');
    await expect(textCell).toHaveText('example post');
  });

  test('should save when ctrl + s is typed', async () => {
    const textValue = 'hello-new-value';
    const fieldLabelText = 'Global Text';
    const shortCut = 'Meta+s';


    await page.goto(url.global('menu'));
    await page.getByLabel(fieldLabelText).type(textValue);
    await page.keyboard.press(shortCut);
    await expect(page.locator('.Toastify')).toContainText('successfully');
  });
});
