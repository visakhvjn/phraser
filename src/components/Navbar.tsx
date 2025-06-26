'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className="w-full bg-white shadow-sm sticky top-0">
			<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold text-black flex gap-2">
					<Image src={'/quote.svg'} alt={''} width={20} height={20} />
					Phraser
				</Link>
			</div>
		</nav>
	);
}
