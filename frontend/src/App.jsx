import { RouterProvider } from 'react-router-dom';
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './auth/AuthContext';
import { CampProvider } from './contexts/CampContext';
import router from './router';

export default () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <AuthProvider>
            <CampProvider>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }} >
                        <Notifications autoClose={8000} />
                        <RouterProvider router={router} />
                    </MantineProvider>
                </ColorSchemeProvider>
            </CampProvider>
        </AuthProvider>
    )
}
