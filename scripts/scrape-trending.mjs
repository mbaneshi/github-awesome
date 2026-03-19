#!/usr/bin/env node
// Scrapes GitHub trending page and outputs data/YYYY-MM-DD.json
// Uses same CSS selectors as codeilus-harvest/src/scraper.rs

import { load } from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

function extractStarsToday(text) {
  if (!text) return null;
  const match = text.match(/([\d,]+)\s+stars?\s+(today|this week|this month)/i);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
}

function extractNumber(text) {
  if (!text) return null;
  const match = text.trim().replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

async function scrapeTrending(language = null, since = 'daily') {
  let url = 'https://github.com/trending';
  if (language) url += `/${encodeURIComponent(language)}`;
  url += `?since=${since}`;

  console.log(`Fetching ${url}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; awesome-oss-trending/1.0)',
      'Accept': 'text/html',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const html = await res.text();
  const $ = load(html);
  const repos = [];

  $('article.Box-row').each((i, el) => {
    const $el = $(el);

    // Owner and name from h2 a
    const repoLink = $el.find('h2 a').attr('href');
    if (!repoLink) return;

    const parts = repoLink.replace(/^\//, '').split('/');
    if (parts.length < 2) return;
    const [owner, name] = parts;

    // Description
    const description = $el.find('p').first().text().trim() || null;

    // Language
    const language = $el.find('span[itemprop="programmingLanguage"]').text().trim() || null;

    // Total stars - find the link containing star count
    let totalStars = null;
    $el.find('a.Link--muted').each((_, a) => {
      const href = $(a).attr('href') || '';
      if (href.endsWith('/stargazers')) {
        totalStars = extractNumber($(a).text());
      }
    });

    // Stars today
    const starsText = $el.find('span.d-inline-block.float-sm-right').text();
    const starsToday = extractStarsToday(starsText);

    repos.push({
      owner,
      name,
      full_name: `${owner}/${name}`,
      description,
      language,
      total_stars: totalStars,
      stars_today: starsToday,
      url: `https://github.com/${owner}/${name}`,
      clone_url: `https://github.com/${owner}/${name}.git`,
    });
  });

  return repos;
}

async function main() {
  const date = process.argv[2] || new Date().toISOString().slice(0, 10);

  try {
    const repos = await scrapeTrending();
    const data = {
      date,
      scraped_at: new Date().toISOString(),
      count: repos.length,
      repos,
    };

    mkdirSync(DATA_DIR, { recursive: true });
    const outPath = join(DATA_DIR, `${date}.json`);
    writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`Wrote ${repos.length} repos to ${outPath}`);
  } catch (err) {
    console.error('Scrape failed:', err.message);
    process.exit(1);
  }
}

main();
