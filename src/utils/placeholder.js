export const getPlaceholderImage = (width = 400, height = 300, text = 'No Image') => {
  return `https://placehold.co/${width}x${height}/e0e0e0/666666?text=${encodeURIComponent(text)}`;
};
