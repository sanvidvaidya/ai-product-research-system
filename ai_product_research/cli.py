"""
Command-Line Interface for AI Product Research System.
"""

import argparse
import sys
import json
from .engine import ProductResearchEngine


def main():
    parser = argparse.ArgumentParser(
        description="AI Product Research & Decision System (PRD Studio) CLI"
    )
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # Command: list-domains
    subparsers.add_parser("list-domains", help="List available research domain presets")

    # Command: synthesize
    synth_parser = subparsers.add_parser("synthesize", help="Synthesize research and generate PRD")
    synth_parser.add_argument("--domain", default="ai-meeting-insights", help="Domain ID preset")
    synth_parser.add_argument("--export", help="Output file path (.md or .json)")

    # Command: rice
    rice_parser = subparsers.add_parser("rice", help="Calculate RICE prioritization score")
    rice_parser.add_argument("--reach", type=int, required=True, help="Estimated audience reach")
    rice_parser.add_argument("--impact", type=float, required=True, help="Impact factor (0.25 - 3.0)")
    rice_parser.add_argument("--confidence", type=float, required=True, help="Confidence factor (0.1 - 1.0)")
    rice_parser.add_argument("--effort", type=float, required=True, help="Effort in person-weeks (> 0)")

    # Command: evaluate
    eval_parser = subparsers.add_parser("evaluate", help="Evaluate Build / Pivot / Abandon scorecard")
    eval_parser.add_argument("--market", type=float, default=8.5, help="Market demand (0-10)")
    eval_parser.add_argument("--tech", type=float, default=8.0, help="Technical feasibility (0-10)")
    eval_parser.add_argument("--defensibility", type=float, default=7.5, help="Competitive defensibility (0-10)")
    eval_parser.add_argument("--monetization", type=float, default=8.0, help="Monetization potential (0-10)")
    eval_parser.add_argument("--fit", type=float, default=8.5, help="Strategic fit (0-10)")

    args = parser.parse_args()
    engine = ProductResearchEngine()

    if args.command == "list-domains":
        domains = engine.list_domains()
        print("\nAvailable Research Domain Presets:")
        for d in domains:
            print(f"  • {d['id']:<24} {d['title']} ({d['tam']})")
        print()

    elif args.command == "synthesize":
        data = engine.synthesize_research(args.domain)
        prd = data["prd"]
        scorecard = data["scorecard"]

        print(f"\n=======================================================")
        print(f"Synthesized Research: {prd.product_name}")
        print(f"Decision Recommendation: {scorecard.recommendation} ({scorecard.overall_score}/100)")
        print(f"=======================================================\n")
        print(f"Features Analyzed: {len(prd.features)}")
        print(f"Personas Mapped:   {len(prd.personas)}")
        print(f"User Stories:      {len(prd.user_stories)}\n")

        if args.export:
            if args.export.endswith(".json"):
                with open(args.export, "w", encoding="utf-8") as f:
                    json.dump(prd.to_dict(), f, indent=2)
            else:
                with open(args.export, "w", encoding="utf-8") as f:
                    f.write(prd.markdown_content)
            print(f"✓ Successfully exported PRD to {args.export}\n")
        else:
            print("Preview of Markdown PRD (first 30 lines):")
            print("----------------------------------------")
            lines = prd.markdown_content.splitlines()[:30]
            print("\n".join(lines))
            print("\n[Use --export <path.md> to save the complete document]\n")

    elif args.command == "rice":
        score = engine.calculate_rice(args.reach, args.impact, args.confidence, args.effort)
        quadrant = engine.classify_quadrant(args.impact, args.effort)
        print(f"\nRICE Prioritization Score: {score}")
        print(f"Strategic 2x2 Quadrant:    {quadrant}\n")

    elif args.command == "evaluate":
        scores = {
            "market_demand": args.market,
            "technical_feasibility": args.tech,
            "competitive_defensibility": args.defensibility,
            "monetization_potential": args.monetization,
            "strategic_fit": args.fit,
        }
        res = engine.evaluate_decision(scores)
        print(f"\n=======================================================")
        print(f"Executive Decision Scorecard: {res.recommendation}")
        print(f"Overall Weighted Score:       {res.overall_score} / 100")
        print(f"Confidence Level:             {res.confidence_level}")
        print(f"=======================================================\n")
        print(f"Summary: {res.executive_summary}\n")
        print("Key Strengths:")
        for s in res.key_strengths:
            print(f"  + {s}")
        print("\nIdentified Risks:")
        for r in res.key_risks:
            print(f"  ! {r}")
        print()

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
