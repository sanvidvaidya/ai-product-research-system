import pytest
from ai_product_research.engine import ProductResearchEngine


def test_list_domains():
    engine = ProductResearchEngine()
    domains = engine.list_domains()
    assert len(domains) >= 2
    domain_ids = [d["id"] for d in domains]
    assert "ai-meeting-insights" in domain_ids
    assert "fintech-lending" in domain_ids


def test_synthesize_ai_meeting_insights():
    engine = ProductResearchEngine()
    data = engine.synthesize_research("ai-meeting-insights")
    assert "problem" in data
    assert "landscape" in data
    assert "personas" in data
    assert "features" in data
    assert "prd" in data
    assert "scorecard" in data

    prd = data["prd"]
    assert prd.product_name == "AI Meeting Insights & Decision Intelligence Studio"
    assert len(prd.personas) >= 2
    assert len(prd.features) >= 4
    assert len(prd.user_stories) >= 2
    assert "Executive Summary" in prd.markdown_content
    assert "Prioritized Feature Matrix" in prd.markdown_content


def test_calculate_rice():
    engine = ProductResearchEngine()
    score = engine.calculate_rice(reach=5000, impact=3.0, confidence=0.8, effort=2.0)
    # (5000 * 3.0 * 0.8) / 2.0 = 6000.0
    assert score == 6000.0

    # Zero effort handling
    assert engine.calculate_rice(reach=5000, impact=3.0, confidence=0.8, effort=0) == 0.0


def test_evaluate_decision_build():
    engine = ProductResearchEngine()
    scores = {
        "market_demand": 9.0,
        "technical_feasibility": 8.5,
        "competitive_defensibility": 8.0,
        "monetization_potential": 9.0,
        "strategic_fit": 9.0
    }
    card = engine.evaluate_decision(scores)
    assert card.recommendation.startswith("BUILD")
    assert card.overall_score >= 80.0
    assert card.confidence_level == "HIGH"
    assert len(card.key_strengths) > 0


def test_evaluate_decision_pivot_and_abandon():
    engine = ProductResearchEngine()
    # Medium scores -> PIVOT
    pivot_scores = {
        "market_demand": 6.5,
        "technical_feasibility": 7.0,
        "competitive_defensibility": 6.0,
        "monetization_potential": 6.5,
        "strategic_fit": 7.0
    }
    pivot_card = engine.evaluate_decision(pivot_scores)
    assert pivot_card.recommendation.startswith("PIVOT")

    # Low scores -> ABANDON
    abandon_scores = {
        "market_demand": 4.0,
        "technical_feasibility": 4.0,
        "competitive_defensibility": 3.0,
        "monetization_potential": 4.0,
        "strategic_fit": 4.0
    }
    abandon_card = engine.evaluate_decision(abandon_scores)
    assert abandon_card.recommendation.startswith("ABANDON")
