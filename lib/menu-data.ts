export interface Dish {
  id: string;
  title: string;
  amharic: string;
  tag: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
}

export interface MenuCategoryData {
  id: string;
  name: string;
  amharic: string;
  description: string;
  dishes: Dish[];
}

export const TAG_STYLES: Record<string, string> = {
  Signature: "bg-brand-gold/95 text-brand-charcoal",
  Vegan: "bg-brand-green-main/90 text-white",
  Vegetarian: "bg-brand-green-main/90 text-white",
  "Chef's Pick": "bg-white/15 text-brand-gold border border-brand-gold/40",
  Popular: "bg-[#2B6027] text-white",
  Spicy: "bg-red-800/90 text-white",
};

export const MENU_CATEGORIES: MenuCategoryData[] = [
  {
    id: "starters",
    name: "Starters & Appetizers",
    amharic: "መክሰስ",
    description: "Begin your journey with our hand-crafted small plates.",
    dishes: [
      {
        id: "sambusa-meat",
        title: "Beef Sambusa",
        amharic: "የስጋ ሳምቡሳ",
        tag: "Popular",
        description: "Crispy pastry pockets filled with spiced minced beef, lentils, and herbs. Served with a tangy awaze dip.",
        price: "AED 35",
        image: "https://images.unsplash.com/photo-1601314167099-232775b2831f?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Crispy beef sambusa on a wooden board",
      },
      {
        id: "sambusa-lentil",
        title: "Lentil Sambusa",
        amharic: "የምስር ሳምቡሳ",
        tag: "Vegan",
        description: "Golden fried pastries stuffed with savory brown lentils, jalapeños, and Ethiopian spices.",
        price: "AED 30",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Vegetarian lentil sambusa",
      },
      {
        id: "kategna",
        title: "Kategna",
        amharic: "ቃተኛ",
        tag: "Signature",
        description: "Toasted teff injera generously spread with awaze (spicy pepper paste) and niter kibbeh (clarified butter).",
        price: "AED 40",
        image: "https://images.unsplash.com/photo-1574880562694-5c914cd6b31c?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Kategna - toasted injera with spiced butter",
      },
      {
        id: "azifa",
        title: "Azifa",
        amharic: "አዚፋ",
        tag: "Vegan",
        description: "A refreshing green lentil salad with mustard, jalapeños, onions, and lemon juice. Served chilled.",
        price: "AED 35",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Azifa green lentil salad",
      },
    ],
  },
  {
    id: "wats-and-tibs",
    name: "Wats & Tibs",
    amharic: "ወጥ እና ጥብስ",
    description: "Rich stews and sizzling sautées, served with our signature 100% teff injera.",
    dishes: [
      {
        id: "doro-wat",
        title: "Doro Wat",
        amharic: "ዶሮ ወጥ",
        tag: "Signature",
        description: "Our crown jewel — tender chicken slow-braised in a rich berbere spice blend, perfumed with black cumin and clarified niter kibbeh.",
        price: "AED 85",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Doro Wat — rich Ethiopian chicken stew",
      },
      {
        id: "yebere-tibs",
        title: "Ye'Bere Tibs",
        amharic: "የበሬ ጥብስ",
        tag: "Chef's Pick",
        description: "Prime cuts of beef sautéed over high heat with rosemary, jalapeño, and caramelised onions.",
        price: "AED 95",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ye'Bere Tibs — sautéed Ethiopian beef",
      },
      {
        id: "kitfo",
        title: "Kitfo",
        amharic: "ክትፎ",
        tag: "Popular",
        description: "Finely chopped lean beef, warmed in spiced butter and mitmita. Served raw, rare, or cooked alongside ayib (fresh cheese).",
        price: "AED 110",
        image: "https://images.unsplash.com/photo-1544025162-831451f21eb2?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Kitfo - Ethiopian beef tartare",
      },
      {
        id: "zigni",
        title: "Zigni",
        amharic: "ዝግኒ",
        tag: "Spicy",
        description: "A fiery and robust beef stew simmered for hours in a rich tomato and berbere sauce.",
        price: "AED 90",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Zigni beef stew",
      },
    ],
  },
  {
    id: "vegetarian",
    name: "Vegan & Vegetarian",
    amharic: "የፆም ምግቦች",
    description: "Wholesome, plant-based dishes celebrating the rich harvest of the highlands.",
    dishes: [
      {
        id: "misir-wat",
        title: "Misir Wat",
        amharic: "ምሥር ወጥ",
        tag: "Vegan",
        description: "A deeply aromatic red lentil stew, slow-simmered with our house berbere blend. Wholly plant-based and utterly satisfying.",
        price: "AED 55",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Misir Wat — Ethiopian spiced red lentil stew",
      },
      {
        id: "shiro-tegamino",
        title: "Shiro Tegamino",
        amharic: "ሽሮ ተጋሚኖ",
        tag: "Signature",
        description: "Silky roasted chickpea stew, heavily spiced and served bubbling hot in a traditional clay pot.",
        price: "AED 60",
        image: "https://images.unsplash.com/photo-1548943487-a2e4f43bb2bb?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Shiro stew in a clay pot",
      },
      {
        id: "gomen",
        title: "Gomen",
        amharic: "ጎመን",
        tag: "Vegan",
        description: "Collard greens slow-cooked to perfection with mild spices, garlic, and ginger.",
        price: "AED 45",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ethiopian collard greens",
      },
      {
        id: "atkilt-wot",
        title: "Atkilt Wot",
        amharic: "አትክልት ወጥ",
        tag: "Vegan",
        description: "A mild, comforting stew of cabbage, carrots, and potatoes flavored with turmeric.",
        price: "AED 45",
        image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Atkilt Wot cabbage and carrots",
      },
      {
        id: "beyaynetu",
        title: "Yetsom Beyaynetu",
        amharic: "የፆም በያይነቱ",
        tag: "Popular",
        description: "The ultimate vegan platter. A colorful array of all our plant-based stews and salads arranged on a bed of fresh injera.",
        price: "AED 85",
        image: "https://images.unsplash.com/photo-1565557618462-81e5927c34d3?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Vegetarian mixed platter on injera",
      },
    ],
  }
];
