"use client";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/app/components/ui/menubar";

interface MenuProps {
	zoom: number;
	setZoom: (value: number) => void;
	setFieldStatus: (array: number[]) => void;
}

const Menu: React.FC<MenuProps> = ({ zoom, setZoom, setFieldStatus }) => {
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

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => {}}>Run pathfinding</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								setFieldStatus(
									Array.from({ length: 64 * 64 }, (_, index) => 0)
								);
							}}
						>
							Empty Grid
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => window.open("/", "_self")}>
							Exit to front page
						</MenubarItem>
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
