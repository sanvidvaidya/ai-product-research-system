import subprocess
import sys
import json
import os
import tempfile


def test_cli_list_domains():
    res = subprocess.run(
        [sys.executable, "-m", "ai_product_research.cli", "list-domains"],
        capture_output=True,
        text=True,
        check=True
    )
    assert "ai-meeting-insights" in res.stdout
    assert "fintech-lending" in res.stdout


def test_cli_rice_calculation():
    res = subprocess.run(
        [sys.executable, "-m", "ai_product_research.cli", "rice", "--reach", "1000", "--impact", "2.0", "--confidence", "0.8", "--effort", "2.0"],
        capture_output=True,
        text=True,
        check=True
    )
    assert "RICE Prioritization Score: 800.0" in res.stdout
    assert "Quick Win" in res.stdout


def test_cli_synthesize_and_export():
    with tempfile.NamedTemporaryFile(suffix=".md", delete=False) as f:
        export_path = f.name

    try:
        res = subprocess.run(
            [sys.executable, "-m", "ai_product_research.cli", "synthesize", "--domain", "ai-meeting-insights", "--export", export_path],
            capture_output=True,
            text=True,
            check=True
        )
        assert "Successfully exported PRD" in res.stdout
        with open(export_path, "r", encoding="utf-8") as f:
            content = f.read()
        assert "AI Meeting Insights & Decision Intelligence Studio" in content
        assert "User Personas & Empathy Map" in content
    finally:
        if os.path.exists(export_path):
            os.remove(export_path)
