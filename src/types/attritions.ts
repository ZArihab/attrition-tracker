export type AttritionType = "External" | "Internal";

export type RegrettedStatus = "Yes" | "No";

export interface AttritionEvent {
    id: string;
    name: string;
    alias: string;
    profile: string;
    date: string;
    type: AttritionType;
    timeRole: string;
    reason?: string;
    regretted?: RegrettedStatus;
    notes?: string;
}
