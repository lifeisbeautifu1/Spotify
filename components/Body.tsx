import { useState, useEffect } from "react";
import type SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";

import { Search, Poster, Track } from "./index";
import { useDebounce } from "../hooks/useDebounce";
import { ITrack } from "../types";

interface Props {
  spotifyApi: SpotifyWebApi;
  chooseTrack: (track: ITrack) => void;
}

const Body = ({ spotifyApi, chooseTrack }: Props) => {
  const { data: session } = useSession();

  const accessToken = session?.accessToken;

  const [search, setSearch] = useState("");

  const { debounceValue } = useDebounce(search);

  const [searchResults, setSearchResults] = useState<ITrack[]>([]);

  const [newReleases, setNewReleases] = useState<ITrack[]>([]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search.trim()) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.searchTracks(debounceValue).then((res) => {
      if (res.body.tracks) {
        setSearchResults(
          res.body.tracks.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          }))
        );
      }
    });
  }, [accessToken, debounceValue]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getNewReleases().then((res) => {
      if (res.body.albums) {
        setSearchResults(
          res.body.albums.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          }))
        );
      }
    });
  }, [accessToken]);

  return (
    <section className="bg-black ml-[90px] py-4 space-y-8 flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 p-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>
      <div className="flex gap-x-8 absolute md:relative ml-6">
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <button className="genre">Classic</button>
            <button className="genre">House</button>
            <button className="genre">Minimal</button>
            <button className="genre">Hip-hop</button>
            <button className="genre">Electronic</button>
            <button className="genre">Chillout</button>
            <button className="genre">Blues</button>
            <button className="genre">Country</button>
            <button className="genre">Techno</button>
          </div>
          <button className="btn">All Genres</button>
        </div>
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-full ">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
