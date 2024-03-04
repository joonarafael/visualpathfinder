// APPLICATION ROOT
// Web app entry point, main HTML structure

import type { Metadata } from "next";
import "./globals.css";

import { Roboto_Mono } from "next/font/google";

import Footer from "./components/footer";
import { Toaster } from "./components/ui/sonner";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Visual Pathfinder",
	description:
		"Interactive pathfinder tool to compare some popular pathfinding algorithms.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<div className="py-4">{children}</div>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
