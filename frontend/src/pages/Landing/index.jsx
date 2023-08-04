import { Button, Container, Text, createStyles, rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Logo from "../../layout/components/Logo";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        height: '89vh',
        backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url("https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textShadow: '0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)',
        boxShadow: 'inset 0 0 5rem rgba(0, 0, 0, 0.5)',

        [theme.fn.smallerThan('xs')]: {
            paddingTop: rem(80),
            paddingBottom: rem(50),
            backgroundPositionX: '20%'
        },
    },
    text: {
        textShadow: '0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)'
    }
}))

export function Component() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <Container ta={"center"} pos={"relative"} top={'30%'}>
                <Logo color={"white"} width={400} />
                <Text my={20} fz={20} c={"white"} className={classes.text}>
                    Welcome to YelpCamp! <br />
                    Jump right in and explore our many campgrounds. <br />
                    Feel free to share some of your own and comment on others!
                </Text>
                <Button variant="white" size={'md'} c={"dark"} onClick={() => navigate('campgrounds')}>
                    View Campgrounds
                </Button>
            </Container>
        </div>
    )
}