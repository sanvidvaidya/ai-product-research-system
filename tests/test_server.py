"""
Tests for the ResearchApiHandler server endpoints.
"""

import json
import threading
from http.server import HTTPServer
import urllib.request
import pytest
from ai_product_research.server import ResearchApiHandler


@pytest.fixture(scope="module")
def test_server():
    server = HTTPServer(("127.0.0.1", 0), ResearchApiHandler)
    port = server.server_port
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield f"http://127.0.0.1:{port}"
    server.shutdown()


def test_server_health(test_server):
    with urllib.request.urlopen(f"{test_server}/api/health") as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert data["status"] == "ok"
        assert "version" in data


def test_server_domains(test_server):
    with urllib.request.urlopen(f"{test_server}/api/domains") as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert "domains" in data
        ids = [d["id"] for d in data["domains"]]
        assert "ai-meeting-insights" in ids


def test_server_synthesize(test_server):
    with urllib.request.urlopen(f"{test_server}/api/synthesize?domain=ai-meeting-insights") as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert data["domain"] == "ai-meeting-insights"
        assert "problem" in data
        assert "personas" in data
        assert "prd" in data


def test_server_rice_post(test_server):
    payload = json.dumps({
        "reach": 12000,
        "impact": 2.5,
        "confidence": 0.9,
        "effort": 1.5
    }).encode()
    req = urllib.request.Request(
        f"{test_server}/api/rice",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert data["rice_score"] == 18000.0
        assert data["quadrant"] == "Quick Win"


def test_server_evaluate_post(test_server):
    payload = json.dumps({
        "scores": {
            "market_demand": 9.2,
            "technical_feasibility": 8.8,
            "competitive_defensibility": 8.0,
            "monetization_potential": 8.5,
            "strategic_fit": 9.0
        }
    }).encode()
    req = urllib.request.Request(
        f"{test_server}/api/evaluate",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode())
        assert "overall_score" in data
        assert "BUILD" in data["recommendation"]
