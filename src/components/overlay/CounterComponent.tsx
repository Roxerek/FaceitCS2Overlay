import React from "react";

interface Props {
    label: string,
    count: number,
    color: string
}

export const CounterComponent: React.FC<Props> = (props) => {
    return(
        <div className={"flex flex-col items-start"}>
            <p className={"font-bold text-[11pt] text-white leading-none"}>{props.label}</p>
            <p style={{color: props.color}} className={"font-extrabold leading-10 text-[38pt]"}>{props.count}</p>
        </div>
    )
}