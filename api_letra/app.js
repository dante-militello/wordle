const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const cancionesDir = path.join(__dirname, 'canciones');

// Definir variables para controlar longitud de texto previo y posterior al fragmento
const longitudAnterior = 50; // Número de caracteres o palabras antes del fragmento
const longitudPosterior = 50; // Número de caracteres o palabras después del fragmento

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
            if (regex.test(contenidoLimpio)) {
                const match = regex.exec(contenidoLimpio);
                const index = match ? match.index : -1;
                const inicio = Math.max(index - longitudAnterior, 0);
                const fin = Math.min(index + palabra.length + longitudPosterior, contenidoLimpio.length);

                let fragmento = contenidoLimpio.substring(inicio, fin).replace(regex, `<b>${palabra}</b>`);
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
