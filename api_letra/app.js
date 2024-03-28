const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importa el middleware cors

const app = express();
app.use(cors()); // Usa el middleware cors para permitir CORS desde cualquier origen

const cancionesDir = path.join(__dirname, 'canciones');

// Definir variables para controlar longitud de texto previo y posterior al fragmento
const longitudAnterior = 40; // Número de caracteres o palabras antes del fragmento
const longitudPosterior = 40; // Número de caracteres o palabras después del fragmento

function buscarPalabra(palabra) {
    const resultados = [];
    const files = fs.readdirSync(cancionesDir);

    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.endsWith('.txt')) {
            const titulo = filename.replace('.txt', '').charAt(0).toUpperCase() + filename.replace('.txt', '').slice(1).toLowerCase();
            const filePath = path.join(cancionesDir, filename);
            const contenido = fs.readFileSync(filePath, 'utf8');

            // Eliminar texto entre corchetes, saltos de línea y palabras entre paréntesis
            const contenidoLimpio = contenido.replace(/\[.*?\]/g, '').replace(/\n/g, ' ').replace(/\(.*?\)/g, '');

            // Utilizar expresión regular para buscar la palabra exacta con límites de palabra
            const regex = new RegExp(`\\b${palabra}\\b`, 'gi');
            let match;
            while ((match = regex.exec(contenidoLimpio)) !== null) {
                const index = match.index;
                let inicio = Math.max(index - longitudAnterior, 0);
                let fin = Math.min(index + palabra.length + longitudPosterior, contenidoLimpio.length);

                // Ajustar el fragmento para que termine en una palabra completa
                while (inicio > 0 && !/\s/.test(contenidoLimpio.charAt(inicio))) {
                    inicio--;
                }
                while (fin < contenidoLimpio.length && !/\s/.test(contenidoLimpio.charAt(fin - 1))) {
                    fin++;
                }

                let fragmento = contenidoLimpio.substring(inicio, fin);
                fragmento = fragmento.replace(new RegExp(palabra, 'gi'), `<span style="color: goldenrod; text-decoration:underline; font-weight:bold">${palabra}</span>`);
                if (inicio > 0) {
                    fragmento = '...' + fragmento;
                }
                if (fin < contenidoLimpio.length) {
                    fragmento += '...';
                }
                resultados.push({ titulo: titulo, fragmento });
                break; // Limitar los resultados a 1 búsqueda
            }
        }
    }

    return resultados;
}





app.get('/buscar', (req, res) => {
    const palabra = req.query.palabra;
    if (!palabra) {
        return res.status(400).json({ error: 'Se requiere proporcionar una palabra para buscar.' });
    }
    const resultados = buscarPalabra(palabra);
    res.json(resultados);
});

const PORT = process.env.PORT || 1333;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
