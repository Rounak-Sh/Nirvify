import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import API_URL from "../config/api.js";

export const PlayerControl = createContext();

const PlayerControlProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [episodeData, setEpisodeData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "00",
    },
    totalTime: {
      second: "00",
      minute: "00",
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await episodeData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    episodeData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(episodeData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const next = async () => {
    episodeData.map(async (item, index) => {
      if (track._id === item._id && index < episodeData.length) {
        await setTrack(episodeData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const seekEpisode = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const resetPlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayStatus(false);
      setTrack(episodeData[0]);
    }
  };

  const getPodcastData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/podcast/list-podcast`);
      setPodcastData(response.data.podcasts || []);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  const getEpisodeData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/episode/list-episode`);
      setEpisodeData(response.data.allEpisodes || []);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const updateSeekBar = () => {
        if (seekBar.current && audioRef.current.duration) {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";

          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60)
                .toString()
                .padStart(2, "0"),
              minute: Math.floor(audioRef.current.currentTime / 60)
                .toString()
                .padStart(2, "0"),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60)
                .toString()
                .padStart(2, "0"),
              minute: Math.floor(audioRef.current.duration / 60)
                .toString()
                .padStart(2, "0"),
            },
          });
        }
      };

      const timer = setTimeout(() => {
        audioRef.current.ontimeupdate = updateSeekBar;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [audioRef.current]);

  useEffect(() => {
    getEpisodeData();
    getPodcastData();

    // Polling to fetch updated data every 5 seconds
    const intervalId = setInterval(() => {
      getEpisodeData();
      getPodcastData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!track && episodeData.length > 0) {
      setTrack(episodeData[0]);
    }
  }, [episodeData, track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    prevTrack: previous,
    nextTrack: next,
    seekEpisode,
    episodeData,
    podcastData,
    resetPlayer,
  };

  return (
    <PlayerControl.Provider value={contextValue}>
      {props.children}
    </PlayerControl.Provider>
  );
};

export default PlayerControlProvider;
