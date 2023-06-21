import { RouterProvider } from 'react-router-dom';
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';
import router from './router';

export default () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }} >
                <RouterProvider router={router} />
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
