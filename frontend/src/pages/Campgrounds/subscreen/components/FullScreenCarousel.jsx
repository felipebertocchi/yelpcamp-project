import { Carousel } from '@mantine/carousel';
import { CloseButton, Group, Image, Modal, Overlay, rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function ({ images, open, handleOpen, initialSlide }) {
    return (
        <Modal
            opened={open}
            onClose={() => handleOpen.close()}
            fullScreen
            withCloseButton={false}
        >
            <Overlay opacity={1} display={'flex'} px={50} py={30}>
                <Group style={{ position: 'absolute', zIndex: 2, right: rem(150), top: rem(50) }}>
                    <CloseButton title="Close" size="xl" radius="md" iconSize={20} onClick={() => handleOpen.close()} aria-label="Close" />
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
        </Modal>
    )
}