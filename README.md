# 🛡️ LogSanitizer

**LogSanitizer**, yazılımcıların ve DevOps mühendislerinin hata ayıklarken log/metin paylaştığı anlarda (GitHub issue, Slack, Stack Overflow, destek talebi vb.) yanlışlıkla **API anahtarı, şifre, JWT/Bearer token ve e-posta adresi** gibi hassas verileri sızdırmasını önlemek için geliştirilen bir DevSecOps aracıdır.

**Kimin için?** Log paylaşmak zorunda kalan yazılım geliştiriciler, DevOps/SRE mühendisleri ve destek ekipleri için.

**Hangi problemi çözüyor?** Loglarda gömülü kalan gizli bilgiler fark edilmeden paylaşılabiliyor ve bu durum hesapların ele geçirilmesine, KVKK/GDPR ihlallerine yol açabiliyor. LogSanitizer, yapıştırılan metindeki bu verileri otomatik olarak tespit edip `[REDACTED_...]` etiketleriyle maskeler; böylece log güvenle paylaşılabilir.
