import React from "react";
import {RANK_COLORS} from "../../modules/utils/RankUtil";

interface Props {
    level: number,
    elo: number
}

export const RankComponent: React.FC<Props> = (props) => {
    return(
        <div className={"flex flex-row gap-x-1 items-center"}>
            <p style={{color: RANK_COLORS[props.level]}} className={"text-[42pt] font-extrabold leading-none"}>{props.level}</p>
            <div className={"flex flex-col"}>
                <p className={"text-white text-[7pt] font-bold leading-none"}>ELO</p>
                <p className={"text-white text-[16pt] font-extrabold leading-4"}>{props.elo}</p>
            </div>
        </div>
    )
}