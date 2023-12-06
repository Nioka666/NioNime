import axios from "axios";
import { greenBold } from "../utils/fxFactories.js"
import { writeFileSync } from "fs";

// const url = `https://api.anify.tv/recent?type=anime&page=1&perPage=1`;
const url2 = `https://api.anify.tv/seasonal/anime?fields=[id, title, coverImage,genres,rating]`;
const data = async () => {
    try {
        const { data } = await axios.get(url2);
        const dataBuffer = JSON.stringify(data);
        writeFileSync("result.json", dataBuffer, "utf-8");

        console.log(greenBold("success writed"));
    } catch (err) {
        throw new Error(err.message);
    }
};

data();