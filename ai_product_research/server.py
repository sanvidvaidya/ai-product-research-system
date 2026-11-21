"""
Lightweight REST API Server for AI Product Research System.
Uses Python standard library http.server, zero external runtime dependencies.
"""

import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from .engine import ProductResearchEngine


class ResearchApiHandler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, data: dict):
        response = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(response)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        qs = parse_qs(parsed.query)

        engine = ProductResearchEngine()

        if path == "/api/health":
            self._send_json(200, {
                "status": "ok",
                "service": "AI Product Research System API",
                "version": "1.0.0"
            })
        elif path == "/api/domains":
            self._send_json(200, {
                "domains": engine.list_domains()
            })
        elif path.startswith("/api/synthesize"):
            domain = qs.get("domain", ["ai-meeting-insights"])[0]
            data = engine.synthesize_research(domain)
            self._send_json(200, {
                "domain": domain,
                "problem": data["problem"].to_dict(),
                "landscape": data["landscape"].to_dict(),
                "personas": [p.to_dict() for p in data["personas"]],
                "features": [f.to_dict() for f in data["features"]],
                "user_stories": [u.to_dict() for u in data["user_stories"]],
                "prd": data["prd"].to_dict(),
                "scorecard": data["scorecard"].to_dict()
            })
        else:
            self._send_json(404, {"error": "Not Found", "path": path})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            payload = {}

        engine = ProductResearchEngine()

        if path == "/api/rice":
            reach = int(payload.get("reach", 1000))
            impact = float(payload.get("impact", 1.0))
            confidence = float(payload.get("confidence", 0.8))
            effort = float(payload.get("effort", 2.0))
            score = engine.calculate_rice(reach, impact, confidence, effort)
            quadrant = engine.classify_quadrant(impact, effort)
            self._send_json(200, {
                "reach": reach,
                "impact": impact,
                "confidence": confidence,
                "effort": effort,
                "rice_score": score,
                "quadrant": quadrant
            })
        elif path == "/api/evaluate":
            scores = payload.get("scores", {})
            weights = payload.get("weights")
            scorecard = engine.evaluate_decision(scores, weights)
            self._send_json(200, scorecard.to_dict())
        else:
            self._send_json(404, {"error": "Not Found", "path": path})


def run_server(port: int = 8000, host: str = "0.0.0.0"):
    server = HTTPServer((host, port), ResearchApiHandler)
    print(f"Starting AI Product Research API server on {host}:{port}...")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    run_server()
