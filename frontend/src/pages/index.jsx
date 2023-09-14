import { default as campgroundsConfig } from './Campgrounds/config'
import { default as registerConfig } from './Register/config'
import { default as loginConfig } from './Login/config'
import { default as aboutConfig } from './About/config'
import { default as checkoutConfig } from './Checkout/config'

export default [
    {
        index: true,
        lazy: () => import('./Landing'),
    },
    campgroundsConfig,
    loginConfig,
    registerConfig,
    aboutConfig,
    checkoutConfig,
]