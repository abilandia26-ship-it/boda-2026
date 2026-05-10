const fs = require('fs');
const crypto = require('crypto');

const rawData = `Jefferson	Masache	1
Abigail	Luzuriaga	1
César	Larrea	2
Cristina	Viteri	1
Danny	Moreno	1
Mauricio	Pazmiño	2
Vanesa	Ramirez	2
Jefferson	Robles	1
Mario	Caiza	1
Freyci	Lema	1
Michelle	Chamba	2
Francisco	Valle	1
Mayra	Tituaña	1
Richard	Miranda	1
Ernesto	Acuña	1
Stalyn	Andrango	2
Belén	Loaiza	1
José	Ocampo	1
Fabián	Jiménez	1
Selena	Ocampo	1
Eddy	Torres	1
Cristian	Castillo	1
Franco	Herrera	1
Alexander	Vidal	1
Juan Sebastián	Córdova	1
Maria	Álvarez	1
Isis	Castro	1
Miguel	Mena	1
Jean Pierre	Escobar	1
Esteban	Castillo	1
Mercy	Masache	1
Maylen	Benítez	1
Cyndel	Benítez	1
José	Benítez	1
Manfredo	Bermeo	1
Osmana	Armijos	1
Daniel	Bermeo	1
Diego	Bermeo	1
Javier	Bermeo	2
Elizabeth	Apolo	1
Walter	Bermeo	1
Mila	Bermeo	1
Santiago	Bermeo	1
Rita	Loján	1
Elvia	Bermeo	1
Leonardo	Bermeo	1
Mariuxi	Bermeo	1
Jack	Namicela	1
Katherine	Bonilla	1
Jorge	Bonilla	1
Mariana	Chicaiza	1
Johan	Bonilla	1
Domenica	Bonilla	1
Franklin	Bonilla	1
Alejandra	Bonilla	1
Deisy	Reina	1
Emily	Bonilla	1
Nancy	Jiménez	1
Yovani	Guamán	1
Luis	Jiménez	1
Verónica	Delgado	1
David	Jiménez	1
Hernán	Jiménez	1
Silvia	Panamito	1
Natalia	Jiménez	1
Anahí	Jiménez	1
Hernán David	Jiménez	1
Santiago	Celi	1
Gina	Bermeo	1
Rafael	Luzuriaga	1
Luis Eduardo	Luzuriaga	1
Luis Rafael	Luzuriaga	1
Margarita	Masache	1
Wilson	Masache	1
Maricela	Masache	3
Maritza	Masache	1
Orlando		1
Alexis	Masache	1
Patricia	Bonilla	1
Alonso	Bonilla	1
Blanca	Montaluisa	1
Yovani	Masache	2
Junior	Masache	1
Jose Luis	Masache	1
Emily	Masache	1
Anahí	Masache	1
Víctor	Masache	1
Nohemi	Sarango	1
Joel	Masache	1
Mylena	Masache	1
José	Masache	1
Blanca	Tinitana	1
Diana	Masache	1
Jenifer	Masache	1
Paúl	Masache	1
Omayra	Luzuriaga	1
Ramiro	Quezada	1
Ramiro	Quezada	1
Gladys	Bermeo	1
Marco	Román	1
Johanna	Román	1
Marcia	Román	2
Martha	Bermeo	1
Camila	Ríos	1
Sofía	Ríos	1
Estefanía	Ríos	1
Andrés	Montoya	1
Gladys	Luzuriaga	1
Carlos	Torres	1
Mateo	Torres	1
Victor	Flores	2
Yaneth	Masache	3
Gloria	Masache	3
Carmita	Masache	2
Adelaida	Masache	2
Miriam	Masache	2
Luis Franklin	Masache	1`;

const lines = rawData.split('\n').filter(l => l.trim() !== '');
const guests = {};
const csvLines = ['Nombre,Apellido,Pases,Enlace'];

lines.forEach(line => {
    const [nombre, apellido, pases] = line.split('\t');
    if (nombre === 'Nombre') return; // omitir cabecera si existe
    
    // Generar un ID único corto de 6 caracteres
    const id = crypto.randomBytes(3).toString('hex').toUpperCase(); 
    
    // Guardar en el objeto JSON usando nombres de propiedades muy cortos para ahorrar espacio
    guests[id] = { 
        n: nombre ? nombre.trim() : '', 
        a: apellido ? apellido.trim() : '', 
        p: parseInt(pases ? pases.trim() : '1') 
    };
    
    // Crear el enlace completo de la invitación
    const enlace = `https://abilandia26-ship-it.github.io/boda-2026/?id=${id}`;
    csvLines.push(`"${nombre}","${apellido}","${pases}",${enlace}`);
});

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/guests.json', JSON.stringify(guests));
fs.writeFileSync('./enlaces_invitados.csv', csvLines.join('\n'), 'utf8');

console.log('✅ Base de datos de invitados generada: src/data/guests.json');
console.log('✅ Archivo CSV para enviar mensajes generado: enlaces_invitados.csv');
