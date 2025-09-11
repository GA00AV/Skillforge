import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        sources: [
          {
            src,
          },
        ],
        playbackRates: [0.5, 1, 1.5, 2],
      });
    }
  }, [src]);
  return (
    <div style={{ width: "100%" }} data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
}
