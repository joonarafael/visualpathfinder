"use client";

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

const Menu: React.FC<MenuProps> = ({ zoom, setZoom, setFieldStatus, applicationState, setApplicationState, dijkstra }) => {
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

	const zoomMax = () => {
		setZoom(6);
	};

	const runDijkstra = () => {
		setApplicationState("run");
		dijkstra();
	}

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>Run Algorithm...</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={runDijkstra}>
									Djikstra
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						{applicationState === "run" ? <MenubarItem onClick={() =>{setApplicationState("draw");}}>Edit Grid</MenubarItem> : <MenubarItem disabled>Edit Grid</MenubarItem>}
						<MenubarSeparator />

						<MenubarSub>
							<MenubarSubTrigger>Empty Grid</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={() => {
								setFieldStatus(
									Array.from({ length: 64 * 64 }, (_, index) => 0)
								);
							}}>
									Click to Confirm
								</MenubarItem>
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
						<MenubarItem onClick={zoomMin}>Minimum zoom</MenubarItem>
						<MenubarItem onClick={zoomMax}>Maximum zoom</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Menu;
