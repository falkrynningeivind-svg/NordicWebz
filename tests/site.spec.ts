import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('metadata, priser og alle interne lenker er korrekte', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle(
    'NordicWebz | Moderne nettsider til rimelige priser',
  );
  await expect(page.locator('h1')).toHaveCount(1);
  for (const price of ['2 990', '4 990', '2 290'])
    await expect(page.locator('.price').filter({ hasText: price })).toHaveCount(
      1,
    );
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter(
            (a) =>
              !document.getElementById((a as HTMLAnchorElement).hash.slice(1)),
          )
          .map((a) => a.getAttribute('href')),
      ),
  ).toEqual([]);
  await expect(page.locator('.example-label')).toContainText(
    'Eksempelprosjekt',
  );
  await expect(page.locator('h1')).toContainText('Vi gjør');
  await expect(page.locator('h1')).toContainText('synlig');
  await expect(page.locator('.desktop-nav a')).toHaveText([
    'Tjenester',
    'Prosjekter',
    'Prosessen',
    'Om oss',
    'Priser',
    'Kontakt',
  ]);
});

test('pakkevalg, skjemafeil og ærlig status uten mottaker', async ({
  page,
}) => {
  await page.goto('/');
  for (const [label, value] of [
    ['Velg Premium', 'premium'],
    ['Velg enkel nettside', 'enkel'],
    ['Forbedre nettsiden min', 'forbedring'],
  ]) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page.locator('#service')).toHaveValue(value);
  }
  await page
    .getByRole('button', { name: 'Send forespørsel', exact: true })
    .click();
  await expect(page.locator('#name')).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(5);
  await page.getByLabel('Navn', { exact: false }).first().fill('Test Person');
  await page.locator('#company').fill('Testbedrift');
  await page.locator('#email').fill('ugyldig');
  await page.locator('#website').selectOption('nei');
  await page.locator('#message').fill('Ønsker en moderne nettside.');
  await page
    .getByRole('button', { name: 'Send forespørsel', exact: true })
    .click();
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#email').fill('test@example.no');
  await page
    .getByRole('button', { name: 'Send forespørsel', exact: true })
    .click();
  await expect(page.getByRole('status')).toContainText(
    'Forespørselen er ikke sendt',
  );
  await expect(page.locator('#name')).toHaveValue('Test Person');
});

test('FAQ og prosjektdialog kan brukes med tastatur', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Hva koster en nettside?', { exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  const trigger = page.getByRole('button', {
    name: 'Se restaurant / kafé – eksempelprosjekt',
  });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('mobilmeny og oppsett uten horisontal scrolling', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 375, 390, 600, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Skjermbredde ${width}`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Åpne meny' }).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page
    .locator('#mobile-menu')
    .getByRole('link', { name: 'Priser', exact: true })
    .click();
  await expect(page.locator('#mobile-menu')).not.toBeVisible();
  await page.getByRole('button', { name: 'Åpne meny' }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).not.toBeVisible();
});

test('ingen automatiske WCAG 2.1 AA-avvik på desktop og mobil', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`side-${width}.png`),
      fullPage: true,
    });
  }
  await page.getByRole('button', { name: 'Åpne meny' }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    ).violations.map((v) => v.id),
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Se restaurant / kafé – eksempelprosjekt' })
    .click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    ).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test('tjenestekort åpnes med hover, tastatur og trykk', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.service-card');
  await cards.nth(1).hover();
  await expect(cards.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await cards.nth(1).focus();
  await page.keyboard.press('ArrowRight');
  await expect(cards.nth(2)).toBeFocused();
  await expect(cards.nth(2)).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  await cards.nth(3).click();
  await expect(cards.nth(3)).toHaveAttribute('aria-expanded', 'true');
  await expect(cards.nth(3).locator('.service-detail')).toContainText(
    'God struktur',
  );
});

test('prosjektvelger og hero velger riktige konsepter', async ({ page }) => {
  await page.goto('/');
  await page.locator('.showcase-selector button').nth(1).click();
  await expect(
    page.locator('.showcase-selector button').nth(1),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.showcase-slide.is-active')).toContainText(
    'Bygget for',
  );
  await page
    .getByRole('button', { name: 'Neste prosjekt', exact: true })
    .click();
  await expect(page.locator('.example-label')).toContainText(
    'Lokal håndverker',
  );
  await page
    .getByRole('button', { name: 'Se lokal håndverker – eksempelprosjekt' })
    .click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Lukk prosjekt' }).click();
  await expect(page.locator('.project-open')).toBeFocused();
});

test('animasjoner avsluttes og redusert bevegelse respekteres', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect
    .poll(() =>
      page
        .locator('.handwritten-underline')
        .evaluate((el) => el.style.getPropertyValue('--ink-offset')),
    )
    .toBe('0');
  await page.locator('#prosjekter').scrollIntoViewIfNeeded();
  await expect(page.locator('.project-preview')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.drawing-pencil')).not.toBeVisible();
  await expect(page.locator('.steps')).not.toHaveClass(/has-card-stack/);
  expect(errors).toEqual([]);
});

test('animasjoner kan pauses, gjenopptas og huskes etter ny innlasting', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.motion-word').first()).toBeAttached();
  await page
    .getByRole('button', { name: 'Pause animasjoner', exact: true })
    .click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-motion-paused',
    'true',
  );
  await expect(page.locator('.motion-word')).toHaveCount(0);
  await expect(page.locator('.steps')).not.toHaveClass(/has-card-stack/);
  await expect(page.locator('.drawing-pencil')).not.toBeVisible();
  await expect(page.locator('.footer-wordmark-char').first()).toHaveCSS(
    'transform',
    'none',
  );
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Slå på animasjoner', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.motion-word')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(
    page.getByRole('button', { name: 'Redusert bevegelse', exact: true }),
  ).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page
    .getByRole('button', { name: 'Slå på animasjoner', exact: true })
    .click();
  await expect(page.locator('.motion-word').first()).toBeAttached();
  await expect(
    page.getByRole('button', { name: 'Pause animasjoner', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});

test('oppdatering på toppen beholder posisjonen og menylenker fungerer fortsatt', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [1440, 2560, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await expect(page.locator('.motion-word').first()).toBeAttached();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.reload({ waitUntil: 'networkidle' });
    const maxScroll = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          const start = performance.now();
          let max = scrollY;
          const sample = () => {
            max = Math.max(max, scrollY);
            if (performance.now() - start < 700) requestAnimationFrame(sample);
            else resolve(max);
          };
          sample();
        }),
    );
    expect(
      maxScroll,
      `Scroll etter oppdatering på ${width}px`,
    ).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('.desktop-nav a[href="#priser"]').click();
  const priceTop = () =>
    page.locator('#priser').evaluate((el) => el.getBoundingClientRect().top);
  await expect
    .poll(async () => Math.abs((await priceTop()) - 110))
    .toBeLessThanOrEqual(60);
  await expect(page.locator('#priser h2')).toBeInViewport();
  await page.reload({ waitUntil: 'networkidle' });
  await expect
    .poll(async () => Math.abs((await priceTop()) - 110))
    .toBeLessThanOrEqual(60);
  await expect(page.locator('#priser h2')).toBeInViewport();
});

test('alle prosjektvinduer er sentrert og lukking beholder scroll og fokus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 2560, height: 1440 },
    { width: 390, height: 844 },
    { width: 640, height: 360 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (let i = 0; i < 3; i++) {
      await page.locator('.project-tabs button').nth(i).click();
      const open = page.locator('.project-open');
      await open.scrollIntoViewIfNeeded();
      await open.click();
      const before = await page.evaluate(() => scrollY);
      const modal = page.getByRole('dialog', { name: /Eksempelprosjekt/ });
      await expect(modal).toBeVisible();
      const rect = await modal.boundingBox();
      expect(rect).not.toBeNull();
      expect(
        Math.abs(rect!.x + rect!.width / 2 - viewport.width / 2),
      ).toBeLessThanOrEqual(2);
      expect(
        Math.abs(rect!.y + rect!.height / 2 - viewport.height / 2),
      ).toBeLessThanOrEqual(2);
      expect(rect!.y).toBeGreaterThanOrEqual(0);
      expect(rect!.y + rect!.height).toBeLessThanOrEqual(viewport.height);
      if (i === 0) await page.keyboard.press('Escape');
      else if (i === 1)
        await page
          .getByRole('button', { name: 'Lukk prosjekt', exact: true })
          .click();
      else await page.mouse.click(3, viewport.height / 2);
      await expect(modal).not.toBeVisible();
      await expect(open).toBeFocused();
      expect(
        Math.abs((await page.evaluate(() => scrollY)) - before),
      ).toBeLessThanOrEqual(2);
    }
  }
});

test('snarveiene stopper med riktig seksjon rett under toppmenyen', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [2560, 1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (const id of ['kontakt', 'prosjekter', 'priser', 'prosessen']) {
      const nav = page.locator(width < 760 ? '#mobile-menu' : '.desktop-nav');
      if (width < 760)
        await page.getByRole('button', { name: 'Åpne meny' }).click();
      await nav.locator(`a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const offset = () =>
        page.evaluate((id) => {
          const section = document.getElementById(id)!;
          const header = document.querySelector('.header-inner')!;
          return Math.abs(
            section.getBoundingClientRect().top -
              header.getBoundingClientRect().bottom,
          );
        }, id);
      await expect
        .poll(offset, { message: `${id} på ${width}px` })
        .toBeLessThanOrEqual(1);
      if (width < 760) await expect(nav).not.toBeVisible();
      const maxOffset = await page.evaluate(
        (id) =>
          new Promise<number>((resolve) => {
            const start = performance.now();
            let max = 0;
            const sample = () => {
              max = Math.max(
                max,
                Math.abs(
                  document.getElementById(id)!.getBoundingClientRect().top -
                    document
                      .querySelector('.header-inner')!
                      .getBoundingClientRect().bottom,
                ),
              );
              if (performance.now() - start < 250)
                requestAnimationFrame(sample);
              else resolve(max);
            };
            sample();
          }),
        id,
      );
      expect(
        maxOffset,
        `Stabil plassering av ${id} på ${width}px`,
      ).toBeLessThanOrEqual(1);
    }
  }
});
