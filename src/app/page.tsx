'use client';

import Loader from '@/components/Loader';
// import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Result from '@/components/Result';
import SearchBox from '@/components/SearchBox';
import { useState } from 'react';

export default function Home() {
	const [search, setSearch] = useState<string>('');
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (input: string) => {
		setResult(null);
		setIsLoading(true);

		const res = await fetch('/api/query', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ input }),
		});

		const data = await res.json();
		setResult(data.result);

		setIsLoading(false);
	};

	const handleChange = (input: string) => {
		setSearch(input);

		if (!input) {
			setResult(null);
		}
	};

	return (
		<>
			<Navbar />
			<div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					{/* BANNER SECTION */}
					<section>
						<div className="flex flex-col gap-2">
							<h1>Understand any word or phrase</h1>
							<p>
								Discover meanings, examples, and famous uses of any word or
								phrase with the power of AI
							</p>
						</div>
						<div className="flex flex-col w-full gap-2 justify-center items-center mt-4">
							<SearchBox
								input={search}
								onChange={handleChange}
								onSearch={handleSearch}
							/>
							{!search && (
								<p className="p1">
									Try: &quot;break a leg&quot;, &quot;serendipity&quot;, or
									&quot;to be or not to be&quot;
								</p>
							)}
							{result && <Result result={result} />}
							{isLoading && <Loader />}
						</div>
					</section>
					{/* WHY USE PHRASER SECTION */}
					{/* <section>
						<div className="flex flex-col">
							<h2>Why Use Phraser?</h2>
							<p>
								More than just a dictionary - get comprehensive insights about
								any word or phrase
							</p>
						</div>
						<div className="flex gap-2">
							<Card
								title="Deep Understanding"
								description="Get comprehensive meanings, origins, and context for any word or phrase"
							/>
							<Card
								title="Real Examples"
								description="See how words and phrases are used in real sentences and contexts"
							/>
							<Card
								title="Cultural Impact"
								description="Discover where phrases come from and their famous uses throughout history"
							/>
						</div>
					</section> */}
				</main>
				<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
			</div>
		</>
	);
}
