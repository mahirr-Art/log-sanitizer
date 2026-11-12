// Görev 2 kabul kriteri testleri: tür bazında sayaçlar doğru hesaplanmalı
const test = require("node:test");
const assert = require("node:assert/strict");
const { sanitize } = require("../src/sanitizer.js");

test("Hassas veri yoksa tüm sayaçlar 0 olur", () => {
  const { counts } = sanitize("INFO server started on port 8080");
  assert.deepEqual(counts, { email: 0, apiKey: 0, token: 0, password: 0, total: 0 });
});

test("Tür bazında sayaçlar ve toplam doğru hesaplanır", () => {
  const log = [
    "user a@b.com and c@d.org",
    "Authorization: Bearer abc123",
    "jwt eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig",
    "key AKIAIOSFODNN7EXAMPLE",
    "apiKey=3a7b9c1d2e4f5a6b7c8d9e0f1a2b3c4d",
    "password=hunter2",
  ].join("\n");

  const { counts } = sanitize(log);
  assert.deepEqual(counts, { email: 2, apiKey: 2, token: 2, password: 1, total: 7 });
});

test("Aynı değer birden çok kural tarafından iki kez sayılmaz", () => {
  // Bearer içindeki JWT yalnızca 1 token olarak sayılmalı
  const { counts, sanitizedText } = sanitize(
    "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig"
  );
  assert.equal(counts.token, 1);
  assert.equal(counts.total, 1);
  assert.equal(sanitizedText, "Authorization: Bearer [REDACTED_BEARER_TOKEN]");
});

test("Toplam, kategori sayaçlarının toplamına eşittir", () => {
  const { counts } = sanitize("x@y.com pwd=1234 secret=abcdefgh12345678");
  assert.equal(counts.total, counts.email + counts.apiKey + counts.token + counts.password);
  assert.equal(counts.total, 3);
});
