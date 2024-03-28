<script context="module" lang="ts">
	const cache = new Map<string, Promise<DictionaryEntry>>();
</script>

<script lang="ts">
	export let word: string;

	async function getWordData(word) {
    try {
        const response = await fetch(`https://apipiword.piberio.com/buscar?palabra=amor`, {
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data[0]); // Aquí obtienes el contenido de la respuesta como un objeto JavaScript
        return data[0];
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

</script>

<div class="def">
	<div>La palabra era: <strong class="cafe">{word}</strong></div>

	{#await getWordData(word)}
		<h4>Buscando letra en canciones...</h4>
	{:then data}
	<div class="origencancion">
		<h4>{data.titulo}</h4>
		<p>"{@html data.fragmento}"</p>
	</div>
		
	{:catch}
		<div>La palabra era <strong>{word}</strong>. No se pudo encontrar el origen...</div>
	{/await}


	<br>
	<h6 class="cafe">Ayudanos a seguir manteniendo estos proyectos:</h6><br>
	
	<a href='https://cafecito.app/piberio' rel='noopener' target='_blank'><img srcset='https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_6.png' alt='Invitame un café en cafecito.app' /></a>
</div>

<style>
	.cafe{
		color:goldenrod;
	}
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

	.origencancion {
   		background-color: #1c1c1c;
   		border-radius: 5px;
   		margin-top: 20px;
   		margin-bottom: 10px;
   		padding: 15px;
	}

	.origencancion h4{
		color:#4da346;
		font-weight: 600;
		font-size: 0.9em;
		
	}

	.origencancion p{
		color:white;
		font-size: 0.6em;
		margin-top: 10px;
		font-style: italic;
	}
</style>
