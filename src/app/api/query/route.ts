import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
	const { input } = await req.json();

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

	return Response.json({
		result: JSON.parse(response.choices[0].message.content!),
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
