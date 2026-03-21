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
    id: 'hanyi',
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
    lat: 31.23,
    lng: 121.47,
    story: `
瀚艺HANART，非遗传承中国皇家工艺，精于手绣、手绘与手工缝制。见证上海摩登风华，承载梅兰芳、周璇、宋氏三姐妹等名流传奇与影艺经典。承袭数代传奇匠人衣钵，如旗袍泰斗褚宏生先生。瀚艺秉持“上海裁缝”的品味与工匠精神。让中国极致皇家工艺以“中国审美”走向世界。

瀚艺恪守百年海派工艺精髓，坚持以手工细密缝制，于立领、盘扣与开衩之间，勾勒东方女性的含蓄风骨与优雅气韵。

---

HANART is a guardian of China's intangible cultural heritage, dedicated to royal craftsmanship through hand-embroidery, hand-painting, and artisanal sewing. Inheriting the legacy of legendary artisans like master couturier Chu Hongsheng, the house upholds the taste and spirit of "Shanghai tailors." It brings this supreme Chinese artistry to the world through a distinct aesthetic vision, adhering to century-old techniques. Every piece is meticulously hand-sewn, sculpting the subtle grace and elegant demeanor of Eastern women through its stand collars, knotted buttons, and delicate slits.
    `,
    subSections: [
      {
        id: 'menswear',
        name: '瀚艺HANART 男装',
        nameEn: 'HANART Menswear',
        description: '瀚艺HANART 男装系列',
        descriptionEn: 'HANART Menswear Collection',
        showBespoke: true,
        image: '/瀚艺男装首页新.png',
        objectPosition: 'center',
        story: `
### 瀚艺｜新中式男装的开创者
瀚艺（HANART）由周朱光先生创立，致力于填补中式男装的现代空白。品牌以“新中装”为核心，将红帮裁缝的立体剪裁与中式平面剪法相融合，以极致工艺重塑东方风骨。

核心产品涵盖新中式西服、中山装、中式外套等，全系手工制作，以手绣、手绘为特色。凭借精湛的工艺与独特的中式设计，瀚艺多次为外国访华政要及重要活动主持人定制男装，以中国审美诠释大国礼仪风范。

**让中国服装的极致工艺，不止于旗袍。**

---

### HANART｜Modern Chinese Menswear
Founded by Zhou Zhuguang, HANART redefines modern Chinese menswear. The brand merges Hongbang tailoring with traditional Chinese techniques—crafting garments that embody Eastern spirit and global appeal.

New Chinese-style suits, Zhongshan suits, and jackets—all handmade with signature embroidery and painting. HANART has tailored for visiting dignitaries and event hosts, presenting China's ceremonial elegance through its own aesthetic.

**Chinese craftsmanship goes beyond the qipao.**
        `,
        gallery: [
          '/瀚艺男装海报1-1.jpg',
          '/瀚艺男装海报2-1.jpg',
          '/瀚艺男装海报3-1.jpg',
          '/瀚艺男装海报4.png'
        ]
      }
    ]
  },
  {
    id: 'leying',
    name: '乐印Brandr 琥珀',
    nameEn: 'Brandr Amber',
    displayName: '乐印Brandr 琥珀',
    displayNameEn: 'Brandr Amber',
    description: '国家级工艺美术大师柯少军监制，波罗的海天然琥珀',
    descriptionEn: 'Supervised by National Master Ke Shaojun, Natural Baltic Amber',
    image: '/leying.jpg',
    gallery: [
      '/新琥珀商品图1.png',
      '/新琥珀商品图2.png',
      '/新琥珀商品图3.png',
      '/新琥珀商品图4.png'
    ],
    category: '珠宝',
    categoryEn: 'Jewelry',
    objectPosition: 'bottom',
    location: 'Shanghai',
    lat: 31.21,
    lng: 121.48,
    story: `
「乐印Brandr 琥珀」以经营100%波罗的海天然琥珀为主，是一家集设计、生产、销售为一体的综合性企业。乐印Brandr 琥珀的艺术总监——柯少军先生，作为中国正高级工艺美术师、上海市工艺美术大师。上海市非物质文化遗产项目「海派玉雕（琥珀雕刻）」的代表性传承人。将传统海派的牙雕、玉雕工艺融会贯通，运用于琥珀雕刻上，并不断推陈出新。

乐印Brandr 琥珀秉持“一石一设计”的理念，尊重每一块原石独特的形状、纹路与色泽。融合传统文化与现代审美，以刀工诠释意境，雕琢出含蓄、温润、典雅的东方美学气质。

---

"Brandr" specializes in dealing with 100% natural Baltic amber and is a comprehensive enterprise integrating design, production, and sales. The artistic director of Brandr, Mr. Ke Shaojun, is a Chinese senior craft artist and a master of arts and crafts in Shanghai. As the representative inheritor of the Shanghai intangible cultural heritage project "Shanghai-Style Jade Carving (Amber Carving)," he skillfully integrates traditional Shanghai-style ivory and jade carving techniques into amber carving while continuously innovating. Brandr upholds the philosophy of "one stone, one design," respecting the unique shape, texture, and color of each raw amber piece. By blending traditional culture with modern aesthetics, the craftsmen use their carving skills to interpret artistic conception, shaping amber works that embody the subtle, warm, and elegant charm of Eastern aesthetics.
    `
  },
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
    lat: 33.5,
    lng: 118.0,
    story: `
徐门紫砂的传承已跨越百年。自清道光年间起，徐家便以紫砂为业，作品远销亚洲，规模甚大。其中，承前启后的关键人物是中国工艺美术大师徐汉棠。他于上世纪五十年代初拜壶艺泰斗顾景舟为师，是其第一个入室大弟子，艺术功力深厚，所创作品样式之广被誉为“无人能企及”。其作品如《十五头嵌银丝咖啡具》等被中国故宫博物院、英国维多利亚博物馆等国内外权威机构收藏，并荣获 “中国工艺美术终身成就奖” 等至高荣誉，为徐门技艺奠定了宗师级的典范。

如今，这份深厚的家学由第五代传人徐光接续主理。他在继承以徐汉棠为代表的百年技艺基础上，将传统沉淀与当代生活美学相融合，其制作的每一把壶，都在提升紫砂实用性与艺术性的境界，成为茶案上流动的、活的传承。

---

Xu Family Zisha spans over a century, with roots in the Qing Dynasty. Its pivotal figure, Xu Hantang, studied under legendary potter Gu Jingzhou and is celebrated as a master of form and technique. His works, such as the「15-Piece Silver-Inlaid Coffee Set」，are held in museums worldwide, and he received China’s “Lifetime Achievement Award in Arts and Crafts.”

Today, fifth‑generation successor Xu Guang carries this heritage forward. He blends traditional skill with modern aesthetics, creating teapots that unite function and art—keeping the tradition alive and flowing on the tea tray.
    `
  },
  {
    id: 'sarabyjg',
    name: 'SARA BY JG',
    nameEn: 'SARA BY JG',
    description: '意大利托斯卡纳植鞣革皮具',
    descriptionEn: 'Tuscan Vegetable-Tanned Leather from Italy',
    image: '/sarabyjg.39.54.png',
    gallery: [
      '/sarabjg商品图1.png',
      '/sarabjg商品图2.png',
      '/sarabjg商品图3.png',
      '/sarabjg商品图4.png'
    ],
    category: '皮具',
    categoryEn: 'Leather Goods',
    location: 'Florence',
    lat: 42.5,
    lng: 10.0,
    story: `
SARA BY JG源自皮具手工艺的故乡。在这快节奏的时代，它选择与时间为盟，恪守着佛罗伦萨最纯粹的“意大利制造”标准。
品牌甄选托斯卡纳的顶级植鞣革，让皮革拥有“会呼吸的生命力”。
传承意大利百年的缝线工艺，每一针都是工业机器无法复制的生命轨迹。它摒弃一切冗余装饰，因为真正的经典，源于对材质与结构的绝对自信。

---

SARA BY JG, hailing from the heartland of leather craftsmanship. In this fast‑paced era, it chooses to be slow — faithfully upholding the purest standards of “Made in Italy” from Florence.
SARA BY JG selects only the finest vegetable‑tanned leather from Tuscany, giving each piece a “breathing” vitality. It continues Italy’s century‑old hand‑stitching craft — every stitch traces a path no machine can replicate. Free from unnecessary adornment, true confidence comes from its material and structure.
    `
  },
  {
    id: 'studioflo',
    name: 'STUDIO FLO',
    nameEn: 'STUDIO FLO',
    description: '佛罗伦萨现代简约设计皮具',
    descriptionEn: 'Modern Minimalist Design from Florence',
    image: '/studioflo.43.20.png',
    gallery: [
      '/studio flo商品图1.png',
      '/studio flo商品图2.png',
      '/studio flo商品图3.png',
      '/studio flo商品图4.png'
    ],
    category: '皮具',
    categoryEn: 'Leather Goods',
    location: 'Florence',
    lat: 43.78,
    lng: 11.24,
    story: `
作为一个根植于佛罗伦萨的当地品牌，Studio Flo每只皮包的生命历程，从原料、设计、再到成品，所有流程都在本地工坊的严格标准下完成。品牌继承百年皮革工艺的同时，注入现代简约的设计灵魂，打造出极简、纯粹的现代意式皮革作品。每一处细节，都在探讨功能与美学的平衡，代表着意大利设计面向未来的自信与清醒。深深吸引着寻找个性表达的意大利年轻一代，成为他们日常搭配中不可缺少的一部分。

---

Rooted in Florence, Studio Flo oversees every step of production Locally-from material to finished bag. Blending heritage leathercraft with modern minimalism, each piece balances function and aesthetics, reflecting the forward looking clarity of Italian design. Embraced by a younger generation seeking individuality, it has become a signature of their daily style.
    `
  },
  {
    id: 'artedimurano',
    name: 'ARTE DI MURANO',
    nameEn: 'ARTE DI MURANO',
    description: '威尼斯穆拉诺岛水晶制品',
    descriptionEn: 'Crystal from Murano Island, Venice',
    image: '/ARTE DI MURANO 首页.png',
    gallery: [
      '/ARTE DI MURANO 海报1.png',
      '/ARTE DI MURANO海报2.png',
      '/ARTE DI MURANO海报3.png',
      '/ARTE DI MURANO海报4.png'
    ],
    category: '水晶',
    categoryEn: 'Crystal',
    location: 'Venice',
    lat: 46.5,
    lng: 13.5,
    story: `
在威尼斯潟湖上有那么一座传奇的玻璃岛——穆拉诺。
自1291年起，这里跳动的窑火便如脉搏般从未停息，ARTE DI MURANO 正是这千年艺术之火的虔诚守护者。
ARTE DI MURANO的每一件玻璃制品，都诞生于火焰与匠人气息的共舞。复杂的吹制、拉丝与色彩融合技艺，让熔融的硅砂在瞬间被赋予新的灵魂。
其独特的波浪纹理与绚丽色彩，不仅是威尼斯手工艺的极致表达，更是您在舶物志精品店内可以甄选佩戴的“艺术火焰”。

---

Within the Venetian Lagoon lies the legendary glass island — Murano.
Since 1291, its furnace flames have never ceased to pulse, and ARTE DI MURANO is the devoted guardian of this thousand‑year ‑old artistic fire.
Every piece of ARTE DI MURANO glass is born from the dance between flame and the artisan’s breath. Through intricate techniques of blowing, threading, and color fusion, molten silica sand is transformed in an instant, gaining a new soul. Its distinctive wave-like patterns and radiant hues are not only the ultimate expression of Venetian craftsmanship — they are also wearable “artistic flames” that you can discover and adorn at Boatique Boutique.
    `
  },
  {
    id: 'surpine',
    name: '松野湃 Surpine',
    nameEn: 'Surpine',
    description: '户外运动科技装备',
    descriptionEn: 'Outdoor Sports Technology Gear',
    image: '/松野湃首页新.png',
    gallery: [
      '/松野湃海报1.png',
      '/松野湃海报2.png',
      '/松野湃海报3.png'
    ],
    category: '运动',
    categoryEn: 'Sports',
    location: 'Shanghai',
    lat: 31.25,
    lng: 121.45,
    story: `
松野湃（Surpine）是一个专注于运动体感科技的专业户外品牌，2018年创立于中国。品牌自建 SURPINE LAB 研发实验室，将“体感”拆解为温感、湿感、压感、触感等六大科技维度，以数据驱动面料研发，致力于让身体在运动中始终保持恰到好处的舒适状态。

从滑雪圈到户外领域，松野湃凭借扎实的科技力迅速赢得专业用户的认可。2026年，品牌参与 ISPO Beijing 亚洲运动用品与时尚展，并与京东、中国纺织品商业协会共同制定 《全国软壳冲锋衣团体标准》，为户外装备的规范化发展贡献力量。

每一件松野湃产品，都是对“舒适”的极致追求——不打扰，却无处不在。让穿着者专注脚下的路、眼前的风景，剩下的，交给衣服。

---

Surpine is a professional outdoor brand dedicated to the science of sports body sensation, founded in China in 2018. The brand established its own SURPINE LAB, breaking down "comfort" into six technological dimensions—thermal sensation, moisture sensation, pressure sensation, tactile sensation, and more—using data to drive fabric innovation and ensure the body stays in an ideal state during movement.

From ski circles to the broader outdoor community, Surpine has quickly earned recognition from professional users through its solid technological foundation. In 2026, the brand participated in ISPO Beijing and collaborated with JD.com and the China Textile Commerce Association to co-develop the National Soft Shell Jacket Industry Standard, contributing to the standardization of outdoor gear.

Every Surpine product is a pursuit of ultimate comfort—unobtrusive, yet ever-present. It allows wearers to focus on the path ahead and the scenery beyond, leaving the rest to the gear.
    `
  },
  {
    id: 'fancycube',
    name: 'Fancycube',
    nameEn: 'Fancycube',
    description: '美妆品牌',
    descriptionEn: 'Beauty Brand',
    image: '/fancycube.21.09.png',
    gallery: [
      '/fancycube海报1.jpg',
      '/fancycube海报2.jpg',
      '/fancycube海报3.jpg',
      '/fancycube海报4.jpg'
    ],
    category: '美妆',
    categoryEn: 'Beauty',
    location: 'Shanghai',
    lat: 31.22,
    lng: 121.46,
    story: `
FancyCube（梦幻魔方）是一个以“可佩戴的彩妆”为核心理念的配饰彩妆品牌，2021年创立于上海。品牌致力于将美妆从梳妆台解放出来，融入日常穿搭与生活场景，成为新一代消费者表达个性与审美的创意工具。

品牌的诞生源于一份母亲的初心。创始人郭丁绮在陪伴青春期女儿探索美的过程中，发现市场上缺乏既安全健康、又契合年轻人审美需求的美妆产品。以此为起点，FancyCube确立了“0酒精、0矿物油、0滑石粉”的严苛标准，坚持使用食品级色垫，赢得“可以放心交给孩子的第一支彩妆”的国际口碑。

在产品研发上，FancyCube以创新打破传统彩妆边界。旗舰产品“梦幻魔方多用彩妆膏”实现唇颊眼多用、全脸调色，独特的立方体吊饰设计搭配可更换配件，让彩妆成为可随身佩戴的时尚单品。品牌自创立之初即布局全球化战略，目前用户遍布全球30余个国家，从巴黎时装周到东京涩谷，以产品力证明中国品牌的国际竞争力。

---

FancyCube is a Shanghai-born accessory makeup brand launched in 2021 with the core concept of "wearable makeup." It liberates beauty products from the vanity table, integrating them into daily life and personal style—becoming a creative tool for a new generation to express individuality and aesthetic sensibility.

Born from a mother's heartfelt intention, founder Dingyi Guo established rigorous standards: "0 Alcohol, 0 Mineral Oil, 0 Talc" and food-grade pigments, earning it the international reputation as "the first makeup you can trust for your child."

The flagship "Magic Cube Multi-use Makeup Balm" serves multiple functions—lips, cheeks, and eyes—for full-face color mixing. Its unique cube-shaped charm design, paired with interchangeable accessories, transforms makeup into a fashion statement. With a global strategy from day one, FancyCube now reaches users in over 30 countries, proving Chinese brand competitiveness from Paris Fashion Week to Tokyo.
    `
  },
  {
    id: 'yonghua',
    name: '咏华之美',
    nameEn: 'Yonghua Beauty',
    description: '真金鎏彩工艺陶瓷',
    descriptionEn: 'Pure Gold Glazed Ceramics',
    image: '/yonghuazhimei.png',
    gallery: [
      '/咏华之美海报1.png',
      '/咏华之美海报2.png',
      '/咏华之美海报3.png',
      '/咏华之美海报4.png'
    ],
    category: '金碗',
    categoryEn: 'Golden Bowl',
    location: 'Shanghai',
    lat: 31.24,
    lng: 121.49,
    story: `
咏华之美是一个将东方皇家器物美学与当代健康生活标准相融合的高端品牌。选用英国顶级骨瓷为胎。其铅、镉溶出率远优于国际标准，将安全置于奢华之上。器物上所有璀璨的金色装饰均为100%纯金。采用独家 “纯金鎏彩”工艺，将德国贺利氏贵金属材料，通过手工层层绘制于瓷胎之上，经高温烧制使金层与釉面熔融结合，将真金化为器物永恒的肌肤。

一只金碗的诞生，需经历七十余道工序的虔心锻造。这种对原料与技艺的极致追求，最终成就了其耐磨恒久、光华内敛的非凡品质。

---

Yonghua Beauty merges Eastern royal aesthetics with modern wellness ideals. Its pieces are made from premium English bone china, with lead and cadmium release rates surpassing international standards—placing safety first. All gilded details are crafted from 100% pure gold. Using an innovative “Pure Gold Glazing” technique, German Heraeus precious metals are hand‑layered onto the porcelain and fired at high temperature, fusing the gold permanently into the glaze. Each golden bowl undergoes over seventy meticulous steps, resulting in durable, finely radiant pieces defined by exceptional material and craft.
    `
  }
];

export const EVENTS: Event[] = [
  {
    id: '5',
    title: 'Fancycube彩妆派对｜新色彩·东方妆',
    titleEn: 'Fancycube Makeup Party | New Colors, Eastern Style',
    description: '想成为朋友圈最亮眼的美妆达人吗？\n这一次，舶物志将知名美妆品牌 FANCYCUBE 的主理人 LuLu老师请到了鼓浪屿号上，为你带来一场关于色彩与东方美学的沉浸式彩妆派对。你将跟随LuLu老师，学习独特的 “色彩情绪学”。从东方妆造技巧到时尚美学穿搭，LuLu老师将用她多年的专业经验，帮你快速参透那些“看起来很厉害、其实很简单”的美妆秘诀。\n无需基础，只需一颗想要变美的心。这个下午，让我们一起——悄悄惊艳所有人。\n\nBecome the beauty star of your feed!\nJoin FancyCube founder LuLu onboard Boatique for an immersive makeup party on color and Eastern aesthetics. Learn her "color-emotion theory".From classic techniques to modern trends, LuLu shares pro tips that are easy to master.\nNo skills needed—just the wish to shine. This afternoon, let\'s quietly dazzle the world.',
    location: '鼓浪屿号邮轮 13楼 船尾酒吧宴会厅',
    locationEn: 'Piano Land, 13F Aft Bar Ballroom',
    image: '/fancycube海报新1.png',
    gallery: ['/fancycube海报新1.png', '/fancycube海报新2.png', '/fancycube海报新3.png'],
    type: '美妆派对',
    typeEn: 'Makeup Party'
  },
  {
    id: '1',
    title: '海派旗袍文化讲座',
    titleEn: 'Shanghai Qipao Culture Lecture',
    description: '旗袍传奇大师褚宏生先生嫡传弟子,周朱光和张琛带来的讲座《非遗新绎：揭秘明星衣橱里的东方美学》，不仅分享了海派旗袍的百年演变史，更是让宾客亲自试穿店内的海派旗袍和中式男装的样衣，更加深刻的体会到东方美学和高定服装极致的手工艺。\n\nThe lecture ‘Heritage Reimagined: Oriental Aesthetics in Celebrity Wardrobes" was given by master qipao artisan Chu Hongsheng\'s disciples. Guests explored the history of Shanghai-style qipao and experienced its craftsmanship firsthand through try-ons of qipao and Chinese menswear samples.',
    image: '/瀚艺讲座.jpg.jpeg',
    location: '鼓浪屿号邮轮 7楼船中 船长酒廊',
    locationEn: 'Piano Land, 7F Captain\'s Lounge',
    type: '大师讲堂',
    typeEn: 'Master Lecture'
  },
  {
    id: '2',
    title: '波罗的海琥珀品鉴会',
    titleEn: 'Baltic Amber Tasting Event',
    description: '国家级工艺美术大师柯少军为大家带来讲座《琥珀时光：亿万年的凝脂与匠心》从琥珀的形成、鉴别延伸到其‘一石一设计’的独特理念。用手上不同的琥珀作为‘教材’，通过紫光灯和触摸，为满座的的宾客带来一场充满知识和感官的互动体验。\n\nNational Craft Art Master Ke Shaojun delivered the lecture Amber Time: An Epoch of Patina and Craftsmanship. Covering amber’s formation, identification, and the "one stone, one design" philosophy, he used specimens, UV light, and hands-on touch to create an interactive experience rich in knowledge and sensory engagement for the audience.',
    image: '/乐印琥珀讲座.png',
    location: '鼓浪屿号邮轮 7楼船中 船长酒廊',
    locationEn: 'Piano Land, 7F Captain\'s Lounge',
    objectPosition: 'right',
    type: '珠宝品鉴',
    typeEn: 'Jewelry Tasting'
  },
  {
    id: '3',
    title: '《紫砂慢生活：一壶一世界》讲座',
    titleEn: '"Zisha Slow Living: One Teapot, One World" Lecture',
    description: '讲座由徐门紫砂第五代传人徐光带来。他以年轻一代的视角，分享他在百年紫砂世家的独特经历和他如何将现代美学与产品设计思维融入古老的紫砂工艺中。他向宾客展示自己亲手制作的紫砂作品并讲解其创作背后的思考。宾客也可以亲手触摸感受紫砂作品优美的线条和符合人体工学的握感。\n\nXu Guang, fifth-generation inheritor of the Xu family’s Zisha tradition, led the lecture \'Zisha Slow Living: One Teapot, One World.\' He shared his family heritage and how modern aesthetics blend with traditional craftsmanship. Guests saw his works, heard their stories, and touched them to feel their form and texture—creating a tangible link to the art.',
    image: '/陶卦坊讲座.JPG',
    location: '鼓浪屿号邮轮 7楼船中 船长酒廊',
    locationEn: 'Piano Land, 7F Captain\'s Lounge',
    type: '大师讲堂',
    typeEn: 'Master Lecture'
  },
  {
    id: '4',
    title: '舶物志抽奖狂欢夜',
    titleEn: 'Boatique Lucky Draw Night',
    description: '每一次航程，舶物志都会准备不同的福利为迎接远道而来的您！Labubu盲盒，意大利进口包包，甚至还有飞天茅台！看看谁的手气这么好！\n\nPrize Draw Carnival Night\nEvery voyage, Boatique prepares different benefits to welcome you from afar! Labubu blind boxes, imported Italian bags, and even Feitian Moutai! Let\'s see who has such good luck!',
    image: '/抽奖活动.jpg.jpeg',
    location: '鼓浪屿号邮轮 7楼船中 船长酒廊',
    locationEn: 'Piano Land, 7F Captain\'s Lounge',
    type: '抽奖',
    typeEn: 'Lucky Draw'
  }

];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '海派手工绣花旗袍',
    nameEn: 'Hand-Embroidered Shanghai Qipao',
    price: '¥8,800',
    image: '/hanyi-qipao.jpg',
    category: '服饰',
    categoryEn: 'Apparel',
    brand: '瀚艺HANART 旗袍/男装',
    brandEn: 'HANART Qipao/Menswear'
  },
  {
    id: 'p2',
    name: '波罗的海天然琥珀吊坠',
    nameEn: 'Natural Baltic Amber Pendant',
    price: '¥3,200',
    image: '/leying.jpg',
    category: '珠宝',
    categoryEn: 'Jewelry',
    brand: '乐印Brandr 琥珀',
    brandEn: 'Brandr Amber'
  },
  {
    id: 'p3',
    name: '徐汉棠监制紫砂壶',
    nameEn: 'Xu Hantang Supervised Zisha Teapot',
    price: '¥5,600',
    image: '/taoguafang.56.35.png',
    category: '茶具',
    categoryEn: 'Teaware',
    brand: '陶卦坊紫砂',
    brandEn: 'Tao Gua Fang Zisha'
  },
  {
    id: 'p4',
    name: '意大利植鞣革手提包',
    nameEn: 'Italian Vegetable-Tanned Handbag',
    price: '¥4,500',
    image: '/sarabyjg.39.54.png',
    category: '皮具',
    categoryEn: 'Leather Goods',
    brand: 'SARA BY JG',
    brandEn: 'SARA BY JG'
  },
  {
    id: 'p5',
    name: '穆拉诺手工艺术玻璃杯',
    nameEn: 'Murano Handmade Art Glass',
    price: '¥1,200',
    image: '/artedimurano.png',
    category: '水晶',
    categoryEn: 'Crystal',
    brand: 'ARTE DI MURANO',
    brandEn: 'ARTE DI MURANO'
  },
  {
    id: 'p6',
    name: 'Fancycube 梦幻魔方彩妆膏',
    nameEn: 'Fancycube Magic Cube Makeup Balm',
    price: '¥298',
    image: '/fancycube.21.09.png',
    category: '美妆',
    categoryEn: 'Beauty',
    brand: 'Fancycube',
    brandEn: 'Fancycube'
  },
  {
    id: 'p7',
    name: 'Studio Flo 极简意式皮包',
    nameEn: 'Studio Flo Minimalist Italian Bag',
    price: '¥3,800',
    image: '/studioflo.43.20.png',
    category: '皮具',
    categoryEn: 'Leather Goods',
    brand: 'STUDIO FLO',
    brandEn: 'STUDIO FLO'
  },
  {
    id: 'p8',
    name: '松野湃 专业滑雪速干衣',
    nameEn: 'Surpine Professional Ski Quick-Dry Top',
    price: '¥699',
    image: '/songyepai.18.47.png',
    category: '运动',
    categoryEn: 'Sports',
    brand: '松野湃 Surpine',
    brandEn: 'Surpine'
  },
  {
    id: 'p9',
    name: '咏华之美 真金鎏彩骨瓷碗',
    nameEn: 'Yonghua Beauty Pure Gold Bone China Bowl',
    price: '¥1,580',
    image: '/yonghuazhimei.png',
    category: '金碗',
    categoryEn: 'Golden Bowl',
    brand: '咏华之美',
    brandEn: 'Yonghua Beauty'
  }
];
