import React from "react";

type Props = {
  key: string;
  url: string;
  borderRadius?: string;
  width?: number | string;
  height?: number | string;
  alternateTheme?: string;
};

const Spotify: React.FC<Props> = ({
  url,
  borderRadius,
  width,
  height,
  alternateTheme,
}) => {
  const match = url.match(/(album|track|episode|playlist|artist)\/(\w+)/);
  const id = match?.[1] + "/" + match?.[2];
  const themeQueryParam = alternateTheme ? "?theme=0" : "";
  return (
    <iframe
      style={{ borderRadius: borderRadius ? borderRadius : "12px" }}
      src={`https://open.spotify.com/embed/${id}${themeQueryParam}`}
      width={
        width === "wide"
          ? "100%"
          : width === "compact"
          ? "40%"
          : !width
          ? "100%"
          : width
      }
      height={height === "compact" ? "152" : !height ? "352" : height}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default Spotify;
