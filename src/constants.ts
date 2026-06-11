export interface Brand {
  id: string;
  name: string;
  nameEn?: string;
  displayName?: string;
  displayNameEn?: string;
  description: string;
  descriptionEn?: string;
  showBespoke?: boolean;
  logo?: string;
  image: string;
  gallery?: string[];
  category: string;
  categoryEn?: string;
  objectPosition?: string;
  story?: string;
  location: 'Shanghai' | 'Yixing' | 'Venice' | 'Florence' | 'Other';
  lat: number;
  lng: number;
  subSections?: {
    id: string;
    name: string;
    nameEn?: string;
    description: string;
    descriptionEn?: string;
    story: string;
    gallery: string[];
    image?: string;
    objectPosition?: string;
    showBespoke?: boolean;
  }[];
}

export interface Event {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  location?: string;
  locationEn?: string;
  image?: string;
  gallery?: string[];
  objectPosition?: string;
  type: '大师讲堂' | '旗袍高定咨询' | '珠宝品鉴' | '抽奖' | '美妆派对' | '其他';
  typeEn?: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  price: string;
  image: string;
  category: string;
  categoryEn?: string;
  brand: string;
  brandEn?: string;
}

export const BRANDS: Brand[] = [
  {
    id: 'HANART',
    name: '瀚艺HANART 旗袍',
    nameEn: 'HANART Qipao',
    displayName: '瀚艺HANART\n旗袍/男装',
    displayNameEn: 'HANART\nQipao/Menswear',
    description: '海派旗袍与男装，非遗传承',
    descriptionEn: 'Shanghai-style Qipao and Menswear, Intangible Heritage',
    showBespoke: true,
    image: '/hanyi-qipao.jpg',
    gallery: [
      '/瀚艺海报图1.jpg',
      '/瀚艺海报图2.jpg',
      '/瀚艺海报图3.jpg',
      '/瀚艺海报图4.jpg'
    ],
    category: '服饰',
    categoryEn: 'Apparel',
    objectPosition: 'left',
    location: 'Shanghai',
    lat: 31.23,    // 恢复真实坐标
    lng: 121.47,   // 恢复真实坐标
    story: `...` // 故事内容保持原样，此处省略避免重复，实际使用时请保留完整 story
  },
  // 其他品牌保持不变，但注意宜兴也要恢复
  {
    id: 'taoguafang',
    name: '陶卦坊紫砂',
    nameEn: 'Tao Gua Fang Zisha',
    description: '徐门紫砂第五代传人徐光作品',
    descriptionEn: 'Works by Xu Guang, 5th Generation Successor of Xu Family Zisha',
    image: '/taoguafang.56.35.png',
    gallery: [
      '/陶卦坊商品图1.jpg',
      '/陶卦坊商品图2.jpg',
      '/陶卦坊商品图3.jpg',
      '/陶卦坊商品图4.jpg'
    ],
    category: '茶具',
    categoryEn: 'Teaware',
    location: 'Yixing',
    lat: 31.36,    // 恢复真实坐标
    lng: 119.82,   // 恢复真实坐标
    story: `...` // 省略
  },
  // ... 其余品牌内容不变（保持你之前的完整数据，包括 subSections 等）
];

// EVENTS 和 PRODUCTS 保持原样
