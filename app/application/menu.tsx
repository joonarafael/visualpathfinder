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

interface MenuProps {
	zoom: number;
	setZoom: (value: number) => void;
	setFieldStatus: (array: number[]) => void;
	setApplicationState: (value: string) => void;
	dijkstra: () => void;
	applicationState: string;
}

const Menu: React.FC<MenuProps> = ({
	zoom,
	setZoom,
	setFieldStatus,
	applicationState,
	setApplicationState,
	dijkstra,
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
		setFieldStatus(
			Array.from({ length: 72 * 46 }, (_, index) => {
				const randomValue = Math.random() * 100; // Generate a random number between 0 and 100
				return randomValue <= walls ? 1 : 0; // Set to 1 if random value is less than or equal to walls input, otherwise set to 0
			})
		);
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
								<MenubarItem onClick={dijkstra}>Dijkstra</MenubarItem>
								<MenubarItem disabled>A*</MenubarItem>
								<MenubarItem disabled>Jump Point Search</MenubarItem>
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
							<MenubarSubTrigger>Load Ready Map</MenubarSubTrigger>
							<MenubarSubContent>
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
												generateRandom(30);
											}}
										>
											30% walls
										</MenubarItem>
										<MenubarItem
											onClick={() => {
												generateRandom(50);
											}}
										>
											50% walls
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>Labyrinths</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem disabled>Labyrinth 1</MenubarItem>
										<MenubarItem disabled>Labyrinth 2</MenubarItem>
										<MenubarItem disabled>Labyrinth 3</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>Cities</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem disabled>City 1</MenubarItem>
										<MenubarItem disabled>City 2</MenubarItem>
										<MenubarItem disabled>City 3</MenubarItem>
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
