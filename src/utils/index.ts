export function speakText(text: string) {
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance(text);
	synth.speak(utterance);
}
