import React from "react";

interface Props {
    avatarUrl: string,
    username: string
}

export const AvatarComponent: React.FC<Props> = (props) => {
    return(
        <div className={"flex relative flex-col items-center"}>
            <img className={"rounded-full h-16 w-16"} src={props.avatarUrl} alt={"AVATAR"}/>
            <h1 className={"absolute text-white -bottom-2 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"}>{props.username}</h1>
        </div>
    )
}