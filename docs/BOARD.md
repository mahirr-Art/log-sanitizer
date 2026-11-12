# 📋 Pano Kartları (GitHub Projects'e eklenecek)

Sütunlar: **Yapılacak** · **Devam Ediyor** · **Tamamlandı**

---

## Kart 1 — Hassas veri tespit ve maskeleme motoru ✅
**Açıklama:** Kullanıcının yapıştırdığı ham log metninde e-posta, Bearer/JWT token, API anahtarı (AWS, GitHub, `apiKey=...`) ve şifre (`password=...`) kalıplarını regex ile tespit edip `[REDACTED_*]` etiketleriyle değiştiren motor ve arayüz.

**Kabul kriterleri:**
- [ ] `admin@company.com` → `[REDACTED_EMAIL]` olur.
- [ ] `Authorization: Bearer xyz` → `Authorization: Bearer [REDACTED_BEARER_TOKEN]` olur.
- [ ] `AKIA...` ve `apiKey=...` değerleri `[REDACTED_API_KEY]` olur; `password=...` değeri `[REDACTED_PASSWORD]` olur.
- [ ] Hassas veri içermeyen satırlar, zaman damgaları ve satır yapısı değişmez.
- [ ] `npm test` → `tests/sanitizer.test.js` testleri geçer.

## Kart 2 — Maskeleme istatistikleri ve analiz paneli ✅
**Açıklama:** Maskeleme sonrası hangi türden kaç adet hassas veri bulunduğunu gösteren sayaç kartları ve özet mesajı.

**Kabul kriterleri:**
- [ ] "Örnek Log Yükle" + "Metni Temizle" sonrası panel: Toplam 8, E-posta 2, API Anahtarı 3, Bearer/JWT 2, Şifre 1 gösterir.
- [ ] Hassas veri olmayan metinde tüm sayaçlar 0 olur ve "Hassas veri bulunamadı" mesajı görünür.
- [ ] Aynı değer iki kez sayılmaz (Bearer içindeki JWT = 1 token).
- [ ] `npm test` → `tests/stats.test.js` testleri geçer.

## Kart 3 — Maskelenmiş çıktıyı kopyalama ve indirme
**Açıklama:** Temizlenmiş logu tek tıkla panoya kopyalama ve `.txt` olarak indirme.

**Kabul kriteri:**
- [ ] "Kopyala" butonuna basınca çıktı panoya kopyalanır ve "Kopyalandı!" bildirimi görünür.
- [ ] "İndir" butonuna basınca `sanitized_log.txt` dosyası indirilir ve içeriği sağ paneldekiyle aynıdır.

## Kart 4 — Özel maskeleme kuralı (custom regex) tanımlama
**Açıklama:** Kullanıcının kuruma özel veriler (ör. T.C. kimlik no, müşteri ID) için kendi regex desenini ve etiketini ekleyebilmesi.

**Kabul kriteri:**
- [ ] Kullanıcı `\b\d{11}\b` desenini `TCKN` etiketiyle eklediğinde, metindeki 11 haneli sayılar `[REDACTED_TCKN]` olur.

## Kart 5 — Sürükle-bırak ile log dosyası yükleme
**Açıklama:** Metin yapıştırmak yerine `.log` / `.txt` dosyasını sürükleyip bırakarak yükleme.

**Kabul kriteri:**
- [ ] 5 MB'a kadar bir `.log` dosyası bırakıldığında içeriği giriş alanına aktarılır; desteklenmeyen uzantıda hata mesajı gösterilir.
