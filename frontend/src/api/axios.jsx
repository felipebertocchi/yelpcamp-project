import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    headers: { "Content-Type": 'application/json' },
    withCredentials: true,
    timeout: 8000,
})

API.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

API.interceptors.response.use((response) => {
    if (response.data?.notif) {
        notifications.show({
            title: response.data?.notif.title || 'Success',
            message: response.data?.notif.msg,
            withBorder: true,
            color: 'teal',
            icon: <IconCheck />,
        })
    }
    return response;
}, (error) => {
    notifications.show({
        title: error.response.data?.notif?.title || 'Error',
        message: error.response.data?.notif?.msg || 'Something went wrong',
        withBorder: true,
        color: 'red',
        icon: <IconX />,
    })
    return Promise.reject(error);
});

export default API