import { Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export default function(props) {
    return (
        <Button
            {...props}
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/felipebertocchi/yelpcamp-project"
            leftIcon={<IconBrandGithub size="1rem" />}
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                },
            })}
        />
    );
}