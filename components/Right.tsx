import type SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";

import { Dropdown, RecentlyPlayed } from "./index";
import { ITrack } from "../types";

interface Props {
  spotifyApi: SpotifyWebApi;
  chooseTrack: (track: ITrack) => void;
}

const Right = ({ spotifyApi, chooseTrack }: Props) => {
  const { data: session } = useSession();

  const accessToken = session?.accessToken;

  const [recentlyPlayed, setRecentlyPlayed] = useState<ITrack[]>([]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      const tracks = res.body.items.map(({ track }) => {
        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[0].url,
        };
      });
      const filteredTracks = tracks
        .map((track) => JSON.stringify(track))
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .map((track) => JSON.parse(track));
      setRecentlyPlayed(filteredTracks);
    });
  }, [accessToken]);

  return (
    <section className="p-4 space-y-8">
      <div className="flex space-x-2 items-center justify-between">
        <div className="flex items-center space-x-4 border-2 border-[#262626] h-12 rounded-full py-3 px-4">
          <HiOutlineShieldCheck className="text-[#ccc] text-xl" />
          <MdOutlineSettings className="text-[#ccc] text-xl" />
          <BiBell className="text-[#ccc] text-xl" />
        </div>
        <Dropdown />
      </div>
      <div className="bg-[#0d0d0d] border-2 border-[#262626] rounded-xl space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>
        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={track.id + index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="btn">View All</button>
      </div>
    </section>
  );
};

export default Right;
