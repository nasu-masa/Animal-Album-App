import type { MediaCategory } from "@/types/media";

type CategoryOption = {
  value: MediaCategory;
  label: string;
};

type CategoryGroup = {
  label: string;
  options: CategoryOption[];
};

export const categoryGroups: CategoryGroup[] = [
  {
    label: "哺乳類",
    options: [
      { value: "cat", label: "猫" },
      { value: "dog", label: "犬" },
      { value: "rabbit", label: "うさぎ" },
      { value: "hamster", label: "ハムスター" },
      { value: "guinea_pig", label: "モルモット" },
      { value: "chinchilla", label: "チンチラ" },
      { value: "degu", label: "デグー" },
      { value: "mouse", label: "マウス" },
      { value: "rat", label: "ラット" },
      { value: "rodent", label: "その他のげっ歯類" },
      { value: "primate", label: "サル・その他の霊長類" },
      { value: "mammal", label: "その他の哺乳類" },
    ],
  },
  {
    label: "鳥類",
    options: [
      { value: "budgerigar", label: "セキセイインコ" },
      { value: "cockatiel", label: "オカメインコ" },
      { value: "lovebird", label: "コザクラインコ・ボタンインコ" },
      { value: "java_sparrow", label: "文鳥" },
      { value: "canary", label: "カナリア" },
      { value: "parrot", label: "その他のインコ・オウム" },
      { value: "bird", label: "その他の鳥類" },
    ],
  },
  {
    label: "魚類",
    options: [
      { value: "goldfish", label: "金魚" },
      { value: "medaka", label: "メダカ" },
      { value: "betta", label: "ベタ" },
      { value: "guppy", label: "グッピー" },
      { value: "koi", label: "錦鯉" },
      { value: "tropical_fish", label: "その他の熱帯魚" },
      { value: "fish", label: "その他の魚類" },
    ],
  },
  {
    label: "爬虫類",
    options: [
      { value: "turtle", label: "カメ" },
      { value: "lizard", label: "トカゲ" },
      { value: "snake", label: "ヘビ" },
      { value: "gecko", label: "ヤモリ" },
      { value: "reptile", label: "その他の爬虫類" },
    ],
  },
  {
    label: "両生類",
    options: [
      { value: "frog", label: "カエル" },
      { value: "newt", label: "イモリ" },
      { value: "salamander", label: "サンショウウオ" },
      { value: "amphibian", label: "その他の両生類" },
    ],
  },
  {
    label: "その他",
    options: [{ value: "other", label: "その他の生き物" }],
  },
];

export const categoryLabels = Object.fromEntries(
  categoryGroups.flatMap((group) =>
    group.options.map(({ value, label }) => [value, label]),
  ),
) as Record<MediaCategory, string>;
