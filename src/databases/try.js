import axios from "axios";
import { greenBold } from "../utils/fxFactories.js"
import { writeFileSync } from "fs";

const url2 = `https://api.anify.tv/sources?providerId=gogoanime&watchId=%2F{watchId}&episodeNumber={epNumber}&id={animeId}&subType=sub&server=gogocdn`;

const data = async (watchId, epNumber, animeId) => {
    try {
        const { data } = await axios.get(url2
            .replace("{watchId}", watchId)
            .replace("{epNumber}", epNumber)
            .replace("{animeId}", animeId));
        const dataBuffer = JSON.stringify(data);
        writeFileSync("res.json", dataBuffer, "utf-8");

        console.log(greenBold("success writed"));
    } catch (err) {
        throw new Error(err.message);
    }
};

data("ponyo-on-the-cliff-by-the-sea-episode-1", 1, 2890);