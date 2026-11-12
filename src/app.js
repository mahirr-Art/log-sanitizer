(function () {
  "use strict";

  const SAMPLE_LOG = [
    "[2026-11-12 14:22:01] ERROR User auth failed for email: developer.john@testcorp.com",
    "[2026-11-12 14:22:02] DEBUG Outgoing request header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0.s6Kxw5dQ",
    "[2026-11-12 14:22:03] INFO S3 bucket accessed with key AKIAIOSFODNN7EXAMPLE aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "[2026-11-12 14:22:04] DEBUG db connect user=app password=SuperGizli123!",
    "[2026-11-12 14:22:05] WARN Contact support via admin-ops@domain.org, apiKey=3a7b9c1d2e4f5a6b7c8d9e0f1a2b3c4d",
    "[2026-11-12 14:22:06] INFO Callback token eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4ifQ.abc123XYZ received",
  ].join("\n");

  const rawInput = document.getElementById("rawInput");
  const output = document.getElementById("sanitizedOutput");

  document.getElementById("btnSanitize").addEventListener("click", () => {
    const result = window.LogSanitizer.sanitize(rawInput.value);
    output.value = result.sanitizedText;
  });

  document.getElementById("btnSample").addEventListener("click", () => {
    rawInput.value = SAMPLE_LOG;
  });

  document.getElementById("btnClear").addEventListener("click", () => {
    rawInput.value = "";
    output.value = "";
  });
})();
