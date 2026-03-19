#!/usr/bin/env node
// Seeds data/2026-03-19.json from the existing cloned repos in 19-march/

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLONES_DIR = join(__dirname, '..', '19-march');
const DATA_DIR = join(__dirname, '..', 'data');

// Map of directory names to full GitHub paths (from the YouTube video)
const repoMap = {
  'remodex': 'Emanuele-web04/remodex',
  'app-store-screenshots': 'ParthJadhav/app-store-screenshots',
  'chrome-cdp-skill': 'pasky/chrome-cdp-skill',
  'gstack': 'garrytan/gstack',
  'agent-kit': 'KeyID-AI/agent-kit',
  'pi-autoresearch': 'davebcn87/pi-autoresearch',
  'skales': 'skalesapp/skales',
  'CLI-Anything': 'HKUDS/CLI-Anything',
  'mcp2cli': 'knowsuchagency/mcp2cli',
  'mem9': 'mem9-ai/mem9',
  'gsd-2': 'gsd-build/gsd-2',
  'tada': 'HumeAI/tada',
  'atlas': 'chrisworsey55/atlas',
  'OpenSquirrel': 'Infatoshi/OpenSquirrel',
  'temm1e': 'nagisanzenin/temm1e',
  'autokernel': 'RightNow-AI/autokernel',
  'AutoResearchClaw': 'aiming-lab/AutoResearchClaw',
  'Mouser': 'TomBadash/Mouser',
  'founders-kit': 'avinash201199/founders-kit',
  'slides-grab': 'vkehfdl1/slides-grab',
  'tome': 'tomehq/tome',
  'ghost-os': 'ghostwright/ghost-os',
  'animated-icons': 'gorkem-bwl/animated-icons',
  'MetaClaw': 'aiming-lab/MetaClaw',
  'skir': 'gepheum/skir',
  'Understand-Anything': 'Lum1104/Understand-Anything',
  'lossless-claw': 'martian-engineering/lossless-claw',
  'onecli': 'onecli/onecli',
  'OpenJarvis': 'open-jarvis/OpenJarvis',
  'Auto-claude-code-research-in-sleep': 'wanshuiyin/Auto-claude-code-research-in-sleep',
  'OpenMAIC': 'THU-MAIC/OpenMAIC',
  'agent-safehouse': 'eugene1g/agent-safehouse',
  'nah': 'manuelschipper/nah',
  'autoresearch': 'uditgoenka/autoresearch',
};

function stripMarkup(text) {
  return text
    .replace(/<[^>]+>/g, '')           // strip HTML tags
    .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** → bold
    .replace(/\*([^*]+)\*/g, '$1')     // *italic* → italic
    .replace(/`([^`]+)`/g, '$1')       // `code` → code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // ![alt](img) → remove
    .replace(/\s+/g, ' ')
    .trim();
}

function getDescription(dir) {
  const readmePath = join(CLONES_DIR, dir, 'README.md');
  if (!existsSync(readmePath)) return null;
  const content = readFileSync(readmePath, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!') && !trimmed.startsWith('[') && trimmed.length > 10) {
      const clean = stripMarkup(trimmed);
      if (clean.length > 10) return clean.slice(0, 200);
    }
  }
  return null;
}

function getLanguage(dir) {
  const files = readdirSync(join(CLONES_DIR, dir)).filter(f => !f.startsWith('.'));
  if (files.includes('Cargo.toml')) return 'Rust';
  if (files.includes('package.json')) return 'JavaScript';
  if (files.includes('setup.py') || files.includes('pyproject.toml') || files.includes('requirements.txt')) return 'Python';
  if (files.includes('go.mod')) return 'Go';
  if (files.includes('pom.xml')) return 'Java';
  if (files.includes('Gemfile')) return 'Ruby';
  if (files.includes('tsconfig.json')) return 'TypeScript';
  return null;
}

function main() {
  mkdirSync(DATA_DIR, { recursive: true });
  const repos = [];

  for (const [dirName, fullName] of Object.entries(repoMap)) {
    const [owner, name] = fullName.split('/');
    const dirPath = join(CLONES_DIR, dirName);

    if (!existsSync(dirPath)) {
      console.log(`  Skip (not cloned): ${dirName}`);
      continue;
    }

    repos.push({
      owner,
      name,
      full_name: fullName,
      description: getDescription(dirName),
      language: getLanguage(dirName),
      total_stars: null,
      stars_today: null,
      url: `https://github.com/${fullName}`,
      clone_url: `https://github.com/${fullName}.git`,
    });
  }

  const data = {
    date: '2026-03-19',
    scraped_at: new Date().toISOString(),
    count: repos.length,
    source: 'GitHub Awesome YouTube - seeded from local clones',
    repos,
  };

  const outPath = join(DATA_DIR, '2026-03-19.json');
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Seeded ${repos.length} repos to ${outPath}`);
}

main();
