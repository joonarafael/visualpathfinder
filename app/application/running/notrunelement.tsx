"use client";

interface NotRunElementProps {
	name: string;
}

const NotRunElement: React.FC<NotRunElementProps> = ({ name }) => {
	return (
		<div
			className={`text-lg rounded border p-2 font-semibold border-neutral-500`}
		>
			{name.toUpperCase()}
			<hr className="mt-1 py-1" />
			<div className="flex flex-col gap-1 font-light">
				<p className="text-neutral-500 text-xs">NOT RUN YET</p>
				<p className="text-neutral-500 text-xs">
					EXECUTE FROM <br />
					{`File > Run Algorithm ...`}
				</p>
			</div>
		</div>
	);
};

export default NotRunElement;
