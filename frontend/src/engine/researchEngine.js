/**
 * Deterministic Research Synthesis Engine & Prompt Orchestrator
 * Mirroring the backend Python logic with client-side zero-latency execution.
 */

export const PRESET_DOMAINS = {
  "ai-meeting-insights": {
    id: "ai-meeting-insights",
    title: "AI Meeting Insights & Decision Intelligence Studio",
    tagline: "Turn unstructured meeting recordings into concrete decisions, Linear/Jira tasks, and project velocity.",
    tam_usd_billions: 18.5,
    sam_usd_billions: 4.2,
    som_usd_billions: 0.85,
    problem_statement: "Teams lose critical strategic decisions, owner accountability, and action items in unstructured meeting conversations, causing misaligned execution, redundant follow-ups, and a 23% loss in engineering sprint velocity.",
    target_users: ["Remote Engineering Teams", "Product Managers", "C-Suite & Executives", "Client Success Managers"],
    constraints: [
      "SOC-2 Type II and GDPR data confidentiality compliance",
      "Sub-500ms real-time audio stream buffering latency",
      "Zero customer data retention for model training",
      "Deterministic calendar integration with Google Meet and Zoom"
    ],
    success_metrics: {
      "North Star": "Decision-to-Action Execution Velocity (hours from spoken consensus to closed Jira/Linear ticket)",
      "Weekly Active Retention": "> 65% cross-team retention at 90 days",
      "Action Extraction Accuracy": "> 98.4% verified precision against human meeting notes",
      "Weekly Time Saved": "4.2 hours saved per user on meeting debriefs"
    },
    competitors: [
      {
        name: "Otter.ai",
        category: "Consumer Transcription",
        market_share: 32,
        pricing: "Freemium ($16.99/mo)",
        strengths: ["Strong brand awareness", "Live transcript generation", "Zoom integration"],
        weaknesses: ["Shallow semantic extraction", "No enterprise ticket synchronization", "High false-positive noise"],
        differentiation: "Deep causal decision graphs linking verbal consensus to Jira/Linear ticket completion.",
        x: -0.6,
        y: -0.4
      },
      {
        name: "Gong.io",
        category: "Revenue Intelligence Platform",
        market_share: 28,
        pricing: "Enterprise ($1,400/seat/yr)",
        strengths: ["Deep sales pipeline analytics", "CRM deal synchronization", "High contract value"],
        weaknesses: ["Prohibitively expensive for non-sales teams", "No engineering focus", "Lengthy onboarding"],
        differentiation: "Engineered specifically for cross-functional product & engineering teams at a modern modular price.",
        x: 0.8,
        y: 0.7
      },
      {
        name: "Fireflies.ai",
        category: "Meeting Assistant Bot",
        market_share: 18,
        pricing: "Per Seat Tiered ($18/mo)",
        strengths: ["Broad calendar bot presence", "Multi-language support", "Simple webhooks"],
        weaknesses: ["Intrusive bot joiner experience", "Generic summary bullet points", "No verification audit trail"],
        differentiation: "Botless client-side audio tap, verifiable consensus audits, and automated assignee confirmation.",
        x: -0.2,
        y: -0.1
      }
    ],
    moat: "Proprietary causal decision-graph modeling connecting spoken consensus to actual ticket completion, creating high switching costs through longitudinal accountability tracking.",
    personas: [
      {
        id: "p1",
        name: "Sarah Lin",
        role: "VP of Product / Head of PM",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        demographics: "37, San Francisco, leading 14 distributed PMs across 3 time zones",
        daily_workflow: "Attends 6-8 strategy, sprint planning, and executive reviews daily; struggles to track commitments across 20+ Slack channels and Linear boards.",
        pain_points: [
          "Key product trade-offs agreed in meetings get forgotten or challenged 2 weeks later",
          "Spending 8+ hours every Sunday manually assembling leadership executive updates",
          "Misalignment between engineering architectural decisions and business milestones"
        ],
        emotional_triggers: [
          "Frustrated by repeated re-litigation of already-decided roadmap priorities",
          "Anxious about missing high-stakes client deliverables agreed in verbal conversations"
        ],
        tech_stack: ["Google Meet", "Slack", "Linear", "Figma", "Notion"],
        quote: "I spend half my week finding out who promised what to whom, instead of shaping our strategic roadmap."
      },
      {
        id: "p2",
        name: "Alex Mercer",
        role: "Staff Software Engineer / Tech Lead",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        demographics: "32, Austin TX, hybrid remote, leads core platform team",
        daily_workflow: "Participates in daily standups, architectural reviews, and incident post-mortems; needs uninterrupted deep coding focus blocks.",
        pain_points: [
          "Context switching to take notes during critical technical debates",
          "Action items assigned verbally without tickets being created with clear acceptance criteria",
          "Vague Jira tickets created by third parties missing the architectural context discussed live"
        ],
        emotional_triggers: [
          "Annoyed when bots disrupt private architectural design discussions",
          "Fatigued by status syncs that could have been an asynchronous digest"
        ],
        tech_stack: ["Zoom", "GitHub", "Jira", "VS Code", "Terminal"],
        quote: "If a decision isn't linked to a commit or an issue spec with clear acceptance criteria, it never happened."
      }
    ],
    features: [
      {
        id: "feat-1",
        title: "Deterministic Decision Graph Extraction",
        description: "Extracts concrete strategic commitments, consensus timestamps, dissents, and owner confirmations directly from dialogue.",
        category: "Core AI Engine",
        reach: 15000,
        impact: 3.0,
        confidence: 0.9,
        effort: 3.0,
        moscow: "Must Have"
      },
      {
        id: "feat-2",
        title: "Bi-Directional Project Sync (Linear/Jira/GitHub)",
        description: "Automatically generates detailed task issues with acceptance criteria, priority, and assignees directly into existing issue trackers.",
        category: "Integrations",
        reach: 12000,
        impact: 2.0,
        confidence: 0.95,
        effort: 2.0,
        moscow: "Must Have"
      },
      {
        id: "feat-3",
        title: "Botless Browser Audio & Screen Stream Ingestion",
        description: "Zero-bot browser extension and desktop audio capture that eliminates embarrassing third-party meeting bots.",
        category: "Platform & UX",
        reach: 15000,
        impact: 2.0,
        confidence: 0.85,
        effort: 2.5,
        moscow: "Must Have"
      },
      {
        id: "feat-4",
        title: "Executive Asynchronous Digest & Weekly Radar",
        description: "Synthesizes multi-meeting strategic trends, unresolved blocker alerts, and team velocity summaries into a 2-minute weekly executive brief.",
        category: "Reporting",
        reach: 6000,
        impact: 2.0,
        confidence: 0.8,
        effort: 1.5,
        moscow: "Should Have"
      },
      {
        id: "feat-5",
        title: "Real-Time Agenda Tracker & Time-Keeper",
        description: "Subtle heads-up display showing active agenda topic duration and nudge when conversation strays from target objective.",
        category: "In-Meeting Experience",
        reach: 8000,
        impact: 1.0,
        confidence: 0.7,
        effort: 2.0,
        moscow: "Could Have"
      },
      {
        id: "feat-6",
        title: "Custom Fine-Tuned Voice Clone Summary Readouts",
        description: "Audio podcast generation of meeting summaries spoken in customized synthetic team voices.",
        category: "Novelty",
        reach: 2000,
        impact: 0.5,
        confidence: 0.5,
        effort: 4.5,
        moscow: "Won't Have"
      }
    ],
    user_stories: [
      {
        id: "US-01",
        title: "Automated Action Item Dispatch to Project Tracker",
        as_a: "Product Manager",
        i_want_to: "have meeting action items automatically parsed and synced to Linear with owner and due date",
        so_that: "I don't have to spend 30 minutes after every meeting writing and assigning tickets.",
        acceptance_criteria: [
          "Given a completed team meeting recording containing verbal commitments",
          "When the synthesis pipeline processes the audio stream",
          "Then discrete action items are tagged with speaker name, deadline, and context",
          "And a confirmation drawer appears allowing 1-click dispatch to connected Linear/Jira workspaces."
        ]
      },
      {
        id: "US-02",
        title: "Historical Decision Search & Verification",
        as_a: "Engineering Lead",
        i_want_to: "search for when and why a specific architectural trade-off was agreed upon",
        so_that: "we avoid re-opening debates without reviewing original constraints and trade-offs.",
        acceptance_criteria: [
          "Given an ongoing design review or planning session",
          "When the user queries the decision archive for a technical topic (e.g., 'Kafka vs RabbitMQ')",
          "Then the system returns the exact meeting timestamp, transcript excerpt, and participants who ratified the choice",
          "And provides an immutable decision record link shareable in Slack or PR reviews."
        ]
      }
    ],
    technical_architecture: {
      "Audio Ingestion": "WebRTC client-side audio tap + Opus compression streaming to WebSocket worker",
      "Transcription Layer": "Whisper V3 Turbo / Deepgram Nova-2 with dynamic medical/tech vocabulary boosting",
      "Causal Extraction Engine": "Deterministic AST parser + structured JSON schema validation via LLM structured outputs",
      "Storage & Graph DB": "PostgreSQL with pgvector for semantic embeddings + Apache AGE / Neo4j graph for decision lineages",
      "Integrations": "OAuth 2.0 gateway to Google Meet, Zoom, Slack, Linear, Jira, GitHub APIs"
    },
    telemetry_plan: [
      { event: "meeting_recorded_started", properties: "meeting_id, platform, duration_est, participant_count" },
      { event: "decisions_extracted", properties: "meeting_id, decision_count, action_item_count, confidence_avg" },
      { event: "action_item_dispatched", properties: "destination (linear|jira|github), item_id, latency_ms" },
      { event: "decision_search_queried", properties: "query_text, results_count, clickthrough_rank" }
    ],
    risks: [
      { risk: "Hallucinated commitments causing incorrect Jira ticket generation", mitigation: "Human-in-the-loop review drawer before automatic external ticket dispatch + confidence score thresholding (>0.88)." },
      { risk: "Enterprise security concerns over confidential audio transmission", mitigation: "SOC-2 Type II audited encryption in transit and at rest, zero model training on customer data, and local encryption keys." },
      { risk: "Meeting participant resistance to recording technology", mitigation: "Automated transparent consent banners, individual mute-privacy controls, and opt-out redaction flags." }
    ],
    rollout: [
      { phase: "Phase 1: Alpha (Weeks 1-4)", scope: "Core browser audio capture, local Whisper transcription, and Linear export for 5 design-partner companies." },
      { phase: "Phase 2: Beta (Weeks 5-8)", scope: "Jira & GitHub integrations, SOC-2 compliance baseline, decision graph search UI, 100 beta organizations." },
      { phase: "Phase 3: GA Launch (Weeks 9-12)", scope: "Self-serve team workspaces, weekly executive radar email digest, enterprise SSO/SAML, and public API." }
    ],
    scorecard: {
      market_demand: 9.2,
      technical_feasibility: 8.8,
      competitive_defensibility: 8.1,
      monetization_potential: 8.9,
      strategic_fit: 9.4,
      overall_score: 88.8,
      recommendation: "BUILD (High Conviction)",
      confidence: "HIGH",
      executive_summary: "High commercial urgency driven by remote team coordination friction. Differentiating on deterministic decision graphs and direct engineering issue synchronization creates a defensible wedge against generic transcription utilities.",
      key_strengths: [
        "Massive daily target audience with high willingness-to-pay ($20-40/seat/mo)",
        "Distinct defensible focus on project velocity and decisions rather than passive transcript text",
        "Proven technology feasibility with modern sub-second speech-to-text models"
      ],
      key_risks: [
        "Competition from native Microsoft Copilot and Zoom AI Companion bundles",
        "Need for strong initial adoption wedge to overcome enterprise IT procurement barriers"
      ],
      suggested_pivots: [
        "Focus purely on engineering architectural decision records (ADRs) if broader PM market is crowded by incumbents"
      ]
    }
  },
  "fintech-lending": {
    id: "fintech-lending",
    title: "Autonomous SME Credit Underwriting & Cashflow Intelligence",
    tagline: "Real-time algorithmic underwriting and automated working-capital credit lines for high-growth SMBs.",
    tam_usd_billions: 48.0,
    sam_usd_billions: 12.5,
    som_usd_billions: 2.1,
    problem_statement: "Small businesses face 3-6 week loan approval delays from traditional commercial banks relying on stale annual tax filings, while non-bank lenders charge predatory interest rates exceeding 38% APR.",
    target_users: ["E-commerce SMB Founders", "B2B SaaS Companies", "Commercial Credit Officers", "Fintech Risk Analysts"],
    constraints: [
      "Strict lending compliance (FCRA, ECOA, Basel III risk buffers)",
      "Explainable AI mandates (no black-box credit denials; deterministic adverse action reasons)",
      "Real-time banking data pipeline via Plaid/Account Aggregator APIs"
    ],
    success_metrics: {
      "North Star": "Time-to-Credit-Decision (minutes from bank link to binding offer)",
      "Default Rate (NPL)": "< 1.8% over trailing 12 months",
      "Applicant Conversion Rate": "> 42% completed applications",
      "Underwriting Cost Per Loan": "Reduced from $1,200 (manual bank audit) to $14 (algorithmic)"
    },
    competitors: [
      {
        name: "Kabbage / AmEx Business",
        category: "Incumbent FinTech Lender",
        market_share: 35,
        pricing: "Monthly Loan Fees (1.5% - 10%)",
        strengths: ["Huge balance sheet access", "American Express corporate distribution"],
        weaknesses: ["Slow legacy underwriting backend", "Rigid qualification criteria", "Impersonal customer support"],
        differentiation: "Continuous real-time cashflow telemetry with dynamic credit limits that expand and contract with seasonal revenue.",
        x: -0.7,
        y: 0.5
      },
      {
        name: "Pipe.com",
        category: "Recurring Revenue Exchange",
        market_share: 20,
        pricing: "Discounting Spread (2% - 8%)",
        strengths: ["Clean modern developer UI", "SaaS subscription focus", "Fast integration"],
        weaknesses: ["Limited to strict contractual recurring revenue", "Excluded physical inventory and transactional SMBs"],
        differentiation: "Universal cashflow scoring accepting multi-channel banking, Shopify, Stripe, and QuickBooks inputs.",
        x: 0.5,
        y: -0.6
      }
    ],
    moat: "Proprietary continuous cashflow volatility forecasting algorithm trained on cross-merchant transaction streams with zero-latency default risk mitigation.",
    personas: [
      {
        id: "p-fintech-1",
        name: "Marcus Vance",
        role: "Founder & CEO, DTC Apparel Brand",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        demographics: "34, Chicago, $3.2M Annual GMV, 12 employees",
        daily_workflow: "Manages inventory purchasing, Facebook/Google ad spend, and supplier payments; faces working capital crunches 60 days before holiday peaks.",
        pain_points: [
          "Traditional bank demanded 2 years of profitable tax returns despite 80% YoY revenue growth",
          "Merchant cash advances take 25% of daily card sales, choking operating cashflow",
          "Loan application paper forms took 3 weeks with zero status visibility"
        ],
        emotional_triggers: ["Anxious about stockouts during peak retail season", "Furious at opaque loan rejection letters"],
        tech_stack: ["Shopify", "Stripe", "QuickBooks Online", "Chase Commercial Banking"],
        quote: "I have $400k in confirmed pre-orders but can't buy fabric because my bank is still reviewing a tax return from two years ago."
      }
    ],
    features: [
      {
        id: "feat-f1",
        title: "Instant Bank & Accounting Aggregator Ingestion",
        description: "One-click connection to Plaid, Stripe, and QuickBooks to ingest 24 months of normalized transaction telemetry.",
        category: "Data Pipeline",
        reach: 25000,
        impact: 3.0,
        confidence: 0.95,
        effort: 2.5,
        moscow: "Must Have"
      },
      {
        id: "feat-f2",
        title: "Deterministic Cashflow Risk Scoring & Limit Calculation",
        description: "Calculates debt-service coverage, volatility buffers, and risk-adjusted pricing in under 60 seconds.",
        category: "Risk Engine",
        reach: 25000,
        impact: 3.0,
        confidence: 0.9,
        effort: 3.5,
        moscow: "Must Have"
      },
      {
        id: "feat-f3",
        title: "Adverse Action Reason Generator (Explainable AI)",
        description: "Generates legally compliant FCRA adverse action letters detailing the top 4 factors influencing underwriting decisions.",
        category: "Compliance",
        reach: 10000,
        impact: 2.0,
        confidence: 0.9,
        effort: 1.5,
        moscow: "Must Have"
      },
      {
        id: "feat-f4",
        title: "Dynamic Seasonal Credit Line Adjuster",
        description: "Automatically increases credit limits by up to 50% during verified historical high-revenue months.",
        category: "Growth",
        reach: 15000,
        impact: 2.0,
        confidence: 0.8,
        effort: 2.0,
        moscow: "Should Have"
      }
    ],
    user_stories: [
      {
        id: "US-F01",
        title: "Instant Loan Application via Open Banking",
        as_a: "SMB Founder",
        i_want_to: "connect my QuickBooks and business bank account in 2 minutes",
        so_that: "I can get an immediate credit decision without compiling physical paperwork.",
        acceptance_criteria: [
          "Given an authenticated applicant on the portal",
          "When they link their business bank account via Plaid and accounting platform",
          "Then the underwriting engine verifies revenue stability and cashflow velocity in < 45 seconds",
          "And presents a clear, transparent loan offer with APR, fee schedule, and repayment terms."
        ]
      }
    ],
    technical_architecture: {
      "Data Connectors": "Plaid API, Stripe Connect, QuickBooks Online OAuth",
      "Underwriting Engine": "Python quantitative cashflow modeling + XGBoost ensemble + rule-based regulatory floor gates",
      "Security & Vault": "PCI-DSS Level 1 tokenized banking storage, AWS KMS field-level encryption",
      "Disbursement Rail": "Modern Treasury / Stripe Treasury ACH and FedNow real-time transfers"
    },
    telemetry_plan: [
      { event: "onboarding_bank_linked", properties: "provider, institution_name, transaction_history_months" },
      { event: "credit_score_computed", properties: "score_value, risk_bucket, latency_sec" },
      { event: "loan_offer_accepted", properties: "loan_amount, interest_rate, term_months" }
    ],
    risks: [
      { risk: "Macroeconomic downturn triggering spikes in borrower default rates", mitigation: "Continuous weekly banking telemetry monitoring with automatic drawdown limits if cash balance drops below 1.5x monthly debt service." },
      { risk: "Regulatory enforcement around AI bias in credit allocations", mitigation: "Rigorous fair-lending testing, exclusion of protected demographic indicators, and deterministic rule audits." }
    ],
    rollout: [
      { phase: "Phase 1: Controlled Pilot (Months 1-2)", scope: "Originate $2.5M in working capital lines across 50 vetted e-commerce merchants with 100% balance sheet backing." },
      { phase: "Phase 2: Scale (Months 3-6)", scope: "Launch institutional warehouse facility, expand to B2B SaaS verticals, automate real-time ACH repayments." },
      { phase: "Phase 3: Embedded Lending API (Months 7-12)", scope: "Provide SDK for B2B marketplaces to offer native checkout financing to their business buyers." }
    ],
    scorecard: {
      market_demand: 9.5,
      technical_feasibility: 8.2,
      competitive_defensibility: 8.4,
      monetization_potential: 9.6,
      strategic_fit: 9.0,
      overall_score: 89.4,
      recommendation: "BUILD (High Conviction)",
      confidence: "HIGH",
      executive_summary: "Extremely high market demand and attractive unit economics. Strong defensibility can be achieved via proprietary underwriting data network effects, provided regulatory compliance is strictly maintained.",
      key_strengths: [
        "Massive multi-trillion TAM with broken legacy bank alternatives",
        "High monetization potential via origination fees and interest spreads",
        "Clear quantifiable ROI for borrowers (hours saved + revenue unlocked)"
      ],
      key_risks: [
        "Credit capital facility requirements and default risk during economic recessions",
        "Heavy regulatory compliance burdens across federal and state lending authorities"
      ],
      suggested_pivots: [
        "Operate as a pure software underwriting engine for community banks rather than carrying balance sheet risk"
      ]
    }
  }
};

/**
 * Calculates RICE score for given metrics.
 */
export function calculateRiceScore(reach, impact, confidence, effort) {
  if (effort <= 0) return 0;
  return Number(((reach * impact * confidence) / effort).toFixed(2));
}

/**
 * Determines 2x2 Impact vs Effort quadrant.
 */
export function determineQuadrant(impact, effort) {
  const highImpact = impact >= 1.5;
  const lowEffort = effort <= 3.0;

  if (highImpact && lowEffort) return "Quick Win";
  if (highImpact && !lowEffort) return "Strategic Bet";
  if (!highImpact && lowEffort) return "Fill-in";
  return "Money Pit";
}

/**
 * Evaluates the 5-pillar strategic decision scorecard.
 */
export function evaluateDecisionScorecard(scores, customWeights = null) {
  const weights = customWeights || {
    market_demand: 0.25,
    technical_feasibility: 0.20,
    competitive_defensibility: 0.20,
    monetization_potential: 0.20,
    strategic_fit: 0.15,
  };

  const m = Number(scores.market_demand || 8.0);
  const t = Number(scores.technical_feasibility || 8.0);
  const c = Number(scores.competitive_defensibility || 7.5);
  const p = Number(scores.monetization_potential || 8.0);
  const s = Number(scores.strategic_fit || 8.5);

  const overall = Number((
    (m * weights.market_demand +
     t * weights.technical_feasibility +
     c * weights.competitive_defensibility +
     p * weights.monetization_potential +
     s * weights.strategic_fit) * 10
  ).toFixed(1));

  let recommendation = "BUILD (High Conviction)";
  let confidence = "HIGH";
  let summary = "All strategic evaluation pillars exceed critical viability thresholds. Market demand, defensibility, and technical pathways justify immediate capital allocation and MVP development.";

  if (overall >= 78.0) {
    recommendation = "BUILD (High Conviction)";
    confidence = "HIGH";
  } else if (overall >= 60.0) {
    recommendation = "PIVOT (Conditional Viability)";
    confidence = "MEDIUM";
    summary = "Core value proposition is viable, but specific friction exists in defensibility, distribution, or technical feasibility. Recommend refining the wedge or target audience before scaling engineering.";
  } else {
    recommendation = "ABANDON (Unfavorable Dynamics)";
    confidence = "LOW";
    summary = "Multiple fundamental friction points detected across market size, competitive crowding, or unit economics. Risk-to-reward ratio suggests pivoting resources to alternative opportunities.";
  }

  const strengths = [];
  if (m >= 8.0) strengths.push(`Strong market tailwinds and urgent customer demand (${m}/10)`);
  if (t >= 8.0) strengths.push(`Clear, achievable technical architecture with manageable complexity (${t}/10)`);
  if (p >= 8.0) strengths.push(`Robust willingness-to-pay and high lifetime value potential (${p}/10)`);
  if (strengths.length === 0) strengths.push("Initial proof-of-concept demonstrated in core niche");

  const risks = [];
  if (c < 7.5) risks.push(`Competitive defensibility risk: potential crowding by well-funded incumbents (${c}/10)`);
  if (t < 7.0) risks.push(`Elevated technical execution and latency risks (${t}/10)`);
  if (p < 7.0) risks.push(`Monetization friction: customer budget constraints or lengthy sales cycles (${p}/10)`);
  if (risks.length === 0) risks.push("Execution risk during rapid customer onboarding");

  const pivots = [
    "Narrow initial vertical focus to a specialized high-pain subsegment",
    "Package core algorithm as an API-first developer tool rather than end-user SaaS",
    "Establish distribution partnerships with existing platform incumbents"
  ];

  return {
    scores: { market_demand: m, technical_feasibility: t, competitive_defensibility: c, monetization_potential: p, strategic_fit: s },
    overall_score: overall,
    recommendation,
    confidence,
    summary,
    strengths,
    risks,
    pivots
  };
}

/**
 * Builds clean GitHub-flavored Markdown PRD from structured research state.
 */
export function buildMarkdownPRD(state) {
  const dateStr = new Date().toISOString().split("T")[0];
  const sortedFeatures = [...(state.features || [])].sort((a, b) => (b.rice_score || 0) - (a.rice_score || 0));

  let md = `# Product Requirement Document: ${state.title}\n`;
  md += `**Version:** 1.0.0 | **Date:** ${dateStr} | **Author:** Sanvid Vaidya | **Status:** Draft / Ready for Review\n\n`;
  md += `---\n\n`;

  md += `## 1. Executive Summary & Problem Statement\n`;
  md += `${state.problem_statement}\n\n`;

  md += `### Target Users & Core Segments\n`;
  (state.target_users || []).forEach(u => {
    md += `- **${u}**\n`;
  });
  md += `\n`;

  md += `## 2. Market Sizing (TAM / SAM / SOM)\n`;
  md += `- **Total Addressable Market (TAM):** $${state.tam_usd_billions || 0} Billion\n`;
  md += `- **Serviceable Addressable Market (SAM):** $${state.sam_usd_billions || 0} Billion\n`;
  md += `- **Serviceable Obtainable Market (SOM):** $${state.som_usd_billions || 0} Billion\n\n`;

  md += `## 3. Core Constraints & Success Metrics\n`;
  md += `### Constraints\n`;
  (state.constraints || []).forEach(c => {
    md += `- ${c}\n`;
  });
  md += `\n### Success Metrics (North Star & KPIs)\n`;
  Object.entries(state.success_metrics || {}).forEach(([k, v]) => {
    md += `- **${k}:** ${v}\n`;
  });
  md += `\n`;

  md += `## 4. User Personas & Empathy Map\n`;
  (state.personas || []).forEach(p => {
    md += `### ${p.name} — ${p.role}\n`;
    if (p.quote) md += `> *"${p.quote}"*\n\n`;
    md += `- **Demographics:** ${p.demographics}\n`;
    md += `- **Daily Workflow:** ${p.daily_workflow}\n`;
    md += `- **Key Pain Points:**\n`;
    (p.pain_points || []).forEach(pt => {
      md += `  - ${pt}\n`;
    });
    md += `- **Primary Tech Stack:** ${(p.tech_stack || []).join(", ")}\n\n`;
  });

  md += `## 5. Prioritized Feature Matrix (RICE Scored)\n`;
  md += `| Feature | Category | Reach | Impact | Confidence | Effort | RICE Score | MoSCoW | Quadrant |\n`;
  md += `| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;
  sortedFeatures.forEach(f => {
    md += `| **${f.title}** | ${f.category} | ${(f.reach || 0).toLocaleString()} | ${f.impact}x | ${Math.round((f.confidence || 0.8) * 100)}% | ${f.effort}w | **${f.rice_score || 0}** | ${f.moscow} | *${f.quadrant}* |\n`;
  });
  md += `\n`;

  md += `## 6. Functional Requirements & User Stories\n`;
  (state.user_stories || []).forEach(us => {
    md += `### [${us.id}] ${us.title}\n`;
    md += `**As a** ${us.as_a},  \n`;
    md += `**I want to** ${us.i_want_to},  \n`;
    md += `**So that** ${us.so_that}.\n\n`;
    md += `**Acceptance Criteria (Gherkin Format):**\n`;
    (us.acceptance_criteria || []).forEach(ac => {
      md += `- ${ac}\n`;
    });
    md += `\n`;
  });

  md += `## 7. Technical Architecture & Data Strategy\n`;
  Object.entries(state.technical_architecture || {}).forEach(([k, v]) => {
    md += `- **${k}:** ${v}\n`;
  });
  md += `\n`;

  md += `## 8. Telemetry & Product Analytics Plan\n`;
  md += `| Event Name | Tracked Parameters |\n`;
  md += `| :--- | :--- |\n`;
  (state.telemetry_plan || []).forEach(t => {
    md += `| \`${t.event}\` | \`${t.properties}\` |\n`;
  });
  md += `\n`;

  md += `## 9. Risks, Dependencies & Mitigations\n`;
  (state.risks || []).forEach(r => {
    md += `- **Identified Risk:** ${r.risk}\n`;
    md += `  - **Mitigation Strategy:** ${r.mitigation}\n`;
  });
  md += `\n`;

  md += `## 10. Phased Rollout Schedule\n`;
  (state.rollout || []).forEach(ph => {
    md += `- **${ph.phase}:** ${ph.scope}\n`;
  });
  md += `\n`;

  return md;
}
