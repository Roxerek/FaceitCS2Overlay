import {UserProfileDto} from "../data/UserProfileDto";

const API_URL = "https://open.faceit.com/data/v4"
const API_KEY = "4e828b0e-1ec8-484d-b2b9-f40758f9488b";

export const requestUserData = async (nickname: string, game: string): Promise<UserProfileDto> => {
    const response = await fetch(API_URL + "/players?" + new URLSearchParams([["nickname", nickname], ["game", game]]), {
        headers: {
            Authorization: "Bearer " + API_KEY
        }
    })

    return response.json();
}

export const requestUserMatches = async (playerId: string, game: string, from: string) => {
    const response = await fetch(API_URL + "/players/" + playerId + "/games/" + game + "/stats?" + new URLSearchParams([["from", from]]), {
        headers: {
            Authorization: "Bearer " + API_KEY
        }
    });

    return response.json();
}