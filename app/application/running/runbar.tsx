"use client";

// Sidebar for the run statistics.

import { Button } from "@/app/components/ui/button";
import ResultElement from "./resultelement";
import Note from "./note";
import NotRunElement from "./notrunelement";

interface RunBarProps {
	algorithm: string;
	runsStats: any;
	setApplicationState: (view: string) => void;
	showNote: number;
	setShowNote: (value: number) => void;
}

const RunBar: React.FC<RunBarProps> = ({
	algorithm,
	runsStats,
	setApplicationState,
	showNote,
	setShowNote,
}) => {
	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<Button
				onClick={() => {
					setApplicationState("draw");
				}}
				className="font-bold"
				variant={"secondary"}
			>
				EDIT GRID
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">ALGORITHM</div>
			<div className="font-bold text-2xl">{algorithm.toUpperCase()}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">COMPARE</div>
			{showNote === 0 ? (
				<Note
					title="NOTE"
					description="ALGORITHMS ARE RUN ON THE CLIENT MACHINE. THESE PERFORMANCE
					CALCULATIONS HEAVILY DEPEND ON YOUR SYSTEM AND BROWSER."
					onClick={() => {
						setShowNote(1);
					}}
					btnText="YES I KNOW"
					btnStyle="destructive"
					txtColor="rose-500"
					borderColor="yellow-500"
				/>
			) : (
				showNote === 1 && (
					<Note
						title="NOTE"
						description="PREVIOUS RUN RECORDS WILL BE STORED HERE. HOWEVER, EDITING THE
					GRID AND RERUNNING AN ALGORITHM WILL RESET ALL STATISTICS."
						onClick={() => {
							setShowNote(2);
						}}
						btnText="FINE BY ME"
						btnStyle="destructive"
						txtColor="rose-500"
						borderColor="yellow-500"
					/>
				)
			)}
			{runsStats.dijkstra.visited_nodes > 0 ? (
				<ResultElement
					name={"dijkstra"}
					data={{
						time: runsStats.dijkstra.time,
						visited_nodes: runsStats.dijkstra.visited_nodes,
						path_length: runsStats.dijkstra.path_length,
					}}
				/>
			) : (
				<NotRunElement name="dijkstra" />
			)}
			{runsStats.a_star.visited_nodes > 0 ? (
				<ResultElement
					name={"a*"}
					data={{
						time: runsStats.a_star.time,
						visited_nodes: runsStats.a_star.visited_nodes,
						path_length: runsStats.a_star.path_length,
					}}
				/>
			) : (
				<NotRunElement name="a*" />
			)}
			{runsStats.jps.visited_nodes > 0 ? (
				<ResultElement
					name={"jps"}
					data={{
						time: runsStats.jps.time,
						visited_nodes: runsStats.jps.visited_nodes,
						path_length: runsStats.jps.path_length,
					}}
				/>
			) : (
				<NotRunElement name="jps" />
			)}
			{showNote === 2 && (
				<Note
					title="TIP"
					description={`"EUCLIDEAN PATH LENGTH" (WHERE DIAGONALS SQRT(2)) IS GIVEN WITHIN PARENTHESES. THE FIRST NUMBER IS THE AMOUNT OF TRAVERSED NODES.`}
					onClick={() => {
						setShowNote(3);
					}}
					btnText="I GET IT"
					btnStyle="secondary"
					txtColor="green-500"
					borderColor="emerald-500"
				/>
			)}
		</div>
	);
};

export default RunBar;
