# AI Product Research & Decision System (PRD Studio)

[![CI & Quality Gate](https://github.com/sanvidvaidya/ai-product-research-system/actions/workflows/ci.yml/badge.svg)](https://github.com/sanvidvaidya/ai-product-research-system/actions/workflows/ci.yml)
[![Python Version](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.13-blue)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.x-sky)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-indigo)](https://tailwindcss.com/)

A deterministic, research-backed Product Requirement Document (PRD) generator and executive decision intelligence studio. It transforms open-ended product hypotheses and unstructured market signals into structured problem definitions, competitive landscape positioning maps, prioritized feature backlogs (RICE & 2x2 Value Matrix), and exportable Markdown/JSON engineering specifications.

---

## ⚡ Core Architecture & Capabilities

1. **Structured Problem & Market Framing**
   - Quantifiable TAM / SAM / SOM market sizing.
   - Target user archetype definition, technical and regulatory constraints, and North Star metrics.
2. **Competitive Intelligence & 2D Positioning Map**
   - Direct and adjacent competitor intelligence matrices (pricing, market share, strengths, weaknesses).
   - Dynamic 2D positioning map evaluating automation depth against workflow integration.
3. **User Personas & Empathy Mapping**
   - Detailed persona cards with daily workflows, acute friction points, emotional triggers, and existing tech stacks.
4. **Quantitative RICE Scoring & 2x2 Prioritization Matrix**
   - Real-time sliders for Reach, Impact, Confidence, and Effort.
   - Automatic classification into **Quick Wins**, **Strategic Bets**, **Fill-ins**, and **Money Pits**.
5. **Full PRD Document Generator & Export**
   - Automatically builds standardized GitHub-flavored Markdown PRDs containing Gherkin-format acceptance criteria, telemetry schemas, and risk mitigation plans.
   - 1-click Markdown copy and `.md` / `.json` export.
6. **Executive Decision Scorecard**
   - 5-pillar strategic evaluation: Market Demand (25%), Technical Feasibility (20%), Competitive Defensibility (20%), Monetization Potential (20%), and Strategic Fit (15%).
   - Dynamic recommendation engine rendering **BUILD**, **PIVOT**, or **ABANDON** verdicts.
7. **Offline-First Resilience with Optional BYOK**
   - 100% deterministic local execution out-of-the-box with zero third-party API dependencies.
   - Optional BYOK (Bring-Your-Own-Key) integration supporting live LLM refinement.

---

## 🚀 Quickstart

### 1. Interactive Web Application

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To build the production bundle:
```bash
npm run build
```

### 2. Python Package & CLI

Install the Python package locally:

```bash
pip install -e ".[dev]"
```

Use the `product-research` command-line tool:

```bash
# List available research presets
product-research list-domains

# Synthesize full PRD for a domain
product-research synthesize --domain ai-meeting-insights --output meeting_prd.md

# Calculate RICE prioritization score
product-research rice --reach 15000 --impact 3.0 --confidence 0.9 --effort 2.0

# Evaluate strategic Build / Pivot / Abandon scorecard
product-research evaluate --market 9.2 --tech 8.8 --defensibility 8.1 --monetization 8.9 --fit 9.4
```

### 3. Local JSON API Server

Start the zero-dependency standard-library API server:

```bash
python3 -m ai_product_research.server --port 8000
```

Endpoints available:
- `GET /api/health` — Service health status
- `GET /api/domains` — Available research presets
- `GET /api/synthesize?domain=ai-meeting-insights` — Full synthesized PRD and research payload
- `POST /api/rice` — RICE score & quadrant calculation
- `POST /api/evaluate` — Weighted decision scorecard evaluation

---

## 🧪 Testing & Quality Assurance

Run the comprehensive pytest suite:

```bash
pytest -v
```

All 15 backend and CLI integration tests run and pass in under 1 second.

---

## 📄 License

MIT © [Sanvid Vaidya](https://github.com/sanvidvaidya)
