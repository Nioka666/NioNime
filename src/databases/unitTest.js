import axios from "axios";
import { greenBold } from "../utils/fxFactories.js"
import { writeFileSync } from "fs";

// const zoroUrl =
//   "/api/sources?providerId=zoro&watchId={watchId}&episodeNumber={episodeNumber}&id={animeId}&subType=sub";
const gogoUrl = `https://api.anify.tv/sources?providerId=gogoanime&watchId=%2F{watchId}&episodeNumber={epNumber}&id={animeId}&subType=sub&server=gogocdn`;

const data = async (watchId, epNumber, animeId) => {
    try {
        const { data } = await axios.get(gogoUrl
            .replace("{watchId}", watchId)
            .replace("{epNumber}", epNumber)
            .replace("{animeId}", animeId));
        const dataBuffer = JSON.stringify(data);
        writeFileSync("./res/response.json", dataBuffer, "utf-8");

        console.log(greenBold("success writed"));
    } catch (err) {
        throw new Error(err.message);
    }
};

data("/fategrand-order-zettai-majuu-sensen-babylonia-episode-1", 1, 103275);

// https://api.anify.tv/sources?providerId=gogoanime&watchId=%2Ffategrand-order-zettai-majuu-sensen-babylonia-episode-1&episodeNumber=1&id=103275&subType=sub&server=gogocdn