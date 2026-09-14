import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import Box from "@cloudscape-design/components/box";

export default function DashboardPage() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Overview of tracked attrition, pending reviews, and recent events."
        >
          Dashboard
        </Header>
      }
    >
      <Container>
        <Box variant="p" color="text-body-secondary">
          Dashboard content goes here.
        </Box>
      </Container>
    </ContentLayout>
  );
}
