"use client";

// Menu bar component for virtual maps.

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

interface VirtualMapMenuProps {
	zoom: number;
	setZoom: (value: number) => void;
	runAlgorithm: (value: string) => void;
}

const VirtualMapMenu: React.FC<VirtualMapMenuProps> = ({
	zoom,
	setZoom,
	runAlgorithm,
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
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Virtual Maps...</MenubarSubTrigger>
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
							Toggle Fullscreen <MenubarShortcut>F11</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default VirtualMapMenu;
