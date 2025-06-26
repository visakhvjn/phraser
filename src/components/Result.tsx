import Card from './Card';

export type Result = {
	definition?: string;
	pronunciation?: string;
	tone?: string;
	sentences?: string[];
	famousUses?: string[];
	origin?: string;
	searches: number;
};

type ResultCardProps = {
	result?: Result;
};

export default function Result({ result }: ResultCardProps) {
	return (
		<div className="p-6 space-y-4 text-left mt-8 w-4xl">
			<div className="grid md:grid-cols-3 gap-4">
				<Card title="Pronunciation" description={result?.pronunciation} />
				<Card title="Tone" description={result?.tone} />
				<Card title="Searches" description={result?.searches} />
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<Card title="What It Means" description={result?.definition} />
				<Card title="Origins" description={result?.origin} />
			</div>

			<div className="grid md:grid-cols-1 gap-4">
				<Card
					title="Sentences"
					description={result?.sentences?.map((s, i) => (
						<li className="list-disc" key={i}>
							{s}
						</li>
					))}
				/>
			</div>

			<div className="grid md:grid-cols-1 gap-4">
				<Card
					title="Commonly Used"
					description={result?.famousUses?.map((s, i) => (
						<li key={i}>{s}</li>
					))}
				/>
			</div>
		</div>
	);
}
