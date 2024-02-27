// APPLICATION ROOT LAYOUT
// Web app entry point, main HTML structure

import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import Footer from "./components/footer";
import { Toaster } from "./components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<div className="py-4">{children}</div>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
