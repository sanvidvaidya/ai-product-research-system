"""
Product Research Synthesis and PRD Generation Engine.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime
from .models import (
    ProblemDefinition,
    Competitor,
    CompetitiveLandscape,
    Persona,
    Feature,
    UserStory,
    PRDDocument,
    DecisionScorecard,
)


# Curated, domain-specific preset datasets representing realistic industry research
DOMAIN_PRESETS: Dict[str, Dict[str, Any]] = {
    "ai-meeting-insights": {
        "problem": {
            "title": "AI Meeting Insights & Decision Intelligence Studio",
            "tagline": "Turn cross-functional meeting audio into structured decisions, accountable tasks, and project velocity.",
            "problem_statement": "Teams lose critical strategic decisions, owner accountability, and action items in unstructured meeting conversations, causing misaligned execution, redundant follow-ups, and a 23% loss in engineering sprint velocity.",
            "target_users": ["Remote Engineering Teams", "Product Managers", "C-Suite & Executives", "Client Success Managers"],
            "market_opportunity": "The conversational intelligence and meeting productivity market is expanding rapidly as remote/hybrid work solidifies.",
            "tam_usd_billions": 18.5,
            "sam_usd_billions": 4.2,
            "som_usd_billions": 0.85,
            "constraints": [
                "SOC-2 Type II and GDPR data confidentiality compliance",
                "Sub-500ms real-time audio stream buffering latency",
                "Zero data retention for proprietary customer trade secrets without enterprise opt-in",
                "Deterministic calendar integration with Google Workspace and Microsoft 365"
            ],
            "success_metrics": {
                "North Star": "Decision-to-Action Execution Velocity (hours from spoken consensus to closed Jira/Linear ticket)",
                "Weekly Active Users (WAU)": "> 65% cross-team retention at 90 days",
                "Action Item Extraction Accuracy": "> 98.4% verified precision against human meeting notes",
                "Time Saved Per Knowledge Worker": "4.2 hours saved per user weekly on meeting debriefs"
            }
        },
        "competitors": [
            {
                "name": "Otter.ai",
                "category": "Consumer Transcription",
                "market_share_pct": 32.0,
                "pricing_model": "Freemium ($16.99/user/mo)",
                "strengths": ["Strong consumer brand recognition", "Live transcript generation", "Zoom native app integration"],
                "weaknesses": ["Shallow semantic action item extraction", "Lack of enterprise governance", "Poor technical Jira/GitHub ticket synchronization"],
                "differentiation_opportunity": "Deep semantic decision graph with bi-directional project management synchronization and stakeholder commitment tracking.",
                "x_position": -0.6,
                "y_position": -0.4
            },
            {
                "name": "Gong.io",
                "category": "Revenue Intelligence Platform",
                "market_share_pct": 28.0,
                "pricing_model": "Enterprise Contract ($1,400/user/yr)",
                "strengths": ["Extremely deep sales deal analytics", "CRM integration", "Call sentiment analysis"],
                "weaknesses": ["Prohibitively expensive for non-sales teams", "No focus on engineering/product workflows", "Rigid enterprise onboarding"],
                "differentiation_opportunity": "Purpose-built for product, engineering, and cross-functional teams at a lightweight modular SaaS price point.",
                "x_position": 0.8,
                "y_position": 0.7
            },
            {
                "name": "Fireflies.ai",
                "category": "Meeting Assistant Bot",
                "market_share_pct": 18.0,
                "pricing_model": "Per Seat Tiered ($18/seat/mo)",
                "strengths": ["Broad calendar bot presence", "Multi-language support", "API webhooks"],
                "weaknesses": ["Intrusive bot joiner experience", "High false-positive rate on extracted commitments", "Generic bulleted summaries without context"],
                "differentiation_opportunity": "Native botless browser audio capture, verifiable decision audits, and deterministic assignee consensus verification.",
                "x_position": -0.2,
                "y_position": -0.1
            }
        ],
        "moat": "Proprietary causal decision-graph modeling connecting spoken consensus to actual ticket completion, creating high switching costs through longitudinal accountability tracking.",
        "differentiation_summary": "Moves beyond passive meeting transcription into proactive organizational decision accountability and execution intelligence.",
        "market_maturity": "Growth / Consolidating",
        "personas": [
            {
                "id": "persona-1",
                "name": "Sarah Lin",
                "role": "VP of Product / Head of PM",
                "demographics": "37, San Francisco, leading 14 distributed PMs across 3 time zones",
                "daily_workflow": "Attends 6-8 strategy, sprint planning, and executive reviews daily; struggles to track commitments across 20+ Slack channels and Linear boards.",
                "pain_points": [
                    "Key product trade-offs agreed in meetings get forgotten or challenged 2 weeks later",
                    "Spending 8+ hours every Sunday manually assembling leadership executive updates",
                    "Misalignment between engineering architectural decisions and business milestones"
                ],
                "emotional_triggers": [
                    "Frustrated by repeated re-litigation of already-decided roadmap priorities",
                    "Anxious about missing high-stakes client deliverables agreed in verbal conversations"
                ],
                "tech_stack": ["Google Meet", "Slack", "Linear", "Figma", "Notion"],
                "quote": "I spend half my week finding out who promised what to whom, instead of shaping our strategic roadmap."
            },
            {
                "id": "persona-2",
                "name": "Alex Mercer",
                "role": "Staff Software Engineer / Tech Lead",
                "demographics": "32, Austin TX, hybrid remote, leads core platform team",
                "daily_workflow": "Participates in daily standups, architectural reviews, and incident post-mortems; needs uninterrupted deep coding focus blocks.",
                "pain_points": [
                    "Context switching to take notes during critical technical debates",
                    "Action items assigned verbally without tickets being created with clear acceptance criteria",
                    "Vague Jira tickets created by third parties missing the architectural context discussed live"
                ],
                "emotional_triggers": [
                    "Annoyed when bots disrupt private architectural design discussions",
                    "Fatigued by status syncs that could have been an asynchronous digest"
                ],
                "tech_stack": ["Zoom", "GitHub", "Jira", "VS Code", "Terminal"],
                "quote": "If a decision isn't linked to a commit or an issue spec with clear acceptance criteria, it never happened."
            }
        ],
        "features": [
            {
                "id": "feat-1",
                "title": "Deterministic Decision Graph Extraction",
                "description": "Extracts concrete strategic commitments, consensus timestamps, dissents, and owner confirmations directly from dialogue.",
                "category": "Core AI Engine",
                "reach": 15000,
                "impact": 3.0,
                "confidence": 0.9,
                "effort": 3.0,
                "moscow": "Must Have"
            },
            {
                "id": "feat-2",
                "title": "Bi-Directional Project Sync (Linear/Jira/GitHub)",
                "description": "Automatically generates detailed task issues with acceptance criteria, priority, and assignees directly into existing issue trackers.",
                "category": "Integrations",
                "reach": 12000,
                "impact": 2.0,
                "confidence": 0.95,
                "effort": 2.0,
                "moscow": "Must Have"
            },
            {
                "id": "feat-3",
                "title": "Botless Browser Audio & Screen Stream Ingestion",
                "description": "Zero-bot browser extension and desktop audio capture that eliminates embarrassing third-party meeting bots.",
                "category": "Platform & UX",
                "reach": 15000,
                "impact": 2.0,
                "confidence": 0.85,
                "effort": 2.5,
                "moscow": "Must Have"
            },
            {
                "id": "feat-4",
                "title": "Executive Asynchronous Digest & Weekly Radar",
                "description": "Synthesizes multi-meeting strategic trends, unresolved blocker alerts, and team velocity summaries into a 2-minute weekly executive brief.",
                "category": "Reporting",
                "reach": 6000,
                "impact": 2.0,
                "confidence": 0.8,
                "effort": 1.5,
                "moscow": "Should Have"
            },
            {
                "id": "feat-5",
                "title": "Real-Time Agenda Tracker & Time-Keeper",
                "description": "Subtle heads-up display showing active agenda topic duration and nudge when conversation strays from target objective.",
                "category": "In-Meeting Experience",
                "reach": 8000,
                "impact": 1.0,
                "confidence": 0.7,
                "effort": 2.0,
                "moscow": "Could Have"
            },
            {
                "id": "feat-6",
                "title": "Custom Fine-Tuned Voice Clone Summary Readouts",
                "description": "Audio podcast generation of meeting summaries spoken in customized synthetic team voices.",
                "category": "Novelty",
                "reach": 2000,
                "impact": 0.5,
                "confidence": 0.5,
                "effort": 4.5,
                "moscow": "Won't Have"
            }
        ],
        "user_stories": [
            {
                "id": "US-01",
                "title": "Automated Action Item Dispatch to Project Tracker",
                "as_a": "Product Manager",
                "i_want_to": "have meeting action items automatically parsed and synced to Linear with owner and due date",
                "so_that": "I don't have to spend 30 minutes after every meeting writing and assigning tickets.",
                "acceptance_criteria": [
                    "Given a completed team meeting recording containing verbal commitments",
                    "When the synthesis pipeline processes the audio stream",
                    "Then discrete action items are tagged with speaker name, deadline, and context",
                    "And a confirmation drawer appears allowing 1-click dispatch to connected Linear/Jira workspaces."
                ]
            },
            {
                "id": "US-02",
                "title": "Historical Decision Search & Verification",
                "as_a": "Engineering Lead",
                "i_want_to": "search for when and why a specific architectural trade-off was agreed upon",
                "so_that": "we avoid re-opening debates without reviewing original constraints and trade-offs.",
                "acceptance_criteria": [
                    "Given an ongoing design review or planning session",
                    "When the user queries the decision archive for a technical topic (e.g., 'Kafka vs RabbitMQ')",
                    "Then the system returns the exact meeting timestamp, transcript excerpt, and participants who ratified the choice",
                    "And provides an immutable decision record link shareable in Slack or PR reviews."
                ]
            }
        ],
        "technical_architecture": {
            "Audio Ingestion": "WebRTC client-side audio tap + Opus compression streaming to WebSocket worker",
            "Transcription Layer": "Whisper V3 Turbo / Deepgram Nova-2 with dynamic medical/tech vocabulary boosting",
            "Causal Extraction Engine": "Deterministic AST parser + structured JSON schema validation via LLM structured outputs",
            "Storage & Graph DB": "PostgreSQL with pgvector for semantic embeddings + Apache AGE / Neo4j graph for decision lineages",
            "Integrations": "OAuth 2.0 gateway to Google Meet, Zoom, Slack, Linear, Jira, GitHub APIs"
        },
        "telemetry_plan": [
            {"event": "meeting_recorded_started", "properties": "meeting_id, platform, duration_est, participant_count"},
            {"event": "decisions_extracted", "properties": "meeting_id, decision_count, action_item_count, confidence_avg"},
            {"event": "action_item_dispatched", "properties": "destination (linear|jira|github), item_id, latency_ms"},
            {"event": "decision_search_queried", "properties": "query_text, results_count, clickthrough_rank"}
        ],
        "risks": [
            {"risk": "Hallucinated commitments causing incorrect Jira ticket generation", "mitigation": "Human-in-the-loop review drawer before automatic external ticket dispatch + confidence score thresholding (>0.88)."},
            {"risk": "Enterprise security concerns over confidential audio transmission", "mitigation": "SOC-2 Type II audited encryption in transit and at rest, zero model training on customer data, and local encryption keys."},
            {"risk": "Meeting participant resistance to recording technology", "mitigation": "Automated transparent consent banners, individual mute-privacy controls, and opt-out redaction flags."}
        ],
        "rollout": [
            {"phase": "Phase 1: Alpha (Weeks 1-4)", "scope": "Core browser audio capture, local Whisper transcription, and Linear export for 5 design-partner companies."},
            {"phase": "Phase 2: Beta (Weeks 5-8)", "scope": "Jira & GitHub integrations, SOC-2 compliance baseline, decision graph search UI, 100 beta organizations."},
            {"phase": "Phase 3: GA Launch (Weeks 9-12)", "scope": "Self-serve team workspaces, weekly executive radar email digest, enterprise SSO/SAML, and public API."}
        ],
        "scorecard": {
            "market_demand_score": 9.2,
            "technical_feasibility_score": 8.8,
            "competitive_defensibility_score": 8.1,
            "monetization_potential_score": 8.9,
            "strategic_fit_score": 9.4,
            "overall_score": 88.8,
            "recommendation": "BUILD (High Conviction)",
            "confidence_level": "HIGH",
            "executive_summary": "High commercial urgency driven by remote team coordination friction. Differentiating on deterministic decision graphs and direct engineering issue synchronization creates a defensible wedge against generic transcription utilities.",
            "key_strengths": [
                "Massive daily target audience with high willingness-to-pay ($20-40/seat/mo)",
                "Distinct defensible focus on project velocity and decisions rather than passive transcript text",
                "Proven technology feasibility with modern sub-second speech-to-text models"
            ],
            "key_risks": [
                "Competition from native Microsoft Copilot and Zoom AI Companion bundles",
                "Need for strong initial adoption wedge to overcome enterprise IT procurement barriers"
            ],
            "suggested_pivots": [
                "Focus purely on engineering architectural decision records (ADRs) if broader PM market is crowded by incumbents"
            ]
        }
    },
    "fintech-lending": {
        "problem": {
            "title": "Autonomous SME Credit Underwriting & Cashflow Intelligence",
            "tagline": "Real-time algorithmic underwriting and automated working-capital credit lines for SMBs.",
            "problem_statement": "Small and medium businesses face 3-6 week loan approval delays from traditional commercial banks relying on stale annual tax filings, while non-bank lenders charge predatory interest rates exceeding 38% APR.",
            "target_users": ["E-commerce SMB Founders", "B2B SaaS Companies", "Commercial Credit Officers", "Fintech Risk Analysts"],
            "market_opportunity": "Global SMB lending credit gap exceeds $5.2 Trillion, with digital cashflow underwriting capturing market share from legacy lenders.",
            "tam_usd_billions": 48.0,
            "sam_usd_billions": 12.5,
            "som_usd_billions": 2.1,
            "constraints": [
                "Strict lending compliance (FCRA, ECOA, Basel III risk buffers)",
                "Explainable AI mandates (no black-box credit denials; deterministic adverse action reasons)",
                "Real-time banking data pipeline via Plaid/Account Aggregator APIs"
            ],
            "success_metrics": {
                "North Star": "Time-to-Credit-Decision (minutes from bank link to binding offer)",
                "Default Rate (NPL)": "< 1.8% over trailing 12 months",
                "Applicant Conversion Rate": "> 42% completed applications",
                "Cost of Underwriting Per Loan": "Reduced from $1,200 (manual bank audit) to $14 (algorithmic)"
            }
        },
        "competitors": [
            {
                "name": "Kabbage / AmEx Business",
                "category": "Incumbent FinTech Lender",
                "market_share_pct": 35.0,
                "pricing_model": "Monthly Loan Fees (1.5% - 10%)",
                "strengths": ["Huge balance sheet access", "American Express corporate distribution"],
                "weaknesses": ["Slow legacy underwriting backend", "Rigid qualification criteria", "Impersonal customer support"],
                "differentiation_opportunity": "Continuous real-time cashflow telemetry with dynamic credit limits that expand and contract with seasonal revenue.",
                "x_position": -0.7,
                "y_position": 0.5
            },
            {
                "name": "Pipe.com",
                "category": "Recurring Revenue Exchange",
                "market_share_pct": 20.0,
                "pricing_model": "Discounting Spread (2% - 8%)",
                "strengths": ["Clean modern developer UI", "SaaS subscription focus", "Fast integration"],
                "weaknesses": ["Limited to strict contractual recurring revenue", "Excluded physical inventory and transactional SMBs"],
                "differentiation_opportunity": "Universal cashflow scoring accepting multi-channel banking, Shopify, Stripe, and QuickBooks inputs.",
                "x_position": 0.5,
                "y_position": -0.6
            }
        ],
        "moat": "Proprietary continuous cashflow volatility forecasting algorithm trained on cross-merchant transaction streams with zero-latency default risk mitigation.",
        "differentiation_summary": "Delivers instant credit offers with explainable decision receipts and dynamic risk pricing.",
        "market_maturity": "Rapid Growth",
        "personas": [
            {
                "id": "persona-fintech-1",
                "name": "Marcus Vance",
                "role": "Founder & CEO, DTC Apparel Brand",
                "demographics": "34, Chicago, $3.2M Annual GMV, 12 employees",
                "daily_workflow": "Manages inventory purchasing, Facebook/Google ad spend, and supplier payments; faces working capital crunches 60 days before holiday peaks.",
                "pain_points": [
                    "Traditional bank demanded 2 years of profitable tax returns despite 80% YoY revenue growth",
                    "Merchant cash advances take 25% of daily card sales, choking operating cashflow",
                    "Loan application paper forms took 3 weeks with zero status visibility"
                ],
                "emotional_triggers": ["Anxious about stockouts during peak retail season", "Furious at opaque loan rejection letters"],
                "tech_stack": ["Shopify", "Stripe", "QuickBooks Online", "Chase Commercial Banking"],
                "quote": "I have $400k in confirmed pre-orders but can't buy fabric because my bank is still reviewing a tax return from two years ago."
            }
        ],
        "features": [
            {
                "id": "feat-f1",
                "title": "Instant Bank & Accounting Aggregator Ingestion",
                "description": "One-click connection to Plaid, Stripe, and QuickBooks to ingest 24 months of normalized transaction telemetry.",
                "category": "Data Pipeline",
                "reach": 25000,
                "impact": 3.0,
                "confidence": 0.95,
                "effort": 2.5,
                "moscow": "Must Have"
            },
            {
                "id": "feat-f2",
                "title": "Deterministic Cashflow Risk Scoring & Limit Calculation",
                "description": "Calculates debt-service coverage, volatility buffers, and risk-adjusted pricing in under 60 seconds.",
                "category": "Risk Engine",
                "reach": 25000,
                "impact": 3.0,
                "confidence": 0.9,
                "effort": 3.5,
                "moscow": "Must Have"
            },
            {
                "id": "feat-f3",
                "title": "Adverse Action Reason Generator (Explainable AI)",
                "description": "Generates legally compliant FCRA adverse action letters detailing the top 4 factors influencing underwriting decisions.",
                "category": "Compliance",
                "reach": 10000,
                "impact": 2.0,
                "confidence": 0.9,
                "effort": 1.5,
                "moscow": "Must Have"
            },
            {
                "id": "feat-f4",
                "title": "Dynamic Seasonal Credit Line Adjuster",
                "description": "Automatically increases credit limits by up to 50% during verified historical high-revenue months.",
                "category": "Growth",
                "reach": 15000,
                "impact": 2.0,
                "confidence": 0.8,
                "effort": 2.0,
                "moscow": "Should Have"
            }
        ],
        "user_stories": [
            {
                "id": "US-F01",
                "title": "Instant Loan Application via Open Banking",
                "as_a": "SMB Founder",
                "i_want_to": "connect my QuickBooks and business bank account in 2 minutes",
                "so_that": "I can get an immediate credit decision without compiling physical paperwork.",
                "acceptance_criteria": [
                    "Given an authenticated applicant on the portal",
                    "When they link their business bank account via Plaid and accounting platform",
                    "Then the underwriting engine verifies revenue stability and cashflow velocity in < 45 seconds",
                    "And presents a clear, transparent loan offer with APR, fee schedule, and repayment terms."
                ]
            }
        ],
        "technical_architecture": {
            "Data Connectors": "Plaid API, Stripe Connect, QuickBooks Online OAuth",
            "Underwriting Engine": "Python NumPy/Pandas quantitative cashflow modeling + XGBoost ensemble + rule-based regulatory floor gates",
            "Security & Vault": "PCI-DSS Level 1 tokenized banking storage, AWS KMS field-level encryption",
            "Disbursement Rail": "Modern Treasury / Stripe Treasury ACH and FedNow real-time transfers"
        },
        "telemetry_plan": [
            {"event": "onboarding_bank_linked", "properties": "provider, institution_name, transaction_history_months"},
            {"event": "credit_score_computed", "properties": "score_value, risk_bucket, latency_sec"},
            {"event": "loan_offer_accepted", "properties": "loan_amount, interest_rate, term_months"}
        ],
        "risks": [
            {"risk": "Macroeconomic downturn triggering spikes in borrower default rates", "mitigation": "Continuous weekly banking telemetry monitoring with automatic drawdown limits if cash balance drops below 1.5x monthly debt service."},
            {"risk": "Regulatory enforcement around AI bias in credit allocations", "mitigation": "Rigorous fair-lending testing, exclusion of protected demographic indicators, and deterministic rule audits."}
        ],
        "rollout": [
            {"phase": "Phase 1: Controlled Pilot (Months 1-2)", "scope": "Originate $2.5M in working capital lines across 50 vetted e-commerce merchants with 100% balance sheet backing."},
            {"phase": "Phase 2: Scale (Months 3-6)", "scope": "Launch institutional warehouse facility, expand to B2B SaaS verticals, automate real-time ACH repayments."},
            {"phase": "Phase 3: Embedded Lending API (Months 7-12)", "scope": "Provide SDK for B2B marketplaces to offer native checkout financing to their business buyers."}
        ],
        "scorecard": {
            "market_demand_score": 9.5,
            "technical_feasibility_score": 8.2,
            "competitive_defensibility_score": 8.4,
            "monetization_potential_score": 9.6,
            "strategic_fit_score": 9.0,
            "overall_score": 89.4,
            "recommendation": "BUILD (High Conviction)",
            "confidence_level": "HIGH",
            "executive_summary": "Extremely high market demand and attractive unit economics. Strong defensibility can be achieved via proprietary underwriting data network effects, provided regulatory compliance is strictly maintained.",
            "key_strengths": [
                "Massive multi-trillion TAM with broken legacy bank alternatives",
                "High monetization potential via origination fees and interest spreads",
                "Clear quantifiable ROI for borrowers (hours saved + revenue unlocked)"
            ],
            "key_risks": [
                "Credit capital facility requirements and default risk during economic recessions",
                "Heavy regulatory compliance burdens across federal and state lending authorities"
            ],
            "suggested_pivots": [
                "Operate as a pure software underwriting engine for community banks rather than carrying balance sheet risk"
            ]
        }
    }
}


class ProductResearchEngine:
    """Core engine for deterministic research synthesis, RICE scoring, and PRD generation."""

    def __init__(self):
        self.presets = DOMAIN_PRESETS

    def list_domains(self) -> List[Dict[str, str]]:
        """List available research domain presets."""
        return [
            {
                "id": k,
                "title": v["problem"]["title"],
                "tagline": v["problem"]["tagline"],
                "tam": f"${v['problem']['tam_usd_billions']}B"
            }
            for k, v in self.presets.items()
        ]

    def get_domain(self, domain_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve full data for a domain preset."""
        return self.presets.get(domain_id)

    @staticmethod
    def calculate_rice(reach: int, impact: float, confidence: float, effort: float) -> float:
        """Calculate standard RICE prioritization score."""
        if effort <= 0:
            return 0.0
        return round((reach * impact * confidence) / effort, 2)

    @staticmethod
    def classify_quadrant(impact: float, effort: float) -> str:
        """Classify feature into 2x2 Impact vs Effort quadrant."""
        high_impact = impact >= 1.5
        low_effort = effort <= 3.0
        if high_impact and low_effort:
            return "Quick Win"
        elif high_impact and not low_effort:
            return "Strategic Bet"
        elif not high_impact and low_effort:
            return "Fill-in"
        else:
            return "Money Pit"

    def evaluate_decision(
        self,
        scores: Dict[str, float],
        weights: Optional[Dict[str, float]] = None
    ) -> DecisionScorecard:
        """
        Evaluate overall strategic score and produce a Build / Pivot / Abandon recommendation.
        """
        default_weights = {
            "market_demand": 0.25,
            "technical_feasibility": 0.20,
            "competitive_defensibility": 0.20,
            "monetization_potential": 0.20,
            "strategic_fit": 0.15,
        }
        w = weights or default_weights

        m_score = float(scores.get("market_demand", 8.0))
        t_score = float(scores.get("technical_feasibility", 8.0))
        c_score = float(scores.get("competitive_defensibility", 7.5))
        p_score = float(scores.get("monetization_potential", 8.0))
        s_score = float(scores.get("strategic_fit", 8.5))

        overall = (
            m_score * w["market_demand"] +
            t_score * w["technical_feasibility"] +
            c_score * w["competitive_defensibility"] +
            p_score * w["monetization_potential"] +
            s_score * w["strategic_fit"]
        ) * 10.0
        overall = round(overall, 1)

        if overall >= 78.0:
            recommendation = "BUILD (High Conviction)"
            confidence = "HIGH"
            exec_summary = "All strategic evaluation pillars exceed critical viability thresholds. Market demand, defensibility, and technical pathways justify immediate capital allocation and MVP development."
        elif overall >= 60.0:
            recommendation = "PIVOT (Conditional Viability)"
            confidence = "MEDIUM"
            exec_summary = "Core value proposition is viable, but specific friction exists in defensibility, distribution, or technical feasibility. Recommend refining the wedge or target audience before scaling engineering."
        else:
            recommendation = "ABANDON (Unfavorable Dynamics)"
            confidence = "LOW"
            exec_summary = "Multiple fundamental friction points detected across market size, competitive crowding, or unit economics. Risk-to-reward ratio suggests pivoting resources to alternative opportunities."

        strengths = []
        if m_score >= 8.0:
            strengths.append(f"Strong market tailwinds and urgent customer demand (Score: {m_score}/10)")
        if t_score >= 8.0:
            strengths.append(f"Clear, achievable technical architecture with manageable complexity (Score: {t_score}/10)")
        if p_score >= 8.0:
            strengths.append(f"Robust willingness-to-pay and high lifetime value potential (Score: {p_score}/10)")
        if not strengths:
            strengths.append("Foundational initial proof-of-concept demonstrated")

        risks = []
        if c_score < 7.5:
            risks.append(f"Competitive defensibility risk: potential crowding by well-funded incumbents (Score: {c_score}/10)")
        if t_score < 7.0:
            risks.append(f"Elevated technical execution and latency risks (Score: {t_score}/10)")
        if p_score < 7.0:
            risks.append(f"Monetization friction: customer budget constraints or lengthy sales cycles (Score: {p_score}/10)")
        if not risks:
            risks.append("Execution risk during rapid customer onboarding")

        pivots = [
            "Narrow initial vertical focus to a specialized high-pain subsegment",
            "Package core algorithm as an API-first developer tool rather than end-user SaaS",
            "Establish distribution partnerships with existing platform incumbents"
        ]

        return DecisionScorecard(
            market_demand_score=m_score,
            technical_feasibility_score=t_score,
            competitive_defensibility_score=c_score,
            monetization_potential_score=p_score,
            strategic_fit_score=s_score,
            overall_score=overall,
            recommendation=recommendation,
            confidence_level=confidence,
            executive_summary=exec_summary,
            key_strengths=strengths,
            key_risks=risks,
            suggested_pivots=pivots
        )

    def synthesize_research(self, domain_id: str = "ai-meeting-insights") -> Dict[str, Any]:
        """Synthesize a complete research dataset for a domain."""
        raw = self.presets.get(domain_id, self.presets["ai-meeting-insights"])
        
        problem = ProblemDefinition(**raw["problem"])
        competitors = [Competitor(**c) for c in raw["competitors"]]
        landscape = CompetitiveLandscape(
            competitors=competitors,
            primary_moat=raw["moat"],
            differentiation_summary=raw["differentiation_summary"],
            market_maturity=raw["market_maturity"]
        )
        personas = [Persona(**p) for p in raw["personas"]]
        features = [Feature(**f) for f in raw["features"]]
        user_stories = [UserStory(**u) for u in raw["user_stories"]]
        
        scorecard = DecisionScorecard(**raw["scorecard"])

        prd = PRDDocument(
            product_name=problem.title,
            version="1.0.0",
            date=datetime.now().strftime("%Y-%m-%d"),
            author="Sanvid Vaidya",
            problem_statement=problem.problem_statement,
            target_users=problem.target_users,
            goals=[
                "Eliminate manual meeting debriefing and ticket transcription time by > 80%",
                "Establish deterministic consensus and decision records with zero ambiguity",
                "Integrate seamlessly into primary engineering issue tracking workflows"
            ],
            non_goals=[
                "General-purpose consumer video conferencing provider",
                "Passive meeting archive without semantic intelligence or action routing"
            ],
            personas=personas,
            features=features,
            user_stories=user_stories,
            technical_architecture=raw["technical_architecture"],
            telemetry_plan=raw["telemetry_plan"],
            risks_and_mitigations=raw["risks"],
            rollout_phases=raw["rollout"]
        )

        prd.markdown_content = self.generate_prd_markdown(prd)

        return {
            "problem": problem,
            "landscape": landscape,
            "personas": personas,
            "features": features,
            "user_stories": user_stories,
            "prd": prd,
            "scorecard": scorecard
        }

    @staticmethod
    def generate_prd_markdown(prd: PRDDocument) -> str:
        """Format a PRDDocument into clean, comprehensive GitHub-flavored Markdown."""
        lines = [
            f"# Product Requirement Document: {prd.product_name}",
            f"**Version:** {prd.version} | **Date:** {prd.date} | **Author:** {prd.author} | **Status:** Draft / Ready for Review",
            "",
            "---",
            "",
            "## 1. Executive Summary & Problem Statement",
            f"{prd.problem_statement}",
            "",
            "### Target Users & Core Segments",
            "\n".join([f"- **{u}**" for u in prd.target_users]),
            "",
            "## 2. Goals & Non-Goals",
            "### Goals (What we will achieve)",
            "\n".join([f"- [x] {g}" for g in prd.goals]),
            "",
            "### Non-Goals (Explicitly out of scope)",
            "\n".join([f"- [ ] {ng}" for ng in prd.non_goals]),
            "",
            "## 3. User Personas & Empathy Map",
        ]

        for p in prd.personas:
            lines.extend([
                f"### {p.name} — {p.role}",
                f"> *\"{p.quote}\"*",
                f"- **Demographics:** {p.demographics}",
                f"- **Daily Workflow:** {p.daily_workflow}",
                "- **Key Pain Points:**",
                "\n".join([f"  - {pt}" for pt in p.pain_points]),
                f"- **Primary Tech Stack:** {', '.join(p.tech_stack)}",
                ""
            ])

        lines.extend([
            "## 4. Prioritized Feature Matrix (RICE Scored)",
            "| Feature | Category | Reach | Impact | Confidence | Effort | RICE Score | MoSCoW | Quadrant |",
            "| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |"
        ])

        sorted_features = sorted(prd.features, key=lambda x: x.rice_score, reverse=True)
        for f in sorted_features:
            lines.append(
                f"| **{f.title}** | {f.category} | {f.reach:,} | {f.impact}x | {int(f.confidence*100)}% | {f.effort}w | **{f.rice_score}** | {f.moscow} | *{f.quadrant}* |"
            )

        lines.extend([
            "",
            "## 5. Functional Requirements & User Stories",
        ])

        for us in prd.user_stories:
            lines.extend([
                f"### [{us.id}] {us.title}",
                f"**As a** {us.as_a},  ",
                f"**I want to** {us.i_want_to},  ",
                f"**So that** {us.so_that}.",
                "",
                "**Acceptance Criteria (Gherkin Format):**",
                "\n".join([f"- {ac}" for ac in us.acceptance_criteria]),
                ""
            ])

        lines.extend([
            "## 6. Technical Architecture & Data Strategy",
        ])
        for comp, spec in prd.technical_architecture.items():
            lines.append(f"- **{comp}:** {spec}")

        lines.extend([
            "",
            "## 7. Product Telemetry & Analytics Tracking Plan",
            "| Event Name | Tracked Parameters |",
            "| :--- | :--- |"
        ])
        for tel in prd.telemetry_plan:
            lines.append(f"| `{tel['event']}` | `{tel['properties']}` |")

        lines.extend([
            "",
            "## 8. Risks, Dependencies & Mitigations",
        ])
        for r in prd.risks_and_mitigations:
            lines.extend([
                f"- **Identified Risk:** {r['risk']}",
                f"  - **Mitigation Strategy:** {r['mitigation']}"
            ])

        lines.extend([
            "",
            "## 9. Rollout & Phased Deployment Schedule",
        ])
        for ph in prd.rollout_phases:
            lines.append(f"- **{ph['phase']}:** {ph['scope']}")

        lines.append("")
        return "\n".join(lines)
