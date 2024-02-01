/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimeSlider } from "@components/AnimeSlider";
import { BigAnimeCard } from "@components/BigAnimeCard";
import { Carousels } from "@components/Carousels";
// import { TopSlider } from "@components/TopSlider";
import { PremiumHero } from "@views/components/PremiumHero";
import { TopSlider } from "@views/components/TopSlider";
import { TrendingAnime } from "@views/components/TrendingAnime";
// import { TrendingAnime } from "@views/components/TrendingAnime";

export const Home = () => {
  return (
    <>
      <Carousels />
      <TopSlider />
      <TrendingAnime />
      {/* <AnimeSlider page={2} /> */}
      {/* <AnimeSlider page={2}/> */}
      <BigAnimeCard />
      <AnimeSlider/>
      <PremiumHero />
    </>
  );
};
