import { OpenAI } from 'openai';
import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type Props = {
	searches: number;
	definition: string;
	pronunciation: string;
	tone: string;
	sentences: string[];
	famousUses: string[];
	origin: string;
};

export async function POST(req: Request) {
	const { input } = await req.json();

	const cached: Props | null = await redis.get(input);

	if (cached) {
		await redis.set(input, { ...cached, searches: cached.searches + 1 });
		return Response.json({ result: cached });
	}

	const prompt = `Explain the word or phrase "${input}" with:
		1. A simple, beginner-friendly definition
		2. The correct pronunciation
		3. Tone/formality
		4. 2 example sentences
		5. Famous uses
		6. Origin

		Make sure the response is a JSON object with the following fields - 
		{
			definition: <string>,
			pronunciation: <string>,
			tone: <string>,
			sentences: <string[]>,
			famousUses: <string[]>,
			origin: string
		}

		DO NOT return anything else
	`;

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: prompt }],
	});

	const parsed = JSON.parse(response.choices[0].message.content!);

	await redis.set(input, { ...parsed, searches: 1 });

	return Response.json({
		result: parsed,
	});
}

export async function GET() {
	const prompt = `Get a random English phrase for the day`;

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: prompt }],
	});

	return Response.json({
		result: JSON.parse(response.choices[0].message.content!),
	});
}
