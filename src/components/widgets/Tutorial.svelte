<script lang="ts">
	import { COLS, ROWS } from "../../utils";

	import { Tile } from "../board";
	export let visible: boolean;
</script>

<h3>Cómo jugar</h3>
<div>Adivina la <strong>PALABRA</strong> en {ROWS} intentos.</div>
<div>Cada intento debe ser una palabra válida de {COLS} letras. Presiona el botón enter para enviar.</div>
<div>
	Después de cada intento, el color de las casillas cambiará para mostrar qué tan cerca estuvo tu
	adivinanza de la palabra.
</div>
<div class:complete={visible} class="examples">
	<div><strong>Ejemplos</strong></div>
	<div class="row">
		<Tile value="c" state="🟩" />
		<Tile value="a" state="🔳" />
		<Tile value="s" state="🔳" />
		<Tile value="a" state="🔳" />
		<Tile value="s" state="🔳" />
	</div>
	<div>La letra <strong>C</strong> está en la palabra y en el lugar correcto.</div>
	<div class="row">
		<Tile value="m" state="🔳" />
		<Tile value="o" state="🟨" />
		<Tile value="n" state="🔳" />
		<Tile value="t" state="🔳" />
		<Tile value="e" state="🔳" />
	</div>
	<div>La letra <strong>O</strong> está en la palabra pero en el lugar equivocado.</div>
	<div class="row">
		<Tile value="p" state="🔳" />
		<Tile value="i" state="🔳" />
		<Tile value="n" state="🔳" />
		<Tile value="t" state="⬛" />
		<Tile value="o" state="🔳" />
	</div>
	<div>La letra <strong>T</strong> no está en la palabra en ningún lugar.</div>
</div>

<div>
	Esta es una recreación del <a
		href="https://www.nytimes.com/games/wordle/"
		target="_blank"
		rel="noreferrer">Wordle</a
	> original por Josh Wardle.
	<br /><br />
	Abre el menú de configuración para ver algunas de las características adicionales.
	<br />
	Programado con Svelte, con Typescript por
	<a href="https://github.com/MikhaD" target="_blank" rel="noreferrer">MikhaD</a> adaptado para el piberío por
	<a href="https://twitter.com/dantezor_" target="_blank" rel="noreferrer">Dantezor</a>.
</div>

<style lang="scss">
	div {
		margin: 14px 0;
	}
	.examples {
		border-top: 1px solid var(--border-primary);
		border-bottom: 1px solid var(--border-primary);
		:global(.row > *) {
			height: 100%;
			aspect-ratio: 1;
		}
		&:not(.complete) :global(.row .back) {
			transition-delay: 0.3s;
		}
	}
	.row {
		height: 40px;
		display: flex;
		gap: 4px;
	}
</style>
