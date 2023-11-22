export const createImageToUpload = (image: string) => {
  const filename = image.split('/').pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;

  return {
    uri: image,
    name: `image.${ext}`,
    type,
  };
};
