export const secondaryColor = "#00939d";
export const primaryColor = "#FFFFFF";
export const ADD_NEW_ITEM_CODE = "new";
export const SUPER_ADMIN_TAG = "SUPER_ADMIN";
export const SUB_ADMIN_TAG = "SUB_ADMIN";

export const CONFUSED_TRAVOLTA_URL = "https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif";

export enum StorageFolders {
    audio   = "AudioFiles",
    image   = "Imgs"
}

export const STATS_WIDGET_COLORS = [
    "#d1ab2f",
    "#227980",
    "#ce3c4b",
    "#a03a99"
];

export const STATS_GRAPH_COLORS = [
    "#d1ab2f",
    "#227980",
    "#ce3c4b",
    "#a03a99"
];

export enum STATS_CATEGORIES {
    activeUsersPercent,     // Divide by the total number of users in the Db (Percentage)
    totalActiveUsers,       // Number of active Users per Week  (Number)
    avgWellBeing,           // Int over 5
    mostPopularMeditation   // Enum value (Yet to be determined)
}

export enum MEDITATION_TYPES {
    ZEN,
    SHINTO,
    BUDHA,
    TIBET,
    CHAKRA,
    PSY
}

export const MEDITATION_TYPES_ARRAY = [
    MEDITATION_TYPES.ZEN,
    MEDITATION_TYPES.SHINTO,
    MEDITATION_TYPES.BUDHA,
    MEDITATION_TYPES.TIBET,
    MEDITATION_TYPES.CHAKRA,
    MEDITATION_TYPES.PSY
];