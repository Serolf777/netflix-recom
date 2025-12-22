export interface SupportCard {
    id: number;
    type: number;
    group: boolean;
    rarity: number;
    limit_break: number;
    starting_stats: number[];
    type_stats: number;
    stat_bonus: number[];
    race_bonus: number;
    sb: number;
    specialty_rate: number;
    unique_specialty: number;
    offstat_appearance_denominator: number;
    tb: number;
    fs_bonus: number;
    mb: number;
    unique_fs_bonus: number;
    fs_stats: number[];
    fs_training: number;
    fs_motivation: number;
    fs_specialty: number;
    fs_ramp: number[];
    fs_energy: number;
    wisdom_recovery: number;
    effect_size_up: number;
    energy_up: number;
    energy_discount: number;
    fail_rate_down: number;
    hint_rate: number;
    highlander_threshold: number;
    highlander_training: number;
    crowd_bonus: number;
    char_name: string;
    fan_bonus: number;
};

export const supportCardProperties = {
    race_bonus: {
        friendly_name: "Race Bonus",
        shorthand: "RB"
    },
    tb: {
        friendly_name: "Training Effectiveness",
        shorthand: "TB"
    },
    fs_bonus: {
        friendly_name: "Friendship Bonus",
        shorthand: "FB"
    },
    mb: {
        friendly_name: "Mood Effect",
        shorthand: "MB"
    },
    sb: {
        friendly_name: "Initial Friendship Gauge",
        shorthand: "FG"
    },
    specialty_rate: {
        friendly_name: "Specialty Priority",
        shorthand: "SP"
    },
    hint_rate: {
        friendly_name: "Hint Frequency",
        shorthand: "HF"
    },
};

export interface RarityFilter {
    rarity: number;
    lb: number[];
}