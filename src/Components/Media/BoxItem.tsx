import { Box, Info } from "../Common/SliderStyled";
import { boxVariants, infoVariants } from "../../motionVariants";
import { getBgPath } from "../../utils";
import { memo } from "react";

interface IBoxProps {
  layoutIdPrefix: string;
  mediaId: number;
  title: string;
  backdrop: string;
  poster: string;
  onBoxClicked: (id: number) => void;
}

function BoxItem({
  layoutIdPrefix,
  mediaId,
  title,
  backdrop,
  poster,
  onBoxClicked,
}: IBoxProps) {
  return (
    <>
      <Box
        layoutId={`${layoutIdPrefix}/` + mediaId + ""}
        onClick={() => onBoxClicked(mediaId)}
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
