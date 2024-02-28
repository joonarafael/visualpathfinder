"use client";

import { Button } from "@/app/components/ui/button";
import { MouseEventHandler } from "react";

interface NoteProps {
	title: string;
	description: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	btnText: string;
	warning?: boolean;
}

const Note: React.FC<NoteProps> = ({
	title,
	description,
	onClick,
	btnText,
	warning,
}) => {
	let warningCSS = "border-emerald-500 text-green-500";

	if (warning) {
		warningCSS = "border-yellow-500 text-rose-500";
	}

	return (
		<div
			className={`text-lg rounded border p-2 font-semibold flex flex-col ${warningCSS} content-center`}
		>
			{title}
			<hr className="mt-1 py-1" />
			<div className="flex flex-col gap-1 font-light">
				<p className="text-neutral-500 text-xs">{description}</p>
			</div>
			<hr className="mt-1 py-1" />
			<Button
				onClick={onClick}
				className="font-bold"
				variant={warning ? "destructive" : "secondary"}
			>
				{btnText}
			</Button>
		</div>
	);
};

export default Note;
