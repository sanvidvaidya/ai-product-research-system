"""
Data models for the AI Product Research & Decision System.
"""

from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional
import json


@dataclass
class ProblemDefinition:
    title: str
    tagline: str
    problem_statement: str
    target_users: List[str]
    market_opportunity: str
    tam_usd_billions: float
    sam_usd_billions: float
    som_usd_billions: float
    constraints: List[str]
    success_metrics: Dict[str, str]

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Competitor:
    name: str
    category: str
    market_share_pct: float
    pricing_model: str
    strengths: List[str]
    weaknesses: List[str]
    differentiation_opportunity: str
    x_position: float  # -1.0 to 1.0 (e.g. Simple vs Complex, or Low Cost vs Premium)
    y_position: float  # -1.0 to 1.0 (e.g. Point Solution vs Platform, or Manual vs Automated)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class CompetitiveLandscape:
    competitors: List[Competitor]
    primary_moat: str
    differentiation_summary: str
    market_maturity: str

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Persona:
    id: str
    name: str
    role: str
    avatar_url: Optional[str] = None
    demographics: str = ""
    daily_workflow: str = ""
    pain_points: List[str] = field(default_factory=list)
    emotional_triggers: List[str] = field(default_factory=list)
    tech_stack: List[str] = field(default_factory=list)
    quote: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Feature:
    id: str
    title: str
    description: str
    category: str
    reach: int  # Estimated users impacted per period
    impact: float  # 0.25 (minimal), 0.5 (low), 1.0 (medium), 2.0 (high), 3.0 (massive)
    confidence: float  # 0.5 (low), 0.8 (medium), 1.0 (high)
    effort: float  # person-weeks/months
    rice_score: float = 0.0
    moscow: str = "Must Have"  # Must Have, Should Have, Could Have, Won't Have
    quadrant: str = "Quick Win"  # Quick Win, Strategic Bet, Fill-in, Money Pit

    def __post_init__(self):
        if self.effort > 0:
            self.rice_score = round((self.reach * self.impact * self.confidence) / self.effort, 2)
        else:
            self.rice_score = 0.0

        # Categorize quadrant based on impact and effort
        high_impact = self.impact >= 1.5
        low_effort = self.effort <= 3.0
        if high_impact and low_effort:
            self.quadrant = "Quick Win"
        elif high_impact and not low_effort:
            self.quadrant = "Strategic Bet"
        elif not high_impact and low_effort:
            self.quadrant = "Fill-in"
        else:
            self.quadrant = "Money Pit"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class UserStory:
    id: str
    title: str
    as_a: str
    i_want_to: str
    so_that: str
    acceptance_criteria: List[str]  # Given/When/Then

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class PRDDocument:
    product_name: str
    version: str
    date: str
    author: str
    problem_statement: str
    target_users: List[str]
    goals: List[str]
    non_goals: List[str]
    personas: List[Persona]
    features: List[Feature]
    user_stories: List[UserStory]
    technical_architecture: Dict[str, Any]
    telemetry_plan: List[Dict[str, str]]
    risks_and_mitigations: List[Dict[str, str]]
    rollout_phases: List[Dict[str, Any]]
    markdown_content: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DecisionScorecard:
    market_demand_score: float  # 0 - 10
    technical_feasibility_score: float  # 0 - 10
    competitive_defensibility_score: float  # 0 - 10
    monetization_potential_score: float  # 0 - 10
    strategic_fit_score: float  # 0 - 10
    overall_score: float  # Weighted 0 - 100
    recommendation: str  # BUILD | PIVOT | ABANDON
    confidence_level: str  # HIGH | MEDIUM | LOW
    executive_summary: str
    key_strengths: List[str]
    key_risks: List[str]
    suggested_pivots: List[str]

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
