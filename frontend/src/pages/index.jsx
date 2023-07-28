import { default as campgroundsConfig } from './Campgrounds/config'
import { default as registerConfig } from './Register/config'
import { default as loginConfig } from './Login/config'
// import Home from './Landing'

export default [
    {
        index: true,
        lazy: () => import('./Landing'),
    },
    campgroundsConfig,
    loginConfig,
    registerConfig,
]