import ContentLayout from "@cloudscape-design/components/content-layout";
import {
    Header,
    Tabs,
} from "@cloudscape-design/components";
import AttritionEventsTable from "./AttritionEventsTable";
import PendingReviewTable from "./PendingReviewTable";

export default function AttritionsPage() {
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
                        content: <AttritionEventsTable />,
                    },
                    {
                        label: "Pending review",
                        id: "pending",
                        content: <PendingReviewTable />,
                    },
                ]}
            />
        </ContentLayout>
    );
}