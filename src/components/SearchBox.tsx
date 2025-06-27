'use client';

import { RefObject } from 'react';

type Props = {
	ref: RefObject<HTMLInputElement | null>;
	input: string;
	onSearch: (text: string) => void;
	onChange: (input: string) => void;
};

export default function SearchBox({ ref, input, onChange, onSearch }: Props) {
	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(input);
	};

	return (
		<form onSubmit={handleSearch} className="flex gap-2">
			<div>
				<input
					ref={ref}
					value={input}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Enter a word or phrase..."
					className="border p-3 rounded w-2xl text-xl bg-white shadow-md indent-1"
				/>
				{input && (
					<button
						type="button"
						onClick={() => onChange('')}
						className="relative right-10 shadow-xs hover:bg-gray-200 text-gray-500 hover:text-black rounded-full bg-gray-50 px-2 cursor-pointer"
					>
						x
					</button>
				)}
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded hidden"
			>
				{'Search'}
			</button>
		</form>
	);
}
