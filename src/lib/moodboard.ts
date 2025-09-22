// export type MoodboardData = {
//   palette: string[];       // e.g. ["#000120", "#e60de6", "#08fdd8", ...]
//   caption: string;         // short headliner
//   keywords: string[];      // tags / vibe words
//   imageUrl?: string;       // optional hero image
// };

export type ColorData = {
  name: string;
  hex: string;
};

export type MoodboardData = {
  palette: ColorData[];
  imageUrl?: string;
};
