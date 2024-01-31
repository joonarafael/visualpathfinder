"use client";

// site footer

import { DiMitlicence } from "react-icons/di";
import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
	return (
		<div
			className="
                flex
                flex-col
                gap-2
                items-center
                justify-center
                max-w-[2520px]
                md:px-10
                mx-auto
                p-4
                pb-12
                sm:px-2
                text-center
                xl:px-20
            "
		>
			<div className="font-bold flex flex-row items-center gap-2">
				<p>VISUAL PATHFINDER</p>
				<div
					onClick={() =>
						window.open(
							"https://github.com/joonarafael/visualpathfinder/tree/main",
							"_blank"
						)
					}
					className="flex flex-row gap-2 items-center cursor-pointer hover:underline"
				>
					<p className="font-light">in GitHub</p> <FaExternalLinkAlt />
				</div>
			</div>
			<div className="font-light">by Joona Kettunen</div>
			<div className="flex flex-row text-neutral-500 items-center align-center gap-2">
				<DiMitlicence size={16} />
				<span>MIT Licence</span>
			</div>
		</div>
	);
};

export default Footer;
