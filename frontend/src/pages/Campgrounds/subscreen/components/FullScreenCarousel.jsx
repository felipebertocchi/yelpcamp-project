import { Carousel } from '@mantine/carousel';
import { CloseButton, Group, Image, Overlay } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function ({ images, open, setOpen, initialSlide }) {
    return (
        <>
            {open &&
                <Overlay opacity={1} display={'flex'} px={50} py={30}>
                    <Group style={{ position: 'absolute', zIndex: 2 }}>
                        <CloseButton title="Close" size="xl" radius="md" iconSize={20} onClick={() => setOpen(false)} aria-label="Close" />
                    </Group>
                    <Carousel
                        initialSlide={initialSlide}
                        draggable={false}
                        withIndicators
                        loop
                        controlSize={40}
                        nextControlIcon={<IconChevronRight size={20} />}
                        previousControlIcon={<IconChevronLeft size={20} />}
                    >
                        {images?.map(({ url }, index) =>
                            <Carousel.Slide key={index} p={80}>
                                <Image src={url} fit={'contain'} height={'80vh'} withPlaceholder />
                            </Carousel.Slide>
                        )}
                    </Carousel>
                </Overlay>
            }
        </>
    )
}