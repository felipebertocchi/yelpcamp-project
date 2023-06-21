import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import { useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';

export default () => {
    const { colorScheme } = useMantineColorScheme();
    return (
        <Link to={'/'}><img src={colorScheme === 'dark' ? logoDark : logo} width={180} alt="logo" /></Link>
    );
}