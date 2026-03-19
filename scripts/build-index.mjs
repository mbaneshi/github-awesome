#!/usr/bin/env node
// Builds data/index.json and data/languages.json from daily JSON files
// Also copies data to site/src/data/ for SvelteKit build

import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const SITE_DATA_DIR = join(__dirname, '..', 'site', 'src', 'data');

function main() {
  // Find all daily JSON files
  const files = readdirSync(DATA_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse(); // newest first

  if (files.length === 0) {
    console.error('No data files found in', DATA_DIR);
    process.exit(1);
  }

  const dates = files.map(f => f.replace('.json', ''));
  const latest = dates[0];

  // Aggregate languages across all days
  const langCounts = {};
  const allRepos = new Set();

  for (const file of files) {
    const data = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8'));
    for (const repo of data.repos) {
      const key = repo.full_name;
      if (!allRepos.has(key)) {
        allRepos.add(key);
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      }
    }
  }

  // Sort languages by count
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});

  // Write index
  const index = {
    dates,
    latest,
    total_days: dates.length,
    total_unique_repos: allRepos.size,
    updated_at: new Date().toISOString(),
  };

  writeFileSync(join(DATA_DIR, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`Index: ${dates.length} days, ${allRepos.size} unique repos, latest: ${latest}`);

  writeFileSync(join(DATA_DIR, 'languages.json'), JSON.stringify(languages, null, 2));
  console.log(`Languages: ${Object.keys(languages).length} languages tracked`);

  // Copy data to site/src/data/
  mkdirSync(SITE_DATA_DIR, { recursive: true });
  for (const file of [...files, 'index.json', 'languages.json']) {
    const src = join(DATA_DIR, file);
    const dest = join(SITE_DATA_DIR, file);
    copyFileSync(src, dest);
  }
  console.log(`Copied ${files.length + 2} files to ${SITE_DATA_DIR}`);
}

main();
