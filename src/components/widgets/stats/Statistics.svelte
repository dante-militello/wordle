<script lang="ts">
	import { mode } from "../../../stores";
	import { modeData, Stats } from "../../../utils";

	import Stat from "./Stat.svelte";
	export let data: Stats;

	let stats: [string, string | number][];
	$: {
		stats = [
			["Jugado", data.played],
			["Ganados %", Math.round(((data.played - data.guesses.fail) / data.played) * 100) || 0],
			[
				"Promedio de adivinados",
				(
					Object.entries(data.guesses).reduce((a, b) => {
						if (!isNaN(+b[0])) {
							return a + +b[0] * b[1];
						}
						return a;
					}, 0) / data.played || 0
				).toFixed(1),
			],
		];
		if (data.guesses.fail > 0) {
			stats.push(["Perdidas", data.guesses.fail]);
		}
		if (data.hasStreak) {
			stats.push(["Racha Actual", data.streak]);
			stats.push(["Racha Máxima", data.maxStreak]);
		}
	}
</script>

<h3>Estadísticas ({modeData.modes[$mode].name})</h3>
<div>
	{#each stats as stat}
		<Stat name={stat[0]} stat={stat[1]} />
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		gap: 8px;
	}
</style>
