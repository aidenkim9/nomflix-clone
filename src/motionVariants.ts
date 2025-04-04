export const rowVariants = {
  initial: (back: boolean) => ({
    x: back ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 10 : -window.innerWidth - 10,
  }),
};
export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -20,
    transition: { delay: 0.4, duration: 0.3 },
  },
};
export const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.3 },
  },
};
