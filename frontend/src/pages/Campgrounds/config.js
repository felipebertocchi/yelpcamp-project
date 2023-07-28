export default {
    path: 'campgrounds',
    children: [
        {
            index: true,
            lazy: () => import('./index'),
        },
        {
            path: 'new',
            lazy: () => import('./new')
        },
        {
            path: ':campgroundId',
            lazy: () => import('./subscreen')
        },
        {
            path: ':campgroundId/edit',
            lazy: () => import('./edit'),
        }
    ]
};