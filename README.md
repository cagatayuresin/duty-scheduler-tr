# 📅 Görev Atama Takvimi (Duty Scheduler TR)

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-brightgreen?style=for-the-badge&logo=github) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Material Design](https://img.shields.io/badge/Material%20Design-0081CB?style=for-the-badge&logo=material-design&logoColor=white) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> Modern ve kullanıcı dostu görev atama sistemi. Türkiye resmi tatilleri ile akıllı görev dağılımı sağlar.

## 🌟 Özellikler

### 👥 Kişi Yönetimi

- ✅ Kolay kişi ekleme/çıkarma
- 🎨 Her kişiye özel renk kodu
- 💾 Kalıcı veri saklama (localStorage)

### 📅 Akıllı Takvim

- 🗓️ Modern takvim görünümü
- 🇹🇷 Türkiye resmi tatilleri (2025)
- 🏖️ Hafta sonu vurgulaması
- 📱 Responsive tasarım

### ⚡ Otomatik Görev Dağılımı

- 🤖 Adil görev atama algoritması
- ⚖️ Hafta sonlarının eşit dağılımı
- 🎯 Drag & Drop ile manuel değiştirme
- 🚫 Tatil günlerini otomatik atlama

### 📄 PDF Çıktı

- 📊 Aylık rapor çıktısı
- 📈 3 aylık dönemsel raporlar
- 🖨️ Yazdırma dostu format

## 🚀 Demo

### [🔗 Canlı Demo'yu Deneyin](https://cagatayuresin.github.io/duty-scheduler-tr/)

## 📸 Ekran Görüntüleri

### Ana Ekran

![Ana Ekran](screenshot-main.png)

### Takvim Görünümü

![Takvim](screenshot-calendar.png)

## 🛠️ Teknolojiler

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **UI Framework:** Material Design Lite
- **Icons:** Material Design Icons
- **PDF:** jsPDF
- **Storage:** Browser localStorage
- **Hosting:** GitHub Pages

## 📋 Kurulum

### GitHub Pages ile Kullanım

1. Bu repository'yi fork edin
2. Settings > Pages'den source'u seçin
3. `https://cagatayuresin.github.io/duty-scheduler-tr/` adresinden erişin

### Yerel Kurulum

```bash
# Repository'yi clone edin
git clone https://github.com/yourusername/duty-scheduler-tr.git

# Klasöre geçin
cd duty-scheduler-tr

# Yerel sunucu başlatın (Python 3)
python -m http.server 8000

# Tarayıcıda açın
# http://localhost:8000
```

## 💡 Kullanım

### 1. Kişi Ekleme

- Sol panelde "Kişi adını girin..." kutusuna isim yazın
- Enter tuşuna basın veya ➕ butonunu tıklayın
- Kişi otomatik olarak renkli etiketi ile eklenir

### 2. Otomatik Görev Atama

- **"Otomatik Ata"** butonuna tıklayın
- Sistem hafta sonlarını adil şekilde dağıtır
- Resmi tatiller otomatik olarak atlanır

### 3. Manuel Düzenleme

- Takvimde görevli kişileri sürükleyip bırakın
- Farklı günlere kolayca taşıyın
- Değişiklikler otomatik kaydedilir

### 4. PDF Çıktı Alma

- **"Aylık PDF"** - Mevcut ay raporu
- **"3 Aylık PDF"** - Üç aylık dönem raporu
- Dosya otomatik olarak indirilir

## 🇹🇷 Türkiye Resmi Tatilleri

Sistem aşağıdaki resmi tatilleri otomatik olarak tanır:

- 🎊 Yılbaşı (1 Ocak)
- 🇹🇷 23 Nisan (Ulusal Egemenlik ve Çocuk Bayramı)
- 👷 1 Mayıs (İşçi Bayramı)
- 🏃 19 Mayıs (Atatürk'ü Anma, Gençlik ve Spor Bayramı)
- 🏆 30 Ağustos (Zafer Bayramı)
- 🇹🇷 29 Ekim (Cumhuriyet Bayramı)
- 🌙 Ramazan Bayramı (3 gün)
- 🐑 Kurban Bayramı (4 gün)

## 🔧 Özelleştirme

### Renk Paleti Değiştirme

```javascript
// script.js içinde colors dizisini düzenleyin
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', // Mevcut renkler
    '#YourColor1', '#YourColor2'      // Yeni renkleriniz
];
```

### Yeni Tatil Ekleme

```javascript
// holidays objesine yeni tarihler ekleyin
const holidays = {
    '2025-MM-DD': 'Tatil Adı',
    // ...
};
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 🙏 Teşekkürler

- [Material Design](https://material.io/) - UI tasarım rehberi
- [jsPDF](https://github.com/parallax/jsPDF) - PDF oluşturma
- [Material Design Icons](https://fonts.google.com/icons) - İkonlar

## 📊 İstatistikler

![GitHub stars](https://img.shields.io/github/stars/cagatayuresin/duty-scheduler-tr?style=social)
![GitHub forks](https://img.shields.io/github/forks/cagatayuresin/duty-scheduler-tr?style=social)
![GitHub issues](https://img.shields.io/github/issues/cagatayuresin/duty-scheduler-tr)
![GitHub last commit](https://img.shields.io/github/last-commit/cagatayuresin/duty-scheduler-tr)

---

⭐ **Bu projeyi beğendiyseniz star vermeyi unutmayın!** ⭐