import { Modal, useMantineTheme } from '@mantine/core';

export default function (props) {
    const { children, title } = props;
    const theme = useMantineTheme();

    return (
        <Modal
            {...props}
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