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
  website?: string;
  instagram?: string;
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
  coverUrl?: string;
  logoUrl?: string;
  offers?: Array<{ type: 'discount' | 'gift' | 'vip'; title: string; description?: string; expiresAt?: string; rating?: number }>;
  media?: Array<{ id: string; type: 'image' | 'video'; url: string }>;
  badges?: string[]; // e.g., ['VIP+ Partner','Best Rated']
  daysRemaining?: number; // for urgency
  satisfaction?: { discounts: number; gifts: number; vip: number }; // 0..1
}

export const shops: Shop[] = [
  {
    id: '1',
    name: 'رستوران بهارستان',
    category: 'رستوران و فست‌فود',
    phone: '021-55550000',
    address: 'تهران، خیابان ولیعصر، کوچه گلستان، پلاک ۱۲',
    locationText: 'مرکز شهر',
    website: 'https://example.com',
    instagram: 'https://instagram.com/example',
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
    coverUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1559628171-2f8a47b27e86?q=80&w=140&auto=format&fit=crop',
    offers: [
      { type: 'discount', title: '۱۵٪ روی کل سفارش', description: 'روی کل فاکتور', expiresAt: '2025-12-31', rating: 4.5 },
      { type: 'gift', title: 'تیرامیسو رایگان', description: 'با خرید بالای ۱۵۰$', expiresAt: '2025-10-15', rating: 4.2 },
      { type: 'vip', title: 'VIP Basic', description: 'دسر رایگان برای اعضا', rating: 4.8 },
    ],
    media: [
      { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1544025162-4b6e04a1d7a7?q=80&w=600&auto=format&fit=crop' },
      { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1604908176997-4313b5d3b6b6?q=80&w=600&auto=format&fit=crop' },
    ],
    badges: ['VIP+ Partner','Best Rated'],
    daysRemaining: 9,
    satisfaction: { discounts: 0.76, gifts: 0.64, vip: 0.88 },
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
