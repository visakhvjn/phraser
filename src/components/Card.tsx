import { ReactNode } from 'react';

type CardProps = {
	icon?: ReactNode;
	title: string;
	description?: ReactNode;
	className?: string;
};

export default function Card({
	icon,
	title,
	description,
	className = '',
}: CardProps) {
	return (
		<div
			className={`bg-white rounded-xl shadow-sm p-4 flex gap-4 items-start ${className}`}
		>
			<div className="text-blue-600 text-2xl">{icon}</div>
			<div>
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-gray-600 text-md">{description}</p>
			</div>
		</div>
	);
}
