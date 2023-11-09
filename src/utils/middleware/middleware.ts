/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response } from "express";
import NodeCache from "node-cache";
import { fetchAllAnimeData, fetchRecentAnime } from "../anime";

const cache = new NodeCache({ stdTTL: 6666 });

export const cacheMiddleware = (duration: number) => {
  return async (req: Request, res: Response, next: any) => {
    const key = req.originalUrl || req.url;
    const cachedData = cache.get(key);

    if (cachedData) {
      res.locals.cachedData = cachedData; // save to local
      next();
    } else {
      try {
        const animeData = await fetchAllAnimeData(1);
        const recentAnime = await fetchRecentAnime(1);

        res.locals.cachedData = { animeData, recentAnime }; // Menyimpan data di locals untuk digunakan di dalam rute
        cache.set(key, { animeData, recentAnime }, duration);

        next();
      } catch (error) {
        console.error(error);
        res.status(500).render("error", { title: "500 Error" });
      }
    }
  };
};
