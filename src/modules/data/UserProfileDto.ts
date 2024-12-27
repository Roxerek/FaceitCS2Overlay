import {UserGameProfileDto} from "./UserGameProfileDto";

export interface UserProfileDto {
    player_id: string,
    avatar: string,
    games: {[game: string]: UserGameProfileDto}
}