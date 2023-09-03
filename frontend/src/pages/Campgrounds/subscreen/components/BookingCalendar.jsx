import { Box, Button, Divider, Group, Text, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import dayjs from 'dayjs';
import useCamp from '../../../../hooks/useCamp';

export default function ({ bookingDates, setBookingDates }) {
    const { campground } = useCamp();
    const { title } = campground;
    const [checkIn, checkOut] = bookingDates;
    const [calendarTitle, setCalendarTitle] = useState("Select check-in date");
    const [calendarSubtitle, setCalendarSubtitle] = useState("Add your travel dates for exact pricing");

    const handleDateSelect = (dates) => {
        const [checkin, checkout] = dates;
        const checkinDate = dayjs(checkin);
        const checkoutDate = dayjs(checkout);

        if (checkin !== null && checkout !== null) {
            setCalendarSubtitle(checkinDate.format('MMM DD, YYYY') + " - " + checkoutDate.format('MMM DD, YYYY'));
            const nights = checkoutDate.diff(checkinDate, 'day');
            setCalendarTitle(`${nights} ${nights > 1 ? "nights" : "night"} at ${title}`);
        } else if (checkin !== null && checkout === null) {
            setCalendarTitle("Select check-out date");
            setCalendarSubtitle("Add your travel dates for exact pricing");
        } else {
            setCalendarTitle("Select check-in date");
            setCalendarSubtitle("Add your travel dates for exact pricing");
        }

        setBookingDates(dates);
    }

    return (
        <>
            <Divider my='lg' />
            <Box w="fit-content" mt={15}>
                <Group position='apart'>
                    <div>
                        <Title order={3}>{calendarTitle}</Title>
                        <Text order={5} color="dimmed">{calendarSubtitle}</Text>
                    </div>
                    {(checkIn !== null && checkOut !== null) &&
                        <Button variant='subtle' onClick={() => handleDateSelect([null, null])}>
                            Clear dates
                        </Button>
                    }
                </Group>
                <DatePicker
                    type="range"
                    maxLevel="month"
                    numberOfColumns={2}
                    firstDayOfWeek={0}
                    minDate={dayjs().add(2, 'day').toDate()}
                    value={bookingDates}
                    onChange={handleDateSelect}
                    size="md"
                    my={15}
                />
            </Box>
        </>
    )
}