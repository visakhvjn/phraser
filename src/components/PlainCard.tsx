import { ReactNode } from 'react';

type PlainCardProps = {
	children: ReactNode;
};

export default function PlainCard({ children }: PlainCardProps) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 items-start">
			{children}
		</div>
	);
}
