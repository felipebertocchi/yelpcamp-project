import { Box, Button, Divider, Group, Text, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function ({ campgroundName }) {
    const [dates, setDates] = useState([null, null]);
    const [calendarTitle, setCalendarTitle] = useState("Select check-in date");
    const [calendarSubtitle, setCalendarSubtitle] = useState("Add your travel dates for exact pricing");

    const handleDateSelect = (dates) => {
        const [checkin, checkout] = dates;
        const checkinDate = dayjs(checkin);
        const checkoutDate = dayjs(checkout);

        if (checkin !== null && checkout !== null) {
            setCalendarSubtitle(checkinDate.format('MMM DD, YYYY') + " - " + checkoutDate.format('MMM DD, YYYY'));
            const nights = checkoutDate.diff(checkinDate, 'day');
            setCalendarTitle(`${nights} ${nights > 1 ? "nights" : "night"} at ${campgroundName}`);
        } else if (checkin !== null && checkout === null) {
            setCalendarTitle("Select check-out date");
            setCalendarSubtitle("Add your travel dates for exact pricing");
        } else {
            setCalendarTitle("Select check-in date");
            setCalendarSubtitle("Add your travel dates for exact pricing");
        }

        setDates(dates);
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
                    {(dates[0] !== null && dates[1] !== null) &&
                        <Button disabled={dates[0] === null} variant='subtle' onClick={() => handleDateSelect([null, null])}>
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
                    value={dates}
                    onChange={handleDateSelect}
                    size="md"
                    my={15}
                />
            </Box>
        </>
    )
}