import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import Box from "@cloudscape-design/components/box";

export default function EmployeesPage() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Roster with tenure, time-on-team, and filters."
        >
          Employees
        </Header>
      }
    >
      <Container>
        <Box variant="p" color="text-body-secondary">
          Employees content goes here.
        </Box>
      </Container>
    </ContentLayout>
  );
}