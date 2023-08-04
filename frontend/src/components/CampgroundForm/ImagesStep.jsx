import { ActionIcon, Box, Group, Image, SimpleGrid, Text, Tooltip, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";

export default function ({ imageFiles, setImageFiles, deleteImages, setDeleteImages }) {

    const deleteImage = (index) => {
        const newImageFiles = [...imageFiles];
        const imageToDelete = imageFiles[index]
        if (!(imageToDelete instanceof File)) {
            setDeleteImages([...deleteImages, imageToDelete]);
        }
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
    };

    const previews = imageFiles.map((file, index) => {
        const imageUrl = (file instanceof File) ? URL.createObjectURL(file) : file.url;
        return (
            <Box pos="relative" key={index}>
                <Image
                    src={imageUrl}
                    imageProps={{ onLoad: () => (file instanceof File) && URL.revokeObjectURL(imageUrl) }}
                />
                <Tooltip label="Remove image" position="left">
                    <ActionIcon
                        color="red"
                        radius="xl"
                        pos="absolute"
                        top="3%"
                        right="2%"
                        onClick={() => deleteImage(index)}
                    >
                        <IconTrash size="1.125rem" />
                    </ActionIcon>
                </Tooltip>
            </Box>
        );
    });

    return (
        <>
            <Text c={"dimmed"}>
                Upload pictures to show guests your campground
            </Text>
            <Dropzone
                onDrop={(files) => setImageFiles([...imageFiles, ...files])}
                onReject={(files) => {
                    notifications.show({
                        title: 'Error uploading images',
                        message: 'File exceeds 5mb size',
                        withBorder: true,
                        color: 'red',
                        icon: <IconX />,
                    });
                }}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                my={"lg"}
            >
                <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size="3.2rem" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size="3.2rem" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>
                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
        </>
    )
}