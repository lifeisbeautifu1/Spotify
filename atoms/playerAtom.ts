import { atom } from "recoil";
import { ITrack } from "../types";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingTrackState = atom<ITrack | null>({
  key: "playingTrackState",
  default: null,
});
