'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
	isLoading: boolean;
	onLearnAPharse: () => void;
};

export default function Navbar({ onLearnAPharse, isLoading = false }: Props) {
	return (
		<nav className="w-full bg-white shadow-sm sticky top-0">
			<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold text-black flex gap-2">
					<Image src={'/quote.svg'} alt={''} width={20} height={20} />
					Phraser
				</Link>
				<div className="flex gap-2">
					<Image
						src={'/bulb.svg'}
						width={15}
						height={12}
						alt={'A light bulb'}
					/>

					<button
						disabled={isLoading}
						className={`font-semibold ${
							isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
						}`}
						onClick={onLearnAPharse}
					>
						Learn a Phrase
					</button>
				</div>
			</div>
		</nav>
	);
}
