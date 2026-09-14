import { Box, Button, Modal, SpaceBetween } from "@cloudscape-design/components";
import { ReactNode } from "react";

interface AppModalProps {
    visible: boolean;
    header: string;
    actionButtonText?: string;   // omit to hide the action button (e.g. view-only)
    content: ReactNode;
    onDismiss: () => void;
    onConfirm?: () => void;
}

export default function AppModal({
    visible,
    header,
    actionButtonText,
    content,
    onDismiss,
    onConfirm,
}: AppModalProps) {
    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            header={header}
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDismiss}>Cancel</Button>
                        {actionButtonText && (
                            <Button variant="primary" onClick={onConfirm}>
                                {actionButtonText}
                            </Button>
                        )}
                    </SpaceBetween>
                </Box>
            }
        >
            {content}
        </Modal>
    );
}
