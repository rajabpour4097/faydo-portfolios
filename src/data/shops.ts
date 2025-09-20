export type PackageTier = 'VIP' | 'VIP+';

export interface ShopComment {
  id: string;
  user: string;
  text: string;
  likes: number;
  likedByMe?: boolean;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  locationText?: string; // e.g., مرکز شهر
  province?: string;
  city?: string;
  hours: { start: string; end: string };
  location: { lat: number; lng: number };
  activePackage: PackageTier; // exactly one of VIP or VIP+
  packageDescription: string;
  perks: string[];
  ratings: number[]; // initial ratings for average
  comments: ShopComment[];
  discount?: string; // e.g., ۱۵٪ تخفیف
  productDiscount?: string; // e.g., پیتزا ۲۵٪ تخفیف
  conditionalOffer?: string; // e.g., سفارش ۵ وعده غذا ...
}

export const shops: Shop[] = [
  {
    id: '1',
    name: 'رستوران بهارستان',
    category: 'رستوران و فست‌فود',
    phone: '021-55550000',
    address: 'تهران، خیابان ولیعصر، کوچه گلستان، پلاک ۱۲',
    locationText: 'مرکز شهر',
    province: 'تهران',
    city: 'تهران',
    hours: { start: '10:00', end: '23:30' },
    location: { lat: 35.715298, lng: 51.404343 },
    activePackage: 'VIP',
    packageDescription: 'دسترسی به پیشنهادهای ویژه و پشتیبانی سریع‌تر.',
    perks: ['تخفیف‌های هفتگی', 'پیشنهادهای ویژه برای اعضا', 'پشتیبانی اختصاصی'],
    ratings: [5, 4, 4, 5, 3, 4],
    comments: [
      { id: 'c1', user: 'سارا', text: 'غذاها خیلی باکیفیت بود، پیشنهاد می‌کنم.', likes: 8, likedByMe: true },
      { id: 'c2', user: 'مهدی', text: 'محیط دوست‌داشتنی و کارکنان محترم.', likes: 3 },
      { id: 'c3', user: 'الهام', text: 'سرویس‌دهی کمی کند بود ولی غذا عالی بود.', likes: 1 },
    ],
    discount: '۱۵٪ تخفیف',
    productDiscount: 'پیتزا ۲۵٪ تخفیف',
    conditionalOffer: 'سفارش ۵ وعده غذا یا خرید بالای ۱۵۰ دلار، تیرامیسو رایگان',
  },
  {
    id: '2',
    name: 'کافه نسترن',
    category: 'کافه و قنادی',
    phone: '021-77778888',
    address: 'تهران، خیابان شریعتی، نرسیده به ظفر، پلاک ۲۷',
    locationText: 'خیابان شریعتی',
    province: 'تهران',
    city: 'تهران',
    hours: { start: '09:00', end: '22:00' },
    location: { lat: 35.757657, lng: 51.423093 },
    activePackage: 'VIP+',
    packageDescription: 'امکانات پیشرفته با مزایای بیشتر برای مشتریان وفادار.',
    perks: ['اولویت رزرو', 'کدهای تخفیف اختصاصی', 'دسترسی به رویدادهای ویژه'],
    ratings: [4, 4, 5, 5, 5],
    comments: [
      { id: 'c1', user: 'احمد', text: 'قهوه عالی بود، دوباره میام.', likes: 5 },
      { id: 'c2', user: 'لیلا', text: 'کیک تازه و خوشمزه.', likes: 2, likedByMe: true },
    ],
    discount: '۱۰٪ تخفیف',
    productDiscount: 'لاته ۱۵٪ تخفیف',
    conditionalOffer: 'با هر کیک دو عدد کوکی هدیه',
  },
];
