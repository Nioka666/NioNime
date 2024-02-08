/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimeSlider } from "@components/AnimeSlider";
import { BigAnimeCard } from "@components/BigAnimeCard";
import { Carousels } from "@components/Carousels";
import { PremiumHero } from "@views/components/PremiumHero";
import { TopSlider } from "@views/components/TopSlider";
import { TrendingAnime } from "@views/components/TrendingAnime";

export const Home = () => {
  return (
    <>
      <Carousels />
      <TopSlider />
      <TrendingAnime />
      <BigAnimeCard />
      <AnimeSlider />
      <PremiumHero />
    </>
  );
};
