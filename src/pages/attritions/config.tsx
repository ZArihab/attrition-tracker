import {
    Badge,
    DateRangePickerProps,
    StatusIndicator,
    TableProps,
} from "@cloudscape-design/components";
import { AttritionEvent, AttritionType, RegrettedStatus } from "../../types/attritions";

const typeBadge = (type: AttritionType) => (
    <Badge color={type === "External" ? "grey" : "blue"}>{type}</Badge>
);

const regrettedStatus = (regretted?: RegrettedStatus) => {
    if (regretted === "Yes") {
        return <StatusIndicator type="warning">Yes</StatusIndicator>;
    }
    if (regretted === "No") {
        return <StatusIndicator type="success" colorOverride="grey">No</StatusIndicator>;
    }
    return "-";
};

export const columnDefinitions: TableProps.ColumnDefinition<AttritionEvent>[] = [
    { id: "name", header: "Name", cell: (i) => i.name, isRowHeader: true, sortingField: "name" },
    { id: "alias", header: "Alias", cell: (i) => i.alias, sortingField: "alias" },
    { id: "profile", header: "Profile", cell: (i) => i.profile, sortingField: "profile" },
    { id: "type", header: "Type", cell: (i) => typeBadge(i.type), sortingField: "type" },
    { id: "timeRole", header: "Time in role", cell: (i) => i.timeRole, sortingField: "timeRole" },
    { id: "date", header: "Date", cell: (i) => i.date, sortingField: "date" },
    { id: "reason", header: "Reason", cell: (i) => i.reason ?? "-" },
    { id: "regretted", header: "Regretted", cell: (i) => regrettedStatus(i.regretted), sortingField: "regretted" },
    { id: "notes", header: "Notes", cell: (i) => i.notes ?? "-" },
];

export const pendingColumnDefinitions: TableProps.ColumnDefinition<AttritionEvent>[] = [
    { id: "name", header: "Name", cell: (i) => i.name, isRowHeader: true, sortingField: "name" },
    { id: "alias", header: "Alias", cell: (i) => i.alias, sortingField: "alias" },
    { id: "profile", header: "Profile", cell: (i) => i.profile, sortingField: "profile" },
    { id: "type", header: "Type", cell: (i) => typeBadge(i.type), sortingField: "type" },
    { id: "timeRole", header: "Time in role", cell: (i) => i.timeRole, sortingField: "timeRole" },
    { id: "date", header: "Date", cell: (i) => i.date, sortingField: "date" },
];

export const defaultVisible = new Set(["name", "alias", "profile", "timeRole", "date", "type", "reason"]);

export const filteringProperties = [
    { key: "name", propertyLabel: "Name", groupValuesLabel: "Name values", operators: [":", "!:", "=", "!="] },
    { key: "type", propertyLabel: "Type", groupValuesLabel: "Type values", operators: ["=", "!="] },
];

export const defaultDateRange: DateRangePickerProps.RelativeValue = {
    type: "relative",
    amount: 3,
    unit: "month",
    key: "previous-3-months",
};

export const relativeDateOptions: DateRangePickerProps.RelativeOption[] = [
    {
        key: "previous-1-month",
        amount: 1,
        unit: "month",
        type: "relative",
    },
    {
        key: "previous-3-months",
        amount: 3,
        unit: "month",
        type: "relative",
    },
    {
        key: "previous-6-months",
        amount: 6,
        unit: "month",
        type: "relative",
    },
    {
        key: "previous-12-months",
        amount: 12,
        unit: "month",
        type: "relative",
    },
];

export type ModalMode = "view" | "edit" | "delete";
