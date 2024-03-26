import type { Page } from '@playwright/test'
import type { Payload } from 'payload'

import { expect, test } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

import { exactText, initPageConsoleErrorCatch, saveDocAndAssert } from '../helpers.js'
import { AdminUrlUtil } from '../helpers/adminUrlUtil.js'
import { initPayloadE2E } from '../helpers/initPayloadE2E.js'
import config from './config.js'
import { mobileBreakpoint } from './shared.js'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { beforeAll, describe } = test

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let payload: Payload

describe('Live Preview', () => {
  let page: Page
  let serverURL: string
  let url: AdminUrlUtil

  const goToDoc = async (page: Page) => {
    await page.goto(url.list)
    const linkToDoc = page.locator('tbody tr:first-child .cell-id a').first()

    await expect(() => expect(linkToDoc).toBeTruthy()).toPass({ timeout: 45000 })

    await linkToDoc.click()
    const linkDocHref = await linkToDoc.getAttribute('href')

    await page.waitForURL(`**${linkDocHref}`)
  }

  const goToCollectionPreview = async (page: Page): Promise<void> => {
    await goToDoc(page)
    await page.goto(`${page.url()}/preview`)
  }

  const goToGlobalPreview = async (page: Page, slug: string): Promise<void> => {
    const global = new AdminUrlUtil(serverURL, slug)
    const previewURL = `${global.global(slug)}/preview`
    await page.goto(previewURL)
  }

  beforeAll(async ({ browser }) => {
    ;({ serverURL, payload } = await initPayloadE2E({ config, dirname }))
    url = new AdminUrlUtil(serverURL, 'pages')
    const context = await browser.newContext()
    page = await context.newPage()

    initPageConsoleErrorCatch(page)
  })

  test('collection - has tab', async () => {
    await goToDoc(page)

    const livePreviewTab = page.locator('.doc-tab', {
      hasText: exactText('Live Preview'),
    })

    await expect(() => expect(livePreviewTab).toBeTruthy()).toPass({ timeout: 45000 })

    const href = await livePreviewTab.locator('a').first().getAttribute('href')
    const docURL = page.url()
    const pathname = new URL(docURL).pathname

    await expect(() => expect(href).toBe(`${pathname}/preview`)).toPass({ timeout: 45000 })
  })

  test('collection - has route', async () => {
    await goToDoc(page)
    const url = page.url()
    await goToCollectionPreview(page)

    await expect(() => expect(page.url()).toBe(`${url}/preview`)).toPass({ timeout: 45000 })
  })

  test('collection - renders iframe', async () => {
    await goToCollectionPreview(page)
    const iframe = page.locator('iframe.live-preview-iframe')
    await expect(iframe).toBeVisible()
  })

  test('collection - can edit fields', async () => {
    await goToCollectionPreview(page)
    const field = page.locator('#field-title')
    await expect(field).toBeVisible()
    await field.fill('Title 1')
    await saveDocAndAssert(page)
  })

  test('collection - should show live-preview view level action in live-preview view', async () => {
    await goToCollectionPreview(page)
    await expect(page.locator('.app-header .collection-live-preview-button')).toHaveCount(1)
  })

  test('global - should show live-preview view level action in live-preview view', async () => {
    await goToGlobalPreview(page, 'footer')
    await expect(page.locator('.app-header .global-live-preview-button')).toHaveCount(1)
  })

  test('global - has tab', async () => {
    const global = new AdminUrlUtil(serverURL, 'header')
    await page.goto(global.global('header'))

    const docURL = page.url()
    const pathname = new URL(docURL).pathname

    const livePreviewTab = page.locator('.doc-tab', {
      hasText: exactText('Live Preview'),
    })

    await expect(() => expect(livePreviewTab).toBeTruthy()).toPass({ timeout: 45000 })
    const href = await livePreviewTab.locator('a').first().getAttribute('href')

    await expect(() => expect(href).toBe(`${pathname}/preview`)).toPass({ timeout: 45000 })
  })

  test('global - has route', async () => {
    const url = page.url()
    await goToGlobalPreview(page, 'header')

    await expect(() => expect(page.url()).toBe(`${url}/preview`)).toPass({ timeout: 45000 })
  })

  test('global - renders iframe', async () => {
    await goToGlobalPreview(page, 'header')
    const iframe = page.locator('iframe.live-preview-iframe')
    await expect(iframe).toBeVisible()
  })

  test('global - can edit fields', async () => {
    await goToGlobalPreview(page, 'header')
    const field = page.locator('input#field-navItems__0__link__newTab')
    await expect(field).toBeVisible()
    await expect(field).toBeEnabled()
    await field.check()
    await saveDocAndAssert(page)
  })

  test('properly measures iframe and displays size', async () => {
    await page.goto(url.create)
    await page.locator('#field-title').fill('Title 3')
    await page.locator('#field-slug').fill('slug-3')

    await saveDocAndAssert(page)

    await goToCollectionPreview(page)

    await expect(() => expect(page.url()).toContain('/preview')).toPass({ timeout: 45000 })

    const iframe = page.locator('iframe')

    // Measure the actual iframe size and compare it with the inputs rendered in the toolbar

    const iframeSize = await iframe.boundingBox()
    const iframeWidthInPx = iframeSize?.width
    const iframeHeightInPx = iframeSize?.height

    const widthInput = page.locator('.live-preview-toolbar input[name="live-preview-width"]')

    await expect(() => expect(widthInput).toBeTruthy()).toPass({ timeout: 45000 })
    const heightInput = page.locator('.live-preview-toolbar input[name="live-preview-height"]')

    await expect(() => expect(heightInput).toBeTruthy()).toPass({ timeout: 45000 })

    const widthInputValue = await widthInput.getAttribute('value')
    const width = parseInt(widthInputValue)
    const heightInputValue = await heightInput.getAttribute('value')
    const height = parseInt(heightInputValue)

    // Allow a tolerance of a couple of pixels
    const tolerance = 2

    await expect(() => expect(iframeWidthInPx).toBeLessThanOrEqual(width + tolerance)).toPass({
      timeout: 45000,
    })

    await expect(() => expect(iframeWidthInPx).toBeGreaterThanOrEqual(width - tolerance)).toPass({
      timeout: 45000,
    })

    await expect(() => expect(iframeHeightInPx).toBeLessThanOrEqual(height + tolerance)).toPass({
      timeout: 45000,
    })

    await expect(() => expect(iframeHeightInPx).toBeGreaterThanOrEqual(height - tolerance)).toPass({
      timeout: 45000,
    })
  })

  test('resizes iframe to specified breakpoint', async () => {
    await page.goto(url.create)
    await page.locator('#field-title').fill('Title 4')
    await page.locator('#field-slug').fill('slug-4')

    await saveDocAndAssert(page)
    await goToCollectionPreview(page)

    await expect(() => expect(page.url()).toContain('/preview')).toPass({
      timeout: 45000,
    })

    // Check that the breakpoint select is present
    const breakpointSelector = page.locator(
      '.live-preview-toolbar-controls__breakpoint button.popup-button',
    )

    await expect(() => expect(breakpointSelector).toBeTruthy()).toPass({
      timeout: 45000,
    })

    // Select the mobile breakpoint
    await breakpointSelector.first().click()
    await page
      .locator(`.live-preview-toolbar-controls__breakpoint button.popup-button-list__button`)
      .filter({ hasText: mobileBreakpoint.label })
      .click()

    // Make sure the value has been set
    await expect(breakpointSelector).toContainText(mobileBreakpoint.label)
    const option = page.locator(
      '.live-preview-toolbar-controls__breakpoint button.popup-button-list__button--selected',
    )
    await expect(option).toHaveText(mobileBreakpoint.label)

    // Measure the size of the iframe against the specified breakpoint
    const iframe = page.locator('iframe')

    await expect(() => expect(iframe).toBeTruthy()).toPass({
      timeout: 45000,
    })
    const iframeSize = await iframe.boundingBox()
    const iframeWidthInPx = iframeSize?.width
    const iframeHeightInPx = iframeSize?.height
    const tolerance = 2

    await expect(() =>
      expect(iframeWidthInPx).toBeLessThanOrEqual(mobileBreakpoint.width + tolerance),
    ).toPass({
      timeout: 45000,
    })

    await expect(() =>
      expect(iframeWidthInPx).toBeGreaterThanOrEqual(mobileBreakpoint.width - tolerance),
    ).toPass({
      timeout: 45000,
    })

    await expect(() =>
      expect(iframeHeightInPx).toBeLessThanOrEqual(mobileBreakpoint.height + tolerance),
    ).toPass({
      timeout: 45000,
    })

    await expect(() =>
      expect(iframeHeightInPx).toBeGreaterThanOrEqual(mobileBreakpoint.height - tolerance),
    ).toPass({
      timeout: 45000,
    })

    // Check that the inputs have been updated to reflect the new size
    const widthInput = page.locator('.live-preview-toolbar input[name="live-preview-width"]')

    await expect(() => expect(widthInput).toBeTruthy()).toPass({
      timeout: 45000,
    })
    const heightInput = page.locator('.live-preview-toolbar input[name="live-preview-height"]')

    await expect(() => expect(heightInput).toBeTruthy()).toPass({
      timeout: 45000,
    })
    const widthInputValue = await widthInput.getAttribute('value')
    const width = parseInt(widthInputValue)

    await expect(() => expect(width).toBe(mobileBreakpoint.width)).toPass({
      timeout: 45000,
    })
    const heightInputValue = await heightInput.getAttribute('value')
    const height = parseInt(heightInputValue)

    await expect(() => expect(height).toBe(mobileBreakpoint.height)).toPass({
      timeout: 45000,
    })
  })
})
