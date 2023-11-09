/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimeSlider } from "../components/AnimeSlider";
import { BigAnimeCard } from "../components/BigAnimeCard";
import { Carousels } from "../components/Carousels";
import { Pricing } from "../components/Pricing";
import { TopSlider } from "../components/TopSlider";

export const Home = () => {
  return (
    <>
      <Carousels />
      <TopSlider />
      <AnimeSlider />
      <BigAnimeCard />
      <Pricing />
    </>
  );
};
