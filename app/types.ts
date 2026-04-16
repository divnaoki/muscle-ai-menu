export const GOALS = [
  "筋肉をつける",
  "脂肪を燃やす",
  "体力をつける",
  "姿勢を改善する",
] as const;

export const BODY_PARTS = [
  "全身",
  "胸",
  "背中",
  "腕",
  "腹筋",
  "脚",
  "肩",
] as const;

export const LEVELS = ["初心者", "中級者", "上級者"] as const;

export const DURATIONS = ["15分", "30分", "60分", "90分"] as const;

export const EQUIPMENTS = [
  "自重のみ",
  "ダンベル",
  "バーベル",
  "ジム全設備",
] as const;

export type Goal = (typeof GOALS)[number];
export type BodyPart = (typeof BODY_PARTS)[number];
export type Level = (typeof LEVELS)[number];
export type Duration = (typeof DURATIONS)[number];
export type Equipment = (typeof EQUIPMENTS)[number];

export type MenuConditions = {
  goal: Goal | null;
  parts: BodyPart[];
  level: Level | null;
  duration: Duration | null;
  equipment: Equipment | null;
};

export const EMPTY_CONDITIONS: MenuConditions = {
  goal: null,
  parts: [],
  level: null,
  duration: null,
  equipment: null,
};

export type ResolvedConditions = {
  goal: Goal;
  parts: BodyPart[];
  level: Level;
  duration: Duration;
  equipment: Equipment;
};

export function isComplete(c: MenuConditions): c is ResolvedConditions & MenuConditions {
  return (
    c.goal !== null &&
    c.parts.length > 0 &&
    c.level !== null &&
    c.duration !== null &&
    c.equipment !== null
  );
}

export const STORAGE_KEYS = {
  result: "menu_result",
  meta: "menu_meta",
} as const;
