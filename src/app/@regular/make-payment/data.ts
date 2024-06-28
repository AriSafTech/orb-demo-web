const dummyMerchants = [
  {
    id: "yokosuka_beer",
    name: "横須賀ビール",
  },
  {
    id: "uniqlo",
    name: "ユニクロ横須賀大津店",
  },
  {
    id: "tsunami",
    name: "TSUNAMI",
  },
  {
    id: "rinn",
    name: "凛",
  },
  {
    id: "kuri",
    name: "庫裏",
  },
  {
    id: "blue_port",
    name: "Blueport",
  },
  {
    id: "obara",
    name: "AVE 本店",
  },
  {
    id: "toyo",
    name: "テーラー東洋",
  },
  {
    id: "white_dog",
    name: "ホワイトドッグ",
  },
  {
    id: "yokosuka_city",
    name: "横須賀市役所",
  },
  {
    id: "starbucks",
    name: "スターバックス横須賀大津店",
  },
  {
    id: "yokosuka_museum",
    name: "横須賀美術館",
  },
  {
    id: "step",
    name: "ステップゴルフ➕",
  },
  {
    id: "7eleven",
    name: "セブンイレブン若松町",
  },
] as const;

export type VendorId = (typeof dummyMerchants)[number]["id"];

export type Vendor = {
  id: string;
  name: string;
  imgUrl: string;
  orbId: string;
};

const FAV_KEYS: VendorId[] = [
  "7eleven",
  "yokosuka_beer",
  "yokosuka_city",
  "yokosuka_museum",
  "uniqlo",
  "tsunami",
  "step",
  "toyo",
  "starbucks",
];
const NEAR_YOU_KEYS: VendorId[] = [
  "obara",
  "white_dog",
  "blue_port",
  "rinn",
  "uniqlo",
  "kuri",
];

export const DUMMY_FAVOURITES = FAV_KEYS.map((k) => {
  const m = dummyMerchants.find((mer) => mer.id === k)!;
  return {
    id: m.id,
    name: m.name,
    imgUrl: `/merchants/${m.id}.png`,
    orbId: m.id,
  } satisfies Vendor;
});

export const DUMMY_NEAR_YOU = NEAR_YOU_KEYS.map((k) => {
  const m = dummyMerchants.find((mer) => mer.id === k)!;
  return {
    id: m.id,
    name: m.name,
    imgUrl: `/merchants/${m.id}.png`,
    orbId: m.id,
  } satisfies Vendor;
});
