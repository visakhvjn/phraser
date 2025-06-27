import Image from 'next/image';
import Card from './Card';
import PlainCard from './PlainCard';
import { speakText } from '@/utils';

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
				<PlainCard>
					<div>
						<div className="flex gap-2">
							<h3 className="text-lg font-semibold">Pronunciation</h3>
							{result?.pronunciation && (
								<button
									className="cursor-pointer"
									onClick={() => speakText(result?.pronunciation || '')}
								>
									<Image
										width={17}
										height={17}
										src={'/speak.svg'}
										alt="speak icon"
									/>
								</button>
							)}
						</div>
						<p className="text-gray-600 text-md">{result?.pronunciation}</p>
					</div>
				</PlainCard>
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
