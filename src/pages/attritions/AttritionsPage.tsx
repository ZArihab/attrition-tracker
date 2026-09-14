import { useCallback, useEffect, useState } from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import {
    Box,
    Button,
    ButtonDropdown,
    CollectionPreferences,
    CollectionPreferencesProps,
    DateRangePicker,
    DateRangePickerProps,
    Header,
    Pagination,
    PropertyFilter,
    SpaceBetween,
    Table,
    Tabs,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { AttritionEvent } from "../../types/attritions";
import { columnDefinitions, defaultVisible, filteringProperties, defaultDateRange, ModalMode } from "./config";
import AppModal from "../../components/AppModal";

const resources: AttritionEvent[] = [
    {
        id: "Employee1",
        name: "Employee1",
        alias: "alias1",
        profile: "DMI",
        date: "2026-08-19",
        type: "External",
        timeRole: "3y 11m 5d",
        reason: "Growth",
        regretted: "Yes",
    },
    {
        id: "Employee2",
        name: "Employee2",
        alias: "alias2",
        profile: "SVLS",
        date: "2026-12-12",
        type: "Internal",
        timeRole: "2y 2m 10d",
        reason: "TAM",
        regretted: "No",
    },
]

export default function AttritionsPage() {
    const [attritions, setAttritions] = useState<AttritionEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
        pageSize: 10,
        contentDisplay: columnDefinitions.map((c) => ({ id: c.id as string, visible: defaultVisible.has(c.id as string) }))
    });
    const { items, collectionProps, paginationProps, propertyFilterProps } = useCollection(attritions, {
        propertyFiltering: { filteringProperties },
        pagination: { pageSize: preferences.pageSize ?? 10 },
        sorting: {},
        selection: { trackBy: "id" },
    });
    const selectedItem = collectionProps.selectedItems?.[0];
    const noSelection = !selectedItem;
    const [modalMode, setModalMode] = useState<ModalMode | null>(null);
    const modalConfig = modalMode && {
        view: {
            header: "Attrition details",
            actionButtonText: undefined,
            content: selectedItem?.name,
            onConfirm: undefined,
        },
        edit: {
            header: "Edit attrition",
            actionButtonText: "Save",
            content: selectedItem?.name,
            onConfirm: () => {
                // TODO: save edited selectedItem
                setModalMode(null);
            },
        },
        delete: {
            header: "Delete attrition",
            actionButtonText: "Delete",
            content: (
                <>Are you sure you want to delete attrition record for <b>{selectedItem?.name}</b>? This action can't be undone.</>
            ),
            onConfirm: () => {
                console.log("delete", selectedItem?.id);
                setModalMode(null);
            },
        },
    }[modalMode];

    const [dateRange, setDateRange] = useState<DateRangePickerProps.Value | null>(
        defaultDateRange
    );

    const fetchAttritions = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            // TODO: replace with real API call
            await new Promise((r) => setTimeout(r, 1000));
            setAttritions(resources);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAttritions();
    }, [fetchAttritions]);

    const tableHeader = (
        <Header
            counter={selectedItem ? `(1/${attritions.length})` : `(${attritions.length})`}
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button
                        iconName="refresh"
                        ariaLabel="Refresh"
                        onClick={fetchAttritions}
                    />
                    <ButtonDropdown
                        disabled={noSelection}
                        onItemClick={({ detail }) => setModalMode(detail.id as ModalMode)}
                        items={[
                            {
                                text: "View details",
                                id: "view",
                            },
                            {
                                text: "Edit",
                                id: "edit",
                            },
                            {
                                text: "Delete",
                                id: "delete",
                            },
                        ]}
                    >
                        Actions
                    </ButtonDropdown>
                    <Button variant="normal">Download all</Button>
                </SpaceBetween>
            }
        >
            Attritions
        </Header>
    );

    const dateRangePicker = (
        <DateRangePicker
            value={dateRange}
            onChange={({ detail }) => setDateRange(detail.value)}
            relativeOptions={[
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
            ]}
            isValidRange={() => ({ valid: true })}
            placeholder="Filter by date"
            showClearButton={false}
        />
    );

    const eventsTable = (
        <Table
            {...collectionProps}
            selectionType="single"
            columnDefinitions={columnDefinitions}
            columnDisplay={preferences.contentDisplay}
            items={items}
            loading={loading}
            loadingText="Loading attritions"
            empty={
                error ? (
                    <SpaceBetween size="s" alignItems="center">
                        <Box variant="p" color="text-status-error">
                            Failed to load attritions. Please try again.
                        </Box>
                        <Button onClick={fetchAttritions}>Retry</Button>
                    </SpaceBetween>
                ) : (
                    "No attritions found"
                )
            }
            header={tableHeader}
            filter={
                <SpaceBetween direction="horizontal" size="s">
                    {dateRangePicker}
                    <div className="filter-field">
                        <PropertyFilter
                            {...propertyFilterProps}
                            filteringPlaceholder="Filter by type, name, .."
                        />
                    </div>
                </SpaceBetween>
            }
            pagination={<Pagination {...paginationProps} />}
            preferences={
                <CollectionPreferences
                    pageSizePreference={{
                        title: "Page size",
                        options: [
                            { value: 10, label: "10 Items" },
                            { value: 20, label: "20 Items" },
                            { value: 25, label: "25 Items" },
                        ],
                    }}
                    contentDisplayPreference={{
                        title: "Column preferences",
                        options: columnDefinitions.map((c) => ({ id: c.id as string, label: c.header as string })),
                    }}
                    wrapLinesPreference={{}}
                    preferences={preferences}
                    onConfirm={({ detail }) => setPreferences(detail)}
                />
            }
        />
    );

    return (
        <ContentLayout
            header={
                <Header
                    variant="h1"
                    description="Review newly detected attrition events and track attrition history."
                >
                    Attritions
                </Header>
            }
        >
            <Tabs
                tabs={[
                    {
                        label: "Attrition events",
                        id: "events",
                        content: eventsTable,
                    },
                    {
                        label: "Pending review",
                        id: "pending",
                        content: "Second tab content area",
                    },
                ]}
            />
            <AppModal
                visible={modalMode !== null}
                header={modalConfig?.header ?? ""}
                actionButtonText={modalConfig?.actionButtonText}
                onDismiss={() => setModalMode(null)}
                onConfirm={modalConfig?.onConfirm}
                content={modalConfig?.content}
            />
        </ContentLayout>
    );
}