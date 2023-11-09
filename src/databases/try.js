import axios from "axios";
import { writeFileSync } from "fs";
const animeSearch =
    "https://api.consumet.org/anime/gogoanime/{query}?page={number}";

export const fetchSearchAnime = async (query, page) => {
    try {
        const url = animeSearch
            .replace("{query}", query)
            .replace("{number}", String(page));
        const res = await axios.get(
            url
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const getAnimeByID = async (page) => {
    try {
        const res = await fetchSearchAnime("mushoku", page);
        const jsonFile = JSON.stringify(res);
        return writeFileSync("res.json", jsonFile, "utf-8");
    } catch (error) {
        console.log(error);
    }
}

getAnimeByID(1);