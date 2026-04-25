"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YouTubeEmbedProps {
  id: string;
  title: string;
  start?: number;
}

export function YouTubeEmbed({ id, title, start }: YouTubeEmbedProps) {
  const params = start ? `start=${start}` : undefined;
  return (
    <div className="my-6 overflow-hidden rounded-lg">
      <LiteYouTubeEmbed id={id} title={title} params={params} />
    </div>
  );
}
