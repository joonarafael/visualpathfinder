"use client";

// Menu bar component.

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/app/components/ui/menubar";

import benchmark0 from "../maps/benchmarks/benchmark0";
import benchmark1 from "../maps/benchmarks/benchmark1";
import benchmark2 from "../maps/benchmarks/benchmark2";
import baldur0 from "../maps/baldursgate/baldur0";
import baldur1 from "../maps/baldursgate/baldur1";
import city0 from "../maps/cities/city0";
import baldur2 from "../maps/baldursgate/baldur2";
import city1 from "../maps/cities/city1";
import city2 from "../maps/cities/city2";

interface MenuProps {
	zoom: number;
	setZoom: (value: number) => void;
	setFieldStatus: (array: number[]) => void;
	setApplicationState: (value: string) => void;
	runAlgorithm: (value: string) => void;
	applicationState: string;
	smoothing: boolean;
	setSmoothing: (value: boolean) => void;
	contrast: boolean;
	setContrast: (value: boolean) => void;
	fieldStatus: number[];
}

const Menu: React.FC<MenuProps> = ({
	zoom,
	setZoom,
	setFieldStatus,
	applicationState,
	setApplicationState,
	runAlgorithm,
	smoothing,
	setSmoothing,
	contrast,
	fieldStatus,
	setContrast,
}) => {
	const zoomIn = () => {
		if (zoom < 6) {
			setZoom(zoom + 1);
		}
	};

	const zoomOut = () => {
		if (zoom > 1) {
			setZoom(zoom - 1);
		}
	};

	const zoomMin = () => {
		setZoom(1);
	};

	const zoomDefault = () => {
		setZoom(4);
	};

	const zoomMax = () => {
		setZoom(6);
	};

	const emptyGrid = () => {
		setFieldStatus(Array.from({ length: 72 * 46 }, (_, index) => 0));
		setApplicationState("draw");
	};

	const generateRandom = (walls: number) => {
		const tmp: number[] = Array.from({ length: 72 * 46 }, (_, index) => {
			const randomValue = Math.random() * 100;
			return randomValue <= walls ? 1 : 0;
		});

		const startPoint = Math.floor(Math.random() * 3455);
		let endPoint = Math.floor(Math.random() * 3455);

		while (startPoint === endPoint) {
			endPoint = Math.floor(Math.random() * 3455);
		}

		tmp[startPoint] = 2;
		tmp[endPoint] = 3;

		setFieldStatus(tmp);

		setApplicationState("draw");
	};

	const setMap = (map: number[]) => {
		setFieldStatus(Array.from(map));
		setApplicationState("draw");
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>Run Algorithm...</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem
									onClick={() => {
										runAlgorithm("dijkstra");
									}}
								>
									Dijkstra
								</MenubarItem>
								<MenubarItem
									onClick={() => {
										runAlgorithm("a_star");
									}}
								>
									A*
								</MenubarItem>
								<MenubarItem
									onClick={() => {
										runAlgorithm("jps");
									}}
								>
									Jump Point Search
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSub>
							<MenubarSubTrigger>Run Virtual Maps</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem disabled onClick={() => {}}>
									None
								</MenubarItem>
								<MenubarItem disabled onClick={() => {}}>
									None
								</MenubarItem>
								<MenubarItem disabled onClick={() => {}}>
									None
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						{applicationState === "run" ? (
							<MenubarItem
								onClick={() => {
									setApplicationState("draw");
								}}
							>
								Edit Grid
							</MenubarItem>
						) : (
							<MenubarItem disabled>Edit Grid</MenubarItem>
						)}
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Load Map</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarSub>
									<MenubarSubTrigger>{"Baldur's Gate"}</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => {
												setMap(baldur0);
											}}
										>
											{"Baldur's Gate 1"}
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(baldur1);
											}}
										>
											{"Baldur's Gate 2"}
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(baldur2);
											}}
										>
											{"Baldur's Gate 3"}
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>{"Cities"}</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => {
												setMap(city0);
											}}
										>
											{"City 1"}
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(city1);
											}}
										>
											{"City 2"}
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(city2);
											}}
										>
											{"City 3"}
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>Benchmarks</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => {
												setMap(benchmark0);
											}}
										>
											Benchmark 1
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(benchmark1);
											}}
										>
											Benchmark 2
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												setMap(benchmark2);
											}}
										>
											Benchmark 3
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSeparator />
								<MenubarSub>
									<MenubarSubTrigger>Randomly Generated</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => {
												generateRandom(10);
											}}
										>
											10% walls
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												generateRandom(20);
											}}
										>
											20% walls
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												generateRandom(40);
											}}
										>
											40% walls
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSub>
							<MenubarSubTrigger>Empty Grid</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={emptyGrid}>Click to Confirm</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								console.log(fieldStatus);
							}}
						>
							Log Field to Console
						</MenubarItem>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Exit</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={() => window.open("/", "_self")}>
									Click to Confirm
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Visuals</MenubarTrigger>
					<MenubarContent>
						<MenubarItem
							onClick={() => {
								setSmoothing(!smoothing);
							}}
						>
							Toggle Borderless Mode
						</MenubarItem>
						<MenubarItem
							onClick={() => {
								setContrast(!contrast);
							}}
						>
							Toggle High Contrast Mode
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={zoomIn}>Zoom In</MenubarItem>
						<MenubarItem onClick={zoomOut}>Zoom Out</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomDefault}>Zoom Default</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomMin}>Minimum Zoom</MenubarItem>
						<MenubarItem onClick={zoomMax}>Maximum Zoom</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={toggleFullscreen}>
							Toggle Fullscreen
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Menu;
