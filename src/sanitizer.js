/**
 * LogSanitizer - Hassas veri tespit ve maskeleme motoru.
 * Hem tarayıcıda (window.LogSanitizer) hem Node.js'te (require) çalışır.
 */
(function (root) {
  "use strict";

  // Kurallar sırayla uygulanır. Sıra önemlidir: önce daha spesifik kalıplar
  // (Bearer, JWT, bilinen anahtar formatları), sonra genel kalıplar çalışır.
  // (?!\[REDACTED) ifadesi zaten maskelenmiş değerlerin tekrar işlenmesini önler.
  const RULES = [
    {
      id: "bearer",
      category: "token",
      regex: /(\bBearer\s+)(?!\[REDACTED)[A-Za-z0-9\-._~+/]+=*/gi,
      replace: (m, prefix) => prefix + "[REDACTED_BEARER_TOKEN]",
    },
    {
      id: "jwt",
      category: "token",
      regex: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
      replace: () => "[REDACTED_JWT]",
    },
    {
      id: "aws-access-key",
      category: "apiKey",
      regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,
      replace: () => "[REDACTED_API_KEY]",
    },
    {
      id: "github-token",
      category: "apiKey",
      regex: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g,
      replace: () => "[REDACTED_API_KEY]",
    },
    {
      id: "key-value-secret",
      category: "apiKey",
      regex:
        /\b((?:api[_-]?key|apikey|secret(?:[_-]?key)?|client[_-]?secret|access[_-]?token|auth[_-]?token|aws_secret_access_key)["']?\s*[:=]\s*["']?)(?!\[REDACTED)([^\s"',;&]{8,})/gi,
      replace: (m, prefix) => prefix + "[REDACTED_API_KEY]",
    },
    {
      id: "password",
      category: "password",
      regex:
        /((?:password|passwd|pwd|parola|sifre|şifre)["']?\s*[:=]\s*["']?)(?!\[REDACTED)([^\s"',;&]+)/gi,
      replace: (m, prefix) => prefix + "[REDACTED_PASSWORD]",
    },
    {
      id: "email",
      category: "email",
      regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
      replace: () => "[REDACTED_EMAIL]",
    },
  ];

  const CATEGORIES = ["email", "apiKey", "token", "password"];

  /**
   * Metindeki hassas verileri maskeler ve tür bazında sayar.
   * @param {string} text Ham log / metin
   * @returns {{ sanitizedText: string, counts: {email:number, apiKey:number, token:number, password:number, total:number} }}
   */
  function sanitize(text) {
    let output = String(text ?? "");
    const counts = { email: 0, apiKey: 0, token: 0, password: 0, total: 0 };

    for (const rule of RULES) {
      output = output.replace(rule.regex, (...args) => {
        counts[rule.category] += 1;
        return rule.replace(...args);
      });
    }

    counts.total = CATEGORIES.reduce((sum, c) => sum + counts[c], 0);
    return { sanitizedText: output, counts };
  }

  const api = { sanitize, RULES, CATEGORIES };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.LogSanitizer = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
