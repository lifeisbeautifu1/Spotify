import { ImHeadphones } from "react-icons/im";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import { ITrack } from "../types";
import { playingTrackState, playState } from "../atoms/playerAtom";

interface Props {
  track: ITrack;
  chooseTrack: (track: ITrack) => void;
}

const Track = ({ track, chooseTrack }: Props) => {
  const [hasLiked, setHasLiked] = useState(false);

  const [play, setPlay] = useRecoilState(playState);

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };
  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center w-full">
        <img
          src={track.albumUrl}
          alt={track.title}
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div className="grow">
          <h4 className="text-white text-sm font-semibold truncate">
            {track.title}
          </h4>
          <p className="text-[#b3b3b3] text-[13px] font-semibold group-hover:text-white">
            {track.artist}
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="text-white flex space-x-1 text-sm font-semibold">
            <ImHeadphones className="text-lg" />
            {track?.popularity && <h4>{track?.popularity}</h4>}
          </div>
          <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
            <AiFillHeart
              onClick={() => setHasLiked(!hasLiked)}
              className={`text-xl ml-3 icon ${
                hasLiked ? "text-[#1ed760]" : "text-[#868686]"
              }`}
            />
            {track.uri === playingTrack?.uri && play ? (
              <div
                onClick={handlePlay}
                className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
              >
                <BsFillPauseFill className="text-white" />
              </div>
            ) : (
              <div
                onClick={handlePlay}
                className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
              >
                <BsFillPlayFill className="text-white text-xl ml-[1px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
