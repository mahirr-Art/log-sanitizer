# 🛡️ LogSanitizer

**LogSanitizer**, yazılımcıların ve DevOps mühendislerinin hata ayıklarken log/metin paylaştığı anlarda (GitHub issue, Slack, Stack Overflow, destek talebi vb.) yanlışlıkla **API anahtarı, şifre, JWT/Bearer token ve e-posta adresi** gibi hassas verileri sızdırmasını önlemek için geliştirilen bir DevSecOps aracıdır.

**Kimin için?** Log paylaşmak zorunda kalan yazılım geliştiriciler, DevOps/SRE mühendisleri ve destek ekipleri için.

**Hangi problemi çözüyor?** Loglarda gömülü kalan gizli bilgiler fark edilmeden paylaşılabiliyor ve bu durum hesapların ele geçirilmesine, KVKK/GDPR ihlallerine yol açabiliyor. LogSanitizer, yapıştırılan metindeki bu verileri otomatik olarak tespit edip `[REDACTED_...]` etiketleriyle maskeler; böylece log güvenle paylaşılabilir.

---

## 📌 İş Takip Panosu

🔗 **Pano:** [LogSanitizer – GitHub Projects](PANO_LINKI_BURAYA)

Panoda **Yapılacak / Devam Ediyor / Tamamlandı** sütunları ve 5 görev kartı bulunur. Kart açıklamaları ve kabul kriterleri ayrıca [docs/BOARD.md](docs/BOARD.md) dosyasında yer alır.

| # | Görev | Durum |
|---|-------|-------|
| 1 | Hassas veri tespit ve maskeleme motoru | ✅ Tamamlandı |
| 2 | Maskeleme istatistikleri ve analiz paneli | ✅ Tamamlandı |
| 3 | Maskelenmiş çıktıyı kopyalama / indirme | 📝 Yapılacak |
| 4 | Özel maskeleme kuralı (custom regex) | 📝 Yapılacak |
| 5 | Sürükle-bırak ile log dosyası yükleme | 📝 Yapılacak |

---

## 🚀 Projeyi Çalıştırma

Proje saf HTML + JavaScript ile yazılmıştır; kurulum veya sunucu gerektirmez.

```bash
git clone https://github.com/mahirr-Art/log-sanitizer.git
cd log-sanitizer
```

**Seçenek A (en kolay):** `index.html` dosyasına çift tıklayarak tarayıcıda açın.

**Seçenek B (yerel sunucu):**
```bash
python -m http.server 8000
# veya: npm start
```
Ardından tarayıcıda http://localhost:8000 adresini açın.

**Testleri çalıştırma** (Node.js 18+ gerekir, ek paket kurulmaz):
```bash
npm test
```

---

## 🧪 İki Özelliği Deneme

### Özellik 1 — Hassas veri tespit ve maskeleme motoru
1. Sayfayı açın, **"Örnek Log Yükle"** butonuna tıklayın (veya kendi logunuzu sol alana yapıştırın).
2. **"Metni Temizle & Maskele"** butonuna basın.
3. Sağ alanda şunları gözlemleyin:
   - `developer.john@testcorp.com` → `[REDACTED_EMAIL]`
   - `Bearer eyJhbGci...` → `Bearer [REDACTED_BEARER_TOKEN]`
   - `AKIAIOSFODNN7EXAMPLE` ve `apiKey=3a7b...` → `[REDACTED_API_KEY]`
   - `password=SuperGizli123!` → `password=[REDACTED_PASSWORD]`
   - Zaman damgaları ve diğer log metni **değişmeden** kalır.

Kendiniz denemek için şu satırı yapıştırabilirsiniz:
```
INFO login ok user=ali@example.com token=Bearer abc.def.ghi password=1234
```

### Özellik 2 — Maskeleme istatistikleri ve analiz paneli
1. Örnek log ile maskeleme yaptıktan sonra üstteki sayaç kartlarına bakın:
   **Toplam Risk: 8 · E-Posta: 2 · API Anahtarı: 3 · Bearer/JWT: 2 · Şifre: 1**
2. Kartların altında *"⚠️ 3 adet API anahtarı, 2 adet token, 1 adet şifre, 2 adet e-posta bulundu ve temizlendi."* özeti görünür.
3. Sol alana hassas veri içermeyen bir metin yazıp (ör. `INFO server started`) tekrar temizleyin: tüm sayaçlar **0** olur ve *"✅ Hassas veri bulunamadı"* mesajı çıkar.

---

## 📁 Proje Yapısı

```
log-sanitizer/
├── index.html              # Arayüz
├── src/
│   ├── sanitizer.js        # Maskeleme motoru + sayaçlar (Görev 1 & 2)
│   ├── app.js              # Arayüz mantığı ve analiz paneli
│   └── style.css
├── tests/
│   ├── sanitizer.test.js   # Görev 1 kabul kriteri testleri
│   └── stats.test.js       # Görev 2 kabul kriteri testleri
└── docs/BOARD.md           # Pano kartları ve kabul kriterleri
```
