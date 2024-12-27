import React, {useCallback, useEffect, useState} from "react";
import {CounterComponent} from "../components/overlay/CounterComponent";
import {AvatarComponent} from "../components/overlay/AvatarComponent";
import {RankComponent} from "../components/overlay/RankComponent";
import {UserProfileDto} from "../modules/data/UserProfileDto";
import {requestUserData, requestUserMatches} from "../modules/request/Request";
import {MatchStatisticsDto} from "../modules/data/MatchStatisticsDto";

interface Props {
    username: string,
    game: string
}

export const OverlayView: React.FC<Props> = (props) => {

    const [userProfile, setUserProfile] = useState<UserProfileDto>();

    const [lostMatches, setLostMatches] = useState<number>(0);
    const [wonMatches, setWonMatches] = useState<number>(0);

    const fetchUserMatches = useCallback(async (playerId: string) => {
        const timestamp = Math.floor(Date.now() - 86400000);
        const matches: any[] = (await requestUserMatches(playerId, "cs2", timestamp.toString())).items;

        let won = 0;
        let lost = 0;

        for (let match of matches) {
            const matchStatistics: MatchStatisticsDto = match.stats;
            if(matchStatistics["Match Finished At"] < timestamp){
                continue;
            }

            if(matchStatistics.Result === '0'){
                won++;
            }else {
                lost++;
            }
        }

        setWonMatches(won);
        setLostMatches(lost);
    }, []);

    const fetchUserData = useCallback(async () => {
        const data: UserProfileDto = await requestUserData(props.username, props.game);
        setUserProfile(data);

        await fetchUserMatches(data.player_id);
    }, [fetchUserMatches]);

    useEffect(() => {
        fetchUserData();

        const intervalId = setInterval(() => {
            if(!userProfile){
                return;
            }

            fetchUserMatches(userProfile.player_id);
        }, 60000);

        return () => clearInterval(intervalId);
    }, [fetchUserData, fetchUserMatches]);

    return (
        <div className={"flex flex-row items-center bg-[#000000]/[.8] backdrop-blur-md rounded-full py-2 px-8 gap-x-10 w-fit"}>
            {
                userProfile && userProfile.games && userProfile.games.cs2 ?
                    <>
                        <div className={"flex flex-row gap-x-7"}>
                            <CounterComponent
                                label={"WIN"}
                                color={"#05A601"}
                                count={wonMatches}
                            />

                            <CounterComponent
                                label={"LOSE"}
                                color={"#C90000"}
                                count={lostMatches}
                            />
                        </div>

                        <AvatarComponent
                            avatarUrl={userProfile.avatar}
                            username={userProfile.games.cs2.game_player_name}
                        />

                        <RankComponent
                            elo={userProfile.games.cs2.faceit_elo}
                            level={userProfile.games.cs2.skill_level}
                        />
                    </>
                :
                    <h1 className={"text-white"}>Loading...</h1>
            }
        </div>
    )
}