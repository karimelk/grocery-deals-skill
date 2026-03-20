---
name: grocery-deals
description: Look up Austrian grocery deals, promotions, and discounts across major retailers (SPAR, BILLA, Hofer, Lidl, Penny, dm, BIPA) using the Marktguru API. Use when the user asks about supermarket discounts, product prices, or category-wide promotions in their area (default ZIP 1050).
---

# Grocery Deals (Marktguru)

This skill provides a structured way to query Austrian grocery deals from Marktguru. It wraps the `marktguru-cli` to provide consistent reporting for Karim.

## Quick Start

### 1. Set Location
Default is **1050 (Vienna)**.
```bash
npx --yes -p marktguru-cli marktguru set-zip 1050
```

### 2. Search for a Product
Search across all default retailers:
```bash
npx --yes -p marktguru-cli marktguru search raw "Bier" --zip 1050 --json
```

### 3. Generate a Promo Report
To get the broad category-wide discounts Karim likes (-25% / -50% deals), use `web_fetch` on the retailer landing pages:
- SPAR: `https://www.marktguru.at/r/spar`
- BILLA: `https://www.marktguru.at/r/billa`
- Hofer: `https://www.marktguru.at/r/hofer`
- dm: `https://www.marktguru.at/r/dm`
- BIPA: `https://www.marktguru.at/r/bipa`

## Reporting Format

Karim prefers a concise bulleted list:

- **Retailer Name**
  - Deal description (e.g., -25% on all beer) (**Validity Dates**)
- **Check links**
  - <https://www.marktguru.at/rp/retailer-prospekte>

## Retailers to Check
By default, always check: **BILLA, SPAR, HOFER, Lidl, PENNY, BIPA, dm**.

## Troubleshooting
If the API key is missing or expired, run:
```bash
npx --yes -p marktguru-cli marktguru login
```
This will automatically refresh the key from the website.
