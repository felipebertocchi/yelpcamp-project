import { Modal, useMantineTheme } from '@mantine/core';

export default function ({ opened, close, children, title }) {
    const theme = useMantineTheme();

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={title}
            yOffset={"10%"}
            withCloseButton={Boolean(title)}
            overlayProps={{
                color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                opacity: 0.85,
                blur: 3,
            }}
        >
            {children}
        </Modal>
    );
}