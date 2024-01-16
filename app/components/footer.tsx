"use client";

// site footer

import { DiMitlicence } from "react-icons/di";

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
			<div className="font-bold">VISUAL PATHFINDER</div>
			<div className="font-light">by Joona Kettunen</div>
			<div className="flex flex-row text-neutral-500 items-center align-center gap-2">
				<DiMitlicence size={16} />
				<span>MIT Licence</span>
			</div>
		</div>
	);
};

export default Footer;
