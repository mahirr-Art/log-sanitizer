// Görev 1 kabul kriteri testleri: node --test
const test = require("node:test");
const assert = require("node:assert/strict");
const { sanitize } = require("../src/sanitizer.js");

test("e-posta adresi [REDACTED_EMAIL] olarak maskelenir", () => {
  const { sanitizedText } = sanitize("login failed for admin@company.com at 10:00");
  assert.equal(sanitizedText, "login failed for [REDACTED_EMAIL] at 10:00");
});

test("Bearer token maskelenir, 'Bearer' öneki korunur", () => {
  const { sanitizedText } = sanitize("Authorization: Bearer abc.def-123_XYZ==");
  assert.equal(sanitizedText, "Authorization: Bearer [REDACTED_BEARER_TOKEN]");
});

test("Bağımsız JWT maskelenir", () => {
  const { sanitizedText } = sanitize("token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig_123 ok");
  assert.equal(sanitizedText, "token [REDACTED_JWT] ok");
});

test("AWS access key ve key=value secret maskelenir", () => {
  const { sanitizedText } = sanitize(
    "key AKIAIOSFODNN7EXAMPLE apiKey=3a7b9c1d2e4f5a6b7c8d9e0f1a2b3c4d"
  );
  assert.equal(sanitizedText, "key [REDACTED_API_KEY] apiKey=[REDACTED_API_KEY]");
});

test("password=... değeri maskelenir", () => {
  const { sanitizedText } = sanitize('db user=app password="SuperGizli123!"');
  assert.equal(sanitizedText, 'db user=app password="[REDACTED_PASSWORD]"');
});

test("Hassas veri içermeyen log yapısı bozulmaz", () => {
  const log = "[2026-11-12 14:22:01] INFO Server started on port 8080\nGET /health 200";
  assert.equal(sanitize(log).sanitizedText, log);
});

test("Satır yapısı ve zaman damgaları korunur", () => {
  const log = "[t1] a@b.com\n[t2] Bearer xyz123\n[t3] ok";
  assert.equal(
    sanitize(log).sanitizedText,
    "[t1] [REDACTED_EMAIL]\n[t2] Bearer [REDACTED_BEARER_TOKEN]\n[t3] ok"
  );
});
