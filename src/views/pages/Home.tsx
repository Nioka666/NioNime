/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimeSlider } from "@components/AnimeSlider";
import { BigAnimeCard } from "@components/BigAnimeCard";
import { Carousels } from "@components/Carousels";
import { TopSlider } from "@components/TopSlider";
import { PremiumHero } from "@views/components/PremiumHero";

export const Home = () => {
  return (
    <>
      <Carousels />
      {/* <AnimeSlider /> */}
      <TopSlider />
      <AnimeSlider />
      <BigAnimeCard />
      <AnimeSlider />
      <PremiumHero />
    </>
  );
};
