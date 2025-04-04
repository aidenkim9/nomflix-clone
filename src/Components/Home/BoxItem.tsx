import { Box, Info } from "../Common/Styled";
import { boxVariants, infoVariants } from "../../motionVariants";
import { getBgPath } from "../../utils";
import { memo } from "react";

interface IBoxProps {
  layoutId: string;
  movieId: number;
  title: string;
  backdrop: string;
  poster: string;
  onBoxClicked: (id: number) => void;
}

function BoxItem({
  layoutId,
  movieId,
  title,
  backdrop,
  poster,
  onBoxClicked,
}: IBoxProps) {
  console.log("BoxItem: ", title);
  return (
    <>
      <Box
        layoutId={`${layoutId}/` + movieId + ""}
        onClick={() => onBoxClicked(movieId)}
        variants={boxVariants}
        whileHover="hover"
        initial="normal"
        transition={{ type: "linear" }}
        bgphoto={getBgPath(backdrop || poster)}
      >
        <Info variants={infoVariants}>
          <h4>{title}</h4>
        </Info>
      </Box>
    </>
  );
}

export default memo(BoxItem);

/* BoxItem 분리한거 복습하기, memo 최적화 이해하기 */
