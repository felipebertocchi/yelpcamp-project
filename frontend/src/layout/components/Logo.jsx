import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import { useMantineColorScheme } from '@mantine/core';

export default () => {
    const { colorScheme } = useMantineColorScheme();
    return (
        <img src={colorScheme === 'dark' ? logoDark : logo} width={180} alt="logo" />
    );
}