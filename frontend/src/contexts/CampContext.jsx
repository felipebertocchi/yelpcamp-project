import { createContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const CampContext = createContext();

export const CampProvider = ({ children }) => {
    const [campground, setCampground] = useState(null);
    const [checkoutDetails, setCheckoutDetails] = useState({});
    const [bookingDates, setBookingDates] = useState([null, null]);

    useEffect(() => {
        const [checkIn, checkOut] = bookingDates;
        if (campground && campground.price) {
            const checkInDate = checkIn && dayjs(checkIn);
            const checkOutDate = checkOut && dayjs(checkOut);
            const nights = checkOutDate?.diff(checkInDate, 'day');
        
            const serviceFee = 25
            const priceOfStay = (campground.price * nights).toFixed(0)
            let weeklyStayDiscount = 0
            if (nights >= 7) weeklyStayDiscount = (priceOfStay * 0.04).toFixed(0)
            const totalBeforeTaxes = priceOfStay - weeklyStayDiscount + serviceFee
        
            setCheckoutDetails({
                checkInDate,
                checkOutDate,
                nights,
                priceOfStay,
                weeklyStayDiscount,
                serviceFee,
                totalBeforeTaxes,
            })
        }
    }, [bookingDates, campground]);

    return (
        <CampContext.Provider value={{ campground, setCampground, checkoutDetails, bookingDates, setBookingDates }}>
            {children}
        </CampContext.Provider>
    );
};
