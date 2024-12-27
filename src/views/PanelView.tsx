import React, {useState} from "react";
import {Tooltip} from "react-tooltip";
import {ReactComponent as DiscordIcon} from "../assets/discord.svg";
import {ReactComponent as GithubIcon} from "../assets/github.svg";
import {ReactComponent as TwitchIcon} from "../assets/twitch.svg";
import {ReactComponent as XIcon} from "../assets/x.svg";
import {SocialComponent} from "../components/panel/SocialComponent";

export const PanelView: React.FC = () => {

    const [username, setUsername] = useState<string>("roxer");
    const [url, setUrl] = useState<string>("");

    const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);

    const handleURLGenerate = () => {
        setUrl("https://overlay.rx-it.pl?username=" + username + "&game=cs2");
    }

    const handleURLCopy = async () => {
        if(!url){
            return;
        }

        await navigator.clipboard.writeText(url);
        setTooltipOpened(true)
        setTimeout(() => setTooltipOpened(false), 3000);
    }

    return(
        <div className={"flex flex-col gap-y-5 items-center bg-[#121212] h-screen"}>
            <h1 className={"text-white font-extrabold text-[28pt]"}>Faceit CS2 Stream Overlay</h1>
            <div className={"flex flex-col items-center outline-none"}>
                <p className={"text-white font-bold"}>Username:</p>
                <input
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 text-white focus:outline-none focus:border-amber-500 transition-colors duration-200"
                    type={"text"}
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </div>
            <button
                className={"bg-amber-500 rounded-md p-2 text-white font-bold hover:bg-amber-600 hover:scale-105 duration-300"}
                onClick={handleURLGenerate}
            >
                Generate URL
            </button>

            <div className={"flex flex-col items-center w-full"}>
                <p className={"text-white font-bold"}>URL:</p>
                <input
                    data-tooltip-id={"copy-tooltip"}
                    data-tooltip-content={"Copied!"}
                    className={"border text-sm rounded-lg block p-2.5 bg-gray-800 border-gray-700 text-white w-1/2 outline-none hover:cursor-pointer"}
                    onClickCapture={handleURLCopy}
                    type={"text"}
                    readOnly={true}
                    value={url}
                />

                <Tooltip
                    id={"copy-tooltip"}
                    isOpen={tooltipOpened}
                />
            </div>

            <div className={"flex flex-col items-center"}>
                <h1 className={"text-white font-extrabold text-[24pt]"}>Socials</h1>

                <div className={"flex flex-col gap-y-4 items-center"}>
                    <div className={"flex flex-row gap-x-4 items-center"}>
                        <SocialComponent icon={GithubIcon} url={"https://github.com/Roxerek/FaceitCS2Overlay"}/>
                        <SocialComponent icon={TwitchIcon} url={"https://www.twitch.tv/roxerekk"}/>
                        <SocialComponent icon={XIcon} url={"https://x.com/roxerek"}/>
                    </div>
                    <SocialComponent icon={DiscordIcon} name={"roxerek"}/>
                </div>
            </div>
        </div>
    )
}