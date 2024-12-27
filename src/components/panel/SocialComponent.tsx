import React from "react";

interface Props {
    icon: React.FunctionComponent<any>,
    name?: string,
    url?: string
}

export const SocialComponent: React.FC<Props> = (props) => {
    return(
        <div className={"text-white font-bold flex flex-row gap-x-2 items-center"}>
            {
                props.url ?
                    <a href={props.url} target={"_blank"}>
                        <props.icon/>
                    </a>
                :
                    <props.icon/>
            }
            {props.name && <p>{props.name}</p>}
        </div>
    )
}