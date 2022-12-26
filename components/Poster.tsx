import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";

import { playingTrackState, playState } from "../atoms/playerAtom";
import { ITrack } from "../types";

interface Props {
  track: ITrack;
  chooseTrack: (track: ITrack) => void;
}

const Poster = ({ track, chooseTrack }: Props) => {
  const [play, setPlay] = useRecoilState(playState);

  const [playingTrack, setPlayingState] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };
  return (
    <div
      onClick={handlePlay}
      className="w-[230px] h-[330px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
    >
      <img
        src={track.albumUrl}
        alt={track.title}
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />
      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {playingTrack?.uri === track.uri && play ? (
            <BsFillPauseFill className="text-xl" />
          ) : (
            <BsFillPlayFill className="text-xl ml-1" />
          )}
        </div>
        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default Poster;
