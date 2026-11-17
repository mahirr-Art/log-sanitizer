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
  const summary = document.getElementById("statsSummary");

  const EMPTY_COUNTS = { email: 0, apiKey: 0, token: 0, password: 0, total: 0 };
  const LABELS = {
    apiKey: "API anahtarı",
    token: "token",
    password: "şifre",
    email: "e-posta",
  };

  // Görev 2: Analiz panelini günceller
  function updateStats(counts) {
    document.getElementById("countTotal").textContent = counts.total;
    document.getElementById("countEmail").textContent = counts.email;
    document.getElementById("countKey").textContent = counts.apiKey;
    document.getElementById("countToken").textContent = counts.token;
    document.getElementById("countPassword").textContent = counts.password;

    summary.classList.remove("safe", "risk");
    if (counts.total === 0) {
      summary.textContent = "✅ Hassas veri bulunamadı. Log paylaşıma uygun görünüyor.";
      summary.classList.add("safe");
      return;
    }

    const parts = Object.keys(LABELS)
      .filter((k) => counts[k] > 0)
      .map((k) => `${counts[k]} adet ${LABELS[k]}`);
    summary.textContent = `⚠️ ${parts.join(", ")} bulundu ve temizlendi.`;
    summary.classList.add("risk");
  }

  function resetStats() {
    updateStats(EMPTY_COUNTS);
    summary.textContent = "Henüz analiz yapılmadı.";
    summary.classList.remove("safe", "risk");
  }

  document.getElementById("btnSanitize").addEventListener("click", () => {
    const result = window.LogSanitizer.sanitize(rawInput.value);
    output.value = result.sanitizedText;
    updateStats(result.counts);
  });

  document.getElementById("btnSample").addEventListener("click", () => {
    rawInput.value = SAMPLE_LOG;
  });

  document.getElementById("btnClear").addEventListener("click", () => {
    rawInput.value = "";
    output.value = "";
    resetStats();
  });

  // Kart 3: kopyalama ve indirme
  const btnCopy = document.getElementById("btnCopy");
  const btnDownload = document.getElementById("btnDownload");

  function flash(button, text) {
    const original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    setTimeout(() => (button.textContent = original), 2000);
  }

  function copyFallback(text) {
    output.select();
    const ok = document.execCommand("copy");
    window.getSelection().removeAllRanges();
    return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }

  btnCopy.addEventListener("click", () => {
    const text = output.value;
    if (!text) {
      flash(btnCopy, "Önce metni temizleyin");
      return;
    }
    const copy = navigator.clipboard
      ? navigator.clipboard.writeText(text).catch(() => copyFallback(text))
      : copyFallback(text);
    copy.then(
      () => flash(btnCopy, "Kopyalandı!"),
      () => flash(btnCopy, "Kopyalanamadı")
    );
  });

  btnDownload.addEventListener("click", () => {
    const text = output.value;
    if (!text) {
      flash(btnDownload, "Önce metni temizleyin");
      return;
    }
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sanitized_log.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  resetStats();
})();
