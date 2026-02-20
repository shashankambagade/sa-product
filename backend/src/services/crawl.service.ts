import { chromium } from 'playwright';

export type CrawledPagePayload = {
  url: string;
  title: string;
  metaDescription: string | null;
  canonical: string | null;
  h1Count: number;
  h2Count: number;
  links: string[];
};

export async function crawlPage(url: string): Promise<CrawledPagePayload> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  const data = await page.evaluate(() => {
    const getMeta = (name: string) => document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') || null;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
    const links = Array.from(document.querySelectorAll('a[href]')).map((a) => (a as HTMLAnchorElement).href);

    return {
      title: document.title,
      metaDescription: getMeta('description'),
      canonical,
      h1Count: document.querySelectorAll('h1').length,
      h2Count: document.querySelectorAll('h2').length,
      links
    };
  });

  await browser.close();
  return { url, ...data };
}
