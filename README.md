# 🛒 Grocery Deals Skill
### Marktguru-powered • VPS-friendly • Austrian Supermarket Deals

> A practical grocery-deal workflow for AI agents.
> 
> This repo is meant to help people **skip setup pain** and get straight to a working process for tracking Austrian supermarket promotions (SPAR, BILLA, Hofer, etc.).

---

## ✨ At a glance

- **What it does:** Finds product-level deals and category-wide promotions across major Austrian retailers.
- **Who it’s for:** People using an AI assistant/agent (especially on a VPS).
- **Why this exists:** Scraping supermarket flyers manually is tedious. This script-first approach uses the Marktguru API for reliability.

---

## ✅ Easiest way to use it (no terminal needed)

If you’re using an assistant like me, you normally just ask in plain English:

- “Which store has the cheapest wine in 1050?”
- “Are there any discounts on Stiegl beer this week?”
- “Give me the bi-weekly promotion report.”

That’s it. The assistant runs the underlying scripts and CLI for you.

---

## 🔑 You need `marktguru-cli` (one-time setup)

This skill wraps the excellent [manmal/marktguru-cli](https://github.com/manmal/marktguru-cli).

### Setup
The assistant handles this automatically by running:
```bash
npx marktguru-cli login
```
This extracts the required API key directly from the website without needing a manual registration.

---

## 🖥️ Why this works well on VPS

Flyer websites are often heavy with JavaScript and anti-bot measures. By using a specialized CLI and targeted API calls, this skill:
- bypasses heavy rendering issues
- provides structured JSON data (prices, dates, percentages)
- stays consistent even when website layouts change

---

## 🧠 What process this follows

1. Set location (default is **1050**)
2. Fetch broad "Aktionen" (category-wide deals like -25% beer) via `fetch_promos.js`
3. Search specific products via `marktguru search`
4. Return a clean, bulleted report with verification links

---

## 📦 Repo contents

- `SKILL.md` → agent instructions
- `scripts/fetch_promos.js` → category-wide promotion extractor
- `references/` → (optional) additional schemas or templates

---

## ⚡ Manual mode (optional, for power users)

If you are not running this via an assistant, you can run it directly.

<details>
<summary><strong>Step 1 — Login</strong></summary>

```bash
npx marktguru-cli login
```
</details>

<details>
<summary><strong>Step 2 — Set your ZIP</strong></summary>

```bash
npx marktguru-cli set-zip 1050
```
</details>

<details>
<summary><strong>Step 3 — Search for deals</strong></summary>

```bash
# Search for beer deals in your ZIP
npx marktguru-cli search raw "Bier" --json
```
</details>

---

## 💡 Simple troubleshooting

- **“No API key configured”**
  - Run `npx marktguru-cli login` to refresh the session.
- **“No results found”**
  - Try broader terms (e.g., "Wein" instead of "Grüner Veltliner") or check if the product is spelled correctly in German.
- **Wrong location**
  - Use the `--zip` flag or run `set-zip`.

---

If you’re non-technical: **use assistant mode** and just ask in normal language.
