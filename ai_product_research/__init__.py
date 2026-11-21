"""
AI Product Research & Decision System (PRD Studio)
A deterministic and AI-augmented product research, competitive analysis,
prioritization, and PRD generation platform.
"""

__version__ = "1.0.0"
__author__ = "Sanvid Vaidya"

from .models import (
    ProblemDefinition,
    Competitor,
    CompetitiveLandscape,
    Persona,
    Feature,
    PRDDocument,
    DecisionScorecard,
)
from .engine import ProductResearchEngine

__all__ = [
    "ProblemDefinition",
    "Competitor",
    "CompetitiveLandscape",
    "Persona",
    "Feature",
    "PRDDocument",
    "DecisionScorecard",
    "ProductResearchEngine",
]
