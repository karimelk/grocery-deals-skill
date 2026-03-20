#!/usr/bin/env node

/**
 * Karim's Grocery Deals - Promo Fetcher
 *
 * This script fetches the category-wide discounts (Aktionen) for a list of
 * Austrian retailers from Marktguru.
 */

import { execSync } from 'child_process';

const RETAILERS = [
  { name: 'SPAR', url: 'https://www.marktguru.at/r/spar', pLink: 'https://www.marktguru.at/rp/spar-prospekte' },
  { name: 'BILLA', url: 'https://www.marktguru.at/r/billa', pLink: 'https://www.marktguru.at/rp/billa-prospekte' },
  { name: 'HOFER', url: 'https://www.marktguru.at/r/hofer', pLink: 'https://www.marktguru.at/rp/hofer-prospekte' },
  { name: 'dm', url: 'https://www.marktguru.at/r/dm', pLink: 'https://www.marktguru.at/rp/dm-prospekte' },
  { name: 'BIPA', url: 'https://www.marktguru.at/r/bipa', pLink: 'https://www.marktguru.at/rp/bipa-prospekte' },
];

function clean(text) {
  return text
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/\s+/g, ' ')    // collapse whitespace
    .trim();
}

async function main() {
  console.log('Fetching grocery promotions for Karim (ZIP 1050)...\n');

  for (const r of RETAILERS) {
    try {
      // Fetch and use a simple regex to find the campaign blocks in the HTML
      const out = execSync(`curl -sL "${r.url}"`, { encoding: 'utf8' });
      
      // Look for blocks that start with a % discount and mention the retailer
      // We'll search for the raw text around the "Aktionen" section
      const re = /-[0-9]+%.*?bei\s+([A-Z\s-]+)/gi;
      let match;
      const seen = new Set();
      let foundAny = false;

      while ((match = re.exec(out)) !== null) {
        const text = clean(match[0]);
        // Only include if it mentions this specific retailer
        if (text.toLowerCase().includes(r.name.toLowerCase())) {
          if (!foundAny) {
            console.log(`- **${r.name}**`);
            foundAny = true;
          }
          const final = text.replace(new RegExp(`bei\\s+${r.name}`, 'i'), '').trim();
          if (!seen.has(final)) {
            console.log(`  - ${final}`);
            seen.add(final);
          }
        }
      }

      if (!foundAny) {
        console.log(`- **${r.name}**: No category-wide deals found.`);
      }
    } catch (e) {
      console.log(`- **${r.name}**: Error fetching deals.`);
    }
  }

  console.log('\n- **Check links**');
  RETAILERS.forEach(r => console.log(`  - <${r.pLink}>`));
}

main().catch(console.error);
