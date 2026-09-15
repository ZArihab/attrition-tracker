import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonDropdown,
    Header,
    Pagination,
    PropertyFilter,
    SpaceBetween,
    Table,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { AttritionEvent } from "../../types/attritions";
import { pendingColumnDefinitions, filteringProperties } from "./config";

// TODO: replace mock data with a real API call
const resources: AttritionEvent[] = [
    {
        id: "Employee3",
        name: "Employee3",
        alias: "alias3",
        profile: "DTS",
        date: "2026-08-02",
        type: "External",
        timeRole: "3y 11m 5d",
    },
    {
        id: "Employee4",
        name: "Employee4",
        alias: "alias4",
        profile: "ETL",
        date: "2026-11-12",
        type: "External",
        timeRole: "2y 2m 10d",
    },
];

const PAGE_SIZE = 10;

export default function PendingReviewTable() {
    const [pendingAttritions, setPendingAttritions] = useState<AttritionEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { items, collectionProps, paginationProps, propertyFilterProps } = useCollection(
        pendingAttritions,
        {
            propertyFiltering: { filteringProperties },
            pagination: { pageSize: PAGE_SIZE },
            sorting: {},
            selection: { trackBy: "id" },
        }
    );
    const selectedItem = collectionProps.selectedItems?.[0];
    const noSelection = !selectedItem;

    const fetchPendingAttritions = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            // TODO: replace with real API call
            await new Promise((r) => setTimeout(r, 1000));
            setPendingAttritions(resources);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPendingAttritions();
    }, [fetchPendingAttritions]);

    const header = (
        <Header
            counter={
                selectedItem
                    ? `(1/${pendingAttritions.length})`
                    : `(${pendingAttritions.length})`
            }
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button
                        iconName="refresh"
                        ariaLabel="Refresh"
                        onClick={fetchPendingAttritions}
                    />
                    <ButtonDropdown
                        disabled={noSelection}
                        onItemClick={({ detail }) => {
                            // TODO: wire up pending review actions
                            console.log(detail.id, selectedItem?.id);
                        }}
                        items={[
                            { text: "Review", id: "review" },
                            { text: "Delete", id: "delete" },
                        ]}
                    >
                        Actions
                    </ButtonDropdown>
                </SpaceBetween>
            }
        >
            Attritions pending review
        </Header>
    );

    return (
        <Table
            {...collectionProps}
            selectionType="single"
            columnDefinitions={pendingColumnDefinitions}
            items={items}
            loading={loading}
            loadingText="Loading attritions pending review"
            empty={
                error ? (
                    <SpaceBetween size="s" alignItems="center">
                        <Box variant="p" color="text-status-error">
                            Failed to load attritions pending review. Please try again.
                        </Box>
                        <Button onClick={fetchPendingAttritions}>Retry</Button>
                    </SpaceBetween>
                ) : (
                    "No attritions pending review"
                )
            }
            header={header}
            filter={
                <div className="filter-field">
                    <PropertyFilter
                        {...propertyFilterProps}
                        filteringPlaceholder="Filter by name, type, .."
                    />
                </div>
            }
            pagination={<Pagination {...paginationProps} />}
        />
    );
}
