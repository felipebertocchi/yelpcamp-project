import { Button, Container, Flex, Image, Paper, Text, Title } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Component() {
    function GithubButton(props) {
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
    return (
        <Container size={"lg"} mt={60}>
            <Paper withBorder p={24} radius={10}>
                <Title sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    lineHeight: 1,
                    marginBottom: theme.spacing.md
                })}>
                    About this project
                </Title>
                <Flex mb={20}>
                    <Text fz={"xl"}>
                        Hello there! I'm Felipe, a passionate web developer behind this campground renting site. This project is a follow-up from Colt Steele's renowned Udemy course, where I honed my skills in web development. Building upon the solid foundation provided by the course, I took the initiative to elevate the site's capabilities by incorporating cutting-edge technologies like React into the mix. The journey of developing this site has been both challenging and rewarding, and I'm proud to showcase my skills as a full-stack developer through this project. If you're curious to peek under the hood, feel free to explore the GitHub repository where the magic happens! I'm always eager to collaborate, so don't hesitate to reach out if you have any exciting opportunities in mind. Happy camping!
                    </Text>
                    <Image width={275} m={24} src={'src/assets/undraw_developer.svg'} />
                </Flex>
                <GithubButton>Link to Repository</GithubButton>
            </Paper>
        </Container>
    )
}