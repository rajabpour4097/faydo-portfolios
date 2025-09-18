import React from 'react';
import { Link } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';
import './BusinessCardsPage.css';

const BusinessCardsPage: React.FC = () => {
  const businesses = [
    {
      businessName: "کاخ پیتزای ماریو",
      discount: "۱۵٪ تخفیف",
      productDiscount: "پیتزا ۲۵٪ تخفیف",
      conditionalOffer: "سفارش ۵ وعده غذا یا خرید بالای ۱۵۰ دلار، تیرامیسو رایگان",
      vipExperiences: [
        { stars: 1, experience: "آشپزی با سرآشپز ما در آشپزخانه" },
        { stars: 2, experience: "اولین نفری که منوی جدید فصلی را امتحان می‌کند" },
        { stars: 3, experience: "برگزاری جشن تولدتان با اتاق غذاخوری خصوصی" }
      ],
      packageInfo: { totalMonths: 6, remainingMonths: 4 },
      rating: 4.5,
      category: "رستوران ایتالیایی",
      location: "مرکز شهر"
    },
    {
      businessName: "راه‌حل‌های تک‌فیکس",
      discount: "۱۰٪ تخفیف",
      conditionalOffer: "خرید بالای ۵۰۰ دلار یا ۳ خدمت، محافظ صفحه رایگان",
      vipExperiences: [
        { stars: 1, experience: "صف اولویت و خدمات سریع" },
        { stars: 2, experience: "تست تکنیک‌ها و ابزارهای جدید تعمیرات" },
        { stars: 3, experience: "مشاوره فنی رایگان و نصب در منزل" }
      ],
      packageInfo: { totalMonths: 12, remainingMonths: 9 },
      rating: 4.8,
      category: "تعمیرات الکترونیک",
      location: "منطقه فناوری"
    },
    {
      businessName: "بوتیک بلا",
      discount: "۲۰٪ تخفیف",
      productDiscount: "لباس‌های مجلسی ۴۰٪ تخفیف",
      conditionalOffer: "خرید ۳ قلم یا بالای ۲۰۰ دلار، کیف دستی طراح رایگان",
      vipExperiences: [
        { stars: 1, experience: "جلسه استایلینگ شخصی با متخصص مد ما" },
        { stars: 2, experience: "پیش‌نمایش انحصاری کلکسیون‌های جدید قبل از عرضه" },
        { stars: 3, experience: "تجربه خرید خصوصی بعد از ساعت کاری" }
      ],
      packageInfo: { totalMonths: 3, remainingMonths: 1 },
      rating: 4.2,
      category: "مد و پوشاک",
      location: "مرکز خرید"
    },
    {
      businessName: "کافه باغ سبز",
      productDiscount: "نوشیدنی‌ها ۳۰٪ تخفیف",
      conditionalOffer: "خرید ۱۰ قهوه یا بالای ۸۰ دلار، کیک ارگانیک رایگان",
      vipExperiences: [
        { stars: 1, experience: "جلسه طعم‌یابی قهوه با روستر ما" },
        { stars: 2, experience: "امتحان ترکیبات محدود و انحصاری اول" },
        { stars: 3, experience: "برگزاری مهمانی خصوصی در باغ" }
      ],
      packageInfo: { totalMonths: 9, remainingMonths: 7 },
      rating: 4.7,
      category: "کافه ارگانیک",
      location: "منطقه باغ"
    },
    {
      businessName: "اتوکر پرو",
      discount: "۱۵٪ تخفیف",
      productDiscount: "تعویض روغن ۲۰ دلار تخفیف",
      conditionalOffer: "خرید بالای ۱۰۰۰ دلار یا ۵ خدمت، شست‌وشو و واکس رایگان",
      vipExperiences: [
        { stars: 1, experience: "یادگیری نگهداری پایه خودرو با مکانیک‌های ما" },
        { stars: 2, experience: "تست‌درایو ارتقاءهای عملکرد قبل از خرید" },
        { stars: 3, experience: "سالن انتظار VIP با پذیرایی رایگان" }
      ],
      packageInfo: { totalMonths: 12, remainingMonths: 2 },
      rating: 4.1,
      category: "خدمات خودرو",
      location: "منطقه صنعتی"
    },
    {
      businessName: "استودیو یوگای طلوع",
      discount: "کلاس اول رایگان",
      productDiscount: "کارت ماهانه ۳۵٪ تخفیف",
      conditionalOffer: "خرید ۱۰ کلاس یا بالای ۳۰۰ دلار، تشک یوگا و بطری آب رایگان",
      vipExperiences: [
        { stars: 1, experience: "جلسه شخصی با مربی اصلی" },
        { stars: 2, experience: "مشارکت در توسعه کلاس‌های جدید" },
        { stars: 3, experience: "دسترسی به اردوی آخر هفته و باغ مدیتیشن" }
      ],
      packageInfo: { totalMonths: 6, remainingMonths: 0 },
      rating: 4.9,
      category: "تناسب اندام و سلامت",
      location: "منطقه بهداشت"
    }
  ];

  return (
    <div className="business-cards-page">
      <header className="page-header">
        <Link to="/" className="back-button">← بازگشت به صفحه اصلی</Link>
        <h1>کارت‌های کسب و کار</h1>
        <p>کشف تخفیف‌های عالی از کسب‌وکارهای برتر منطقه</p>
      </header>

      <main className="cards-container">
        <div className="cards-grid">
          {businesses.map((business, index) => (
            <BusinessCard
              key={index}
              businessName={business.businessName}
              discount={business.discount}
              productDiscount={business.productDiscount}
              conditionalOffer={business.conditionalOffer}
              vipExperiences={business.vipExperiences}
              packageInfo={business.packageInfo}
              rating={business.rating}
              category={business.category}
              location={business.location}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessCardsPage;