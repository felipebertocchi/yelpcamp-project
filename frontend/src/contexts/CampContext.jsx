import { createContext, useState } from 'react';

export const CampContext = createContext();

export const CampProvider = ({ children }) => {
    const [campground, setCampground] = useState(null);

    return (
        <CampContext.Provider value={{ campground, setCampground }}>
            {children}
        </CampContext.Provider>
    );
};
