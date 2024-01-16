"use client";

// master container to contain the width

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<div
			className="
                max-w-[2520px]
                md:px-10
                mx-auto
                px-4
                xl:px-20
            "
		>
			{children}
		</div>
	);
};

export default Container;
