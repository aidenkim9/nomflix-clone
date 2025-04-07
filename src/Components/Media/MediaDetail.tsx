import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { IMediaDetail, IMediaItems } from "../../Api/types";
import { getMediaDetail } from "../../Api/api";
import { getBgPath } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import {
  Overlay,
  BigMovie,
  BigPoster,
  BigHeader,
  BigTitle,
  BigGenres,
  BigInfo,
  BigOverview,
  BigTagline,
  BigX,
} from "../Common/MediaDetailStyled";

interface IMediaDetailProps {
  mediaType: string;
  layoutIdPrefix: string;
  mediaId: string;
}

function MediaDetail({
  mediaType,
  layoutIdPrefix,
  mediaId,
}: IMediaDetailProps) {
  const navigate = useNavigate();
  const {
    data: mediaDetailData,
    isError,
    error,
    isLoading: mediaDetailLoading,
  } = useQuery<IMediaDetail>({
    queryKey: [mediaType, layoutIdPrefix, mediaId],
    queryFn: () => getMediaDetail(mediaType, mediaId),
  });

  const goBackPage = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   if (clickedMovie) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [clickedMovie]);
  if (isError) return <>{error.message}</>;
  return (
    <>
      <AnimatePresence>
        <>
          <Overlay
            onClick={goBackPage}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            bgphoto={getBgPath(
              mediaDetailData ? mediaDetailData.backdrop_path + "" : ""
            )}
            layoutId={`${layoutIdPrefix}/${mediaId}`}
          >
            <BigX onClick={goBackPage}>X</BigX>
            {mediaDetailData && (
              <>
                <BigTitle>
                  {mediaDetailData.title || mediaDetailData.name}
                </BigTitle>
                <BigPoster bgphoto={getBgPath(mediaDetailData.poster_path)} />
                <BigInfo>
                  <BigHeader>
                    <span>
                      📅{" "}
                      {mediaDetailData.release_date
                        ? mediaDetailData.release_date.slice(0, 4)
                        : mediaDetailData.first_air_date
                        ? mediaDetailData.first_air_date.slice(0, 4)
                        : ""}
                    </span>
                    <span>
                      {mediaDetailData.runtime
                        ? `${mediaDetailData.runtime}m`
                        : mediaDetailData.number_of_seasons
                        ? `${mediaDetailData.number_of_seasons} seasons`
                        : ""}
                    </span>
                    <BigGenres>
                      <span>🎭</span>
                      {mediaDetailData.genres
                        .slice(0, 2)
                        .map((genre, index) => (
                          <li key={index}>{genre.name}</li>
                        ))}
                    </BigGenres>
                    <span>⭐️ {mediaDetailData.vote_average}</span>
                  </BigHeader>
                  <BigOverview>
                    <BigTagline>
                      {mediaDetailData.tagline
                        ? "【 " + mediaDetailData.tagline + " 】"
                        : null}
                    </BigTagline>
                    {mediaDetailData.overview}
                  </BigOverview>
                </BigInfo>
              </>
            )}
          </BigMovie>
        </>
      </AnimatePresence>
    </>
  );
}

export default MediaDetail;

/*typescript
layoutId animation 렌더링 순서 문제 clickedMovie에서???
언제 state를 rendering 다시 하는게 좋은지?
rendering이 많을수록 최적화가 안되니 효율적인 방법은?
*/
