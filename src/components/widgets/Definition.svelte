<script context="module" lang="ts">
	const cache = new Map<string, Promise<DictionaryEntry>>();
</script>

<script lang="ts">
	export let word: string;
	/** The maximum number of alternate definitions to provide*/
	export let alternates = 9;

	async function getWordData(word: string): Promise<DictionaryEntry> {
		if (!cache.has(word)) {
			const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${word}`, {
				mode: "cors",
			});
			if (data.ok) {
				cache.set(word, (await data.json())[0]);
			} else {
				throw new Error(`Failed to fetch definition`);
			}
		}
		return cache.get(word);
	}
</script>

<div class="def">
	<div>La palabra era <strong>{word}</strong></div>
</div>

<style>
	.def{
		margin-top:10px;
		text-align: center;
		font-size:20pt;
	}
	h2 {
		display: inline-block;
		margin-right: 1rem;
		margin-bottom: 0.8rem;
	}
	ol {
		padding-left: 1.5rem;
	}
	li {
		margin-bottom: 0.5rem;
	}
	li::first-letter {
		text-transform: uppercase;
	}
	li::marker {
		color: var(--fg-secondary);
	}
</style>
