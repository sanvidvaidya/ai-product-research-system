import pytest
from ai_product_research.models import (
    ProblemDefinition,
    Competitor,
    CompetitiveLandscape,
    Persona,
    Feature,
    UserStory,
    PRDDocument,
    DecisionScorecard,
)


def test_problem_definition_to_dict():
    prob = ProblemDefinition(
        title="Test App",
        tagline="A test tagline",
        problem_statement="Test statement",
        target_users=["Devs"],
        market_opportunity="Large",
        tam_usd_billions=10.0,
        sam_usd_billions=2.0,
        som_usd_billions=0.5,
        constraints=["Time"],
        success_metrics={"North Star": "DAU"}
    )
    d = prob.to_dict()
    assert d["title"] == "Test App"
    assert d["tam_usd_billions"] == 10.0
    assert "Devs" in d["target_users"]


def test_feature_rice_and_quadrant_calculation():
    # High impact (2.0), low effort (2.0) -> Quick Win
    f1 = Feature(
        id="f1",
        title="Feature 1",
        description="Desc",
        category="Core",
        reach=1000,
        impact=2.0,
        confidence=0.8,
        effort=2.0
    )
    # (1000 * 2.0 * 0.8) / 2.0 = 800.0
    assert f1.rice_score == 800.0
    assert f1.quadrant == "Quick Win"

    # High impact (2.0), high effort (4.0) -> Strategic Bet
    f2 = Feature(
        id="f2",
        title="Feature 2",
        description="Desc",
        category="Core",
        reach=1000,
        impact=2.0,
        confidence=0.8,
        effort=4.0
    )
    assert f2.quadrant == "Strategic Bet"

    # Low impact (1.0), low effort (2.0) -> Fill-in
    f3 = Feature(
        id="f3",
        title="Feature 3",
        description="Desc",
        category="Core",
        reach=1000,
        impact=1.0,
        confidence=0.8,
        effort=2.0
    )
    assert f3.quadrant == "Fill-in"

    # Low impact (1.0), high effort (5.0) -> Money Pit
    f4 = Feature(
        id="f4",
        title="Feature 4",
        description="Desc",
        category="Core",
        reach=1000,
        impact=1.0,
        confidence=0.8,
        effort=5.0
    )
    assert f4.quadrant == "Money Pit"
