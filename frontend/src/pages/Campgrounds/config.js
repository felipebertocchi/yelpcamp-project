export default {
    path: 'campgrounds',
    children: [
        {
            index: true,
            lazy: () => import('./index'),
        },
        {
            path: ':campgroundId',
            lazy: () => import('./subscreen')
        }
    ]
};