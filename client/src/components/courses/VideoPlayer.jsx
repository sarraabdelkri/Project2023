import React, { useState, useEffect } from "react";

const VideoPlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load the YouTube player API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create the video player element when the YouTube player API is ready
    window.onYouTubePlayerAPIReady = () => {
      setPlayer(
        new window.YT.Player("player", {
          videoId: videoId,
        })
      );
    };
  }, [videoId]);

  return <div id="player"></div>;
};

export default VideoPlayer;
