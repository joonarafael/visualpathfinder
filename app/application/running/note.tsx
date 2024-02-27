"use client";

import { Button } from "@/app/components/ui/button";
import { MouseEventHandler } from "react";

interface NoteProps {
	title: string;
	description: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	btnText: string;
	btnStyle:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| null
		| undefined;
	txtColor: string;
	borderColor: string;
}

const Note: React.FC<NoteProps> = ({
	title,
	description,
	onClick,
	btnText,
	btnStyle,
	txtColor,
	borderColor,
}) => {
	return (
		<div
			className={`text-lg rounded border p-2 font-semibold flex flex-col border-${borderColor} content-center text-${txtColor}`}
		>
			{title}
			<hr className="mt-1 py-1" />
			<div className="flex flex-col gap-1 font-light">
				<p className="text-neutral-500 text-xs">{description}</p>
			</div>
			<hr className="mt-1 py-1" />
			<Button onClick={onClick} className="font-bold" variant={btnStyle}>
				{btnText}
			</Button>
		</div>
	);
};

export default Note;
