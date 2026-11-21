# LogSanitizer

Hata ayıklarken log paylaşmak çok sık yaptığımız bir şey: bir issue'ya, Slack kanalına ya da bir arkadaşa log yapıştırıyoruz. Bu loglarda bazen e-posta adresleri, API anahtarları, token'lar ya da şifreler kalıyor ve fark etmeden paylaşılıyor.

LogSanitizer bu sorunu çözmek için yaptığım küçük bir web aracı. Logu yapıştırıyorsunuz, içindeki hassas bilgiler `[REDACTED_EMAIL]`, `[REDACTED_API_KEY]` gibi etiketlerle değiştiriliyor ve geriye güvenle paylaşılabilecek bir metin kalıyor.

Log paylaşmak zorunda kalan geliştiriciler, DevOps ekipleri ve destek ekipleri için düşündüm.

## Pano

Görevleri GitHub Projects üzerinde takip ediyorum:
https://github.com/users/mahirr-Art/projects/2

Panoda 5 kart var:

- #1 Hassas veri tespit ve maskeleme: tamamlandı
- #2 İstatistik / analiz paneli: tamamlandı
- #3 Çıktıyı kopyalama ve indirme: tamamlandı
- #4 Özel regex kuralı ekleme: yapılacak
- #5 Sürükle-bırak ile dosya yükleme: yapılacak

Kartların açıklamaları ve kabul kriterleri issue'larda ve [docs/BOARD.md](docs/BOARD.md) dosyasında.

## Çalıştırma

Herhangi bir kurulum gerekmiyor, sadece HTML ve JavaScript.

```bash
git clone https://github.com/mahirr-Art/log-sanitizer.git
cd log-sanitizer
```

Sonra `index.html` dosyasını tarayıcıda açmanız yeterli.

İsterseniz yerel sunucuyla da açabilirsiniz:

```bash
python -m http.server 8000
```

ve http://localhost:8000 adresine gidin.

Testler için (Node.js 18 veya üstü):

```bash
npm test
```

Testler GitHub Actions ile her push'ta da çalışıyor.

## Özellikleri deneme

### 1. Maskeleme

1. "Örnek Log Yükle" butonuna basın (ya da kendi logunuzu sol tarafa yapıştırın).
2. "Metni Temizle & Maskele" butonuna basın.
3. Sağ tarafta e-postaların, Bearer/JWT token'ların, API anahtarlarının ve şifrelerin maskelendiğini, logun geri kalanının aynı kaldığını görebilirsiniz.

Denemek için şu satırı da kullanabilirsiniz:

```
INFO login ok user=ali@example.com token=Bearer abc.def.ghi password=1234
```

### 2. Analiz paneli

Maskelemeden sonra üstteki kartlarda kaç tane hassas veri bulunduğu türüne göre görünüyor. Örnek log için sonuç şöyle olmalı: toplam 8, e-posta 2, API anahtarı 3, token 2, şifre 1.

Hassas veri içermeyen bir metin (mesela `INFO server started`) denerseniz bütün sayaçlar 0 oluyor ve "Hassas veri bulunamadı" mesajı çıkıyor.

### 3. Kopyalama ve indirme

Maskelemeden sonra "Kopyala" butonu çıktıyı panoya kopyalıyor, "İndir (.txt)" butonu da `sanitized_log.txt` olarak indiriyor.

## Dosyalar

- `index.html`: arayüz
- `src/sanitizer.js`: maskeleme kuralları ve sayaçlar
- `src/app.js`: butonlar ve panel
- `src/style.css`: stiller
- `tests/`: testler
