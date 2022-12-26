import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Sidebar, Body, Right, Player } from "./index";
import { ITrack } from "../types";
import { playingTrackState } from "../atoms/playerAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID as string,
});

const Dashboard = () => {
  const { data: session } = useSession();

  const accessToken = session?.accessToken;

  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track: ITrack) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-blak lg:pb-24">
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      {showPlayer && (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
