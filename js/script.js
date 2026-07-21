/* ======================================================
   script.js - After Class V5
   Versión preparada para modal
   ====================================================== */

const fichas = {
  "Apoyo Escolar":{
    presentacion:"Espacio destinado al acompañamiento académico, reforzando contenidos, hábitos de estudio y resolución de dudas para mejorar el desempeño escolar."
  },

  "Banda":{
    presentacion:"Desarrolla habilidades musicales mediante la práctica instrumental, fomentando la disciplina, el trabajo en equipo y la participación en presentaciones artísticas."
  },

  "Teatro":{
    presentacion:"Potencia la creatividad, la expresión corporal, la comunicación y la confianza personal mediante juegos dramáticos y montajes teatrales."
  },

  "Robótica":{
    presentacion:"Diseña, construye y programa proyectos tecnológicos desarrollando el pensamiento lógico, la creatividad y el trabajo colaborativo."
  },

  "Podcast":{
    presentacion:"Aprende a planificar, grabar y editar podcasts fortaleciendo la comunicación oral, la creatividad y el uso de herramientas digitales."
  },

  "Danza":{
    presentacion:"Explora diferentes estilos de danza fortaleciendo la coordinación, expresión corporal, ritmo y trabajo en equipo."
  },

  "Coro":{
    presentacion:"Desarrolla la técnica vocal, afinación y expresión artística participando en un ensamble coral y presentaciones musicales."
  },

  "Escuela de Rock":{
    presentacion:"Espacio para aprender interpretación musical en grupo, desarrollar habilidades instrumentales y vivir la experiencia de una banda de rock."
  },

  "CBA":{
    presentacion:"Programa de fortalecimiento del idioma inglés que desarrolla las habilidades de comprensión, conversación, lectura y escritura."
  },

  "Club Futsal Varones":{
    presentacion:"Entrenamiento orientado al desarrollo de habilidades técnicas, tácticas y valores deportivos mediante la práctica del futsal."
  },

  "Club Futsal Mujeres":{
    presentacion:"Espacio deportivo para fortalecer la técnica, el trabajo en equipo, la disciplina y el desarrollo físico a través del futsal."
  },

  "Club Básquet Varones":{
    presentacion:"Desarrolla fundamentos del baloncesto, estrategias de juego, coordinación y trabajo colaborativo en un ambiente deportivo."
  },

  "Club Básquet Mujeres":{
    presentacion:"Fortalece habilidades técnicas y tácticas del baloncesto promoviendo el compañerismo, el esfuerzo y la vida saludable."
  },

  "Club Voley Varones":{
    presentacion:"Aprende y perfecciona los fundamentos del voleibol fortaleciendo la coordinación, el trabajo en equipo y la disciplina deportiva."
  },

  "Club Voley Mujeres":{
    presentacion:"Espacio para desarrollar habilidades técnicas del voleibol, promoviendo la cooperación, el respeto y la actividad física."
  },

  "Lego Serius Play":{
    presentacion:"Desarrolla la creatividad, resolución de problemas y pensamiento crítico mediante dinámicas de construcción con piezas LEGO."
  },

  "Club de títeres":{
    presentacion:"Fomenta la imaginación, la expresión artística y la narración de historias mediante la creación y manipulación de títeres."
  },

  "Programación":{
    presentacion:"Introducción al pensamiento computacional mediante la creación de programas y proyectos utilizando herramientas de programación adecuadas a la edad."
  },

  "Defensa personal":{
    presentacion:"Desarrolla habilidades básicas de autoprotección, coordinación, disciplina y confianza mediante técnicas de defensa personal."
  },

  "Juegos de mesa":{
    presentacion:"Fortalece el pensamiento estratégico, la toma de decisiones, la convivencia y el trabajo colaborativo mediante juegos modernos de mesa."
  },

  "Ajedrez":{
    presentacion:"Desarrolla el pensamiento lógico, la concentración, la planificación y la resolución de problemas a través del ajedrez."
  },

  "Nivelación de ingles":{
    presentacion:"Espacio de apoyo para reforzar contenidos del idioma inglés y fortalecer las competencias comunicativas del estudiante."
  },

  "Speak Up":{
    presentacion:"Club de conversación en inglés orientado a desarrollar la fluidez, pronunciación y confianza al comunicarse en situaciones cotidianas."
  }
};
function obtenerActividad(nombre){
    if(typeof actividades==="undefined") return null;
    return actividades.find(a=>a.nombre===nombre) || null;
}

function construirHorario(act){

    if(!act || !act.horarios) return "<p>Sin horario</p>";

    const dias=["Lunes","Martes","Miércoles","Jueves","Viernes"];

    let html=`
    <table>
        <tr>
            <th>Periodo</th>
            <th>Horario</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
        </tr>`;

    const horas={
        1:"15:45 - 16:45",
        2:"16:45 - 17:45"
    };

    [1,2].forEach(p=>{

        html+=`<tr>
            <td><b>Periodo ${p}</b></td>
            <td>${horas[p]}</td>`;

        dias.forEach(d=>{

            const existe=act.horarios.some(h=>h.dia===d && h.periodo===p);

            const esClub = act.area === "deporte";

            if(esClub){
                const horario = act.horarios.find(h=>h.dia===d && h.periodo===p);
                html += `<td>${horario ? (horario.grupo || "✔") : ""}</td>`;
            }else{
                html += `<td>${existe ? "✔" : ""}</td>`;
            }

        });

        html+="</tr>";

    });

    html+="</table>";

    return html;

}

function abrirFicha(nombreActividad){
    const act=obtenerActividad(nombreActividad);
    if(!act){
        alert("No se encontró la actividad.");
        return;
    }

    const pres=(fichas[nombreActividad]?.presentacion)||"Presentación no registrada.";

    const texto=
`ACTIVIDAD

${act.nombre}

Docente:
${act.docente||"Por definir"}

Lugar:
${act.lugar||"Por definir"}

Grupo:
${act.grupo||"Por definir"}

HORARIO

${construirHorario(act)}

Presentación

${pres}`;

    document.getElementById("contenidoFicha").innerHTML=
    "<h2>"+act.nombre+"</h2>"
    +"<p><b>👨 Docente:</b> "+(act.docente||"Por definir")+"</p>"
    +"<p><b>📍 Lugar:</b> "+(act.lugar||"Por definir")+"</p>"
    +"<p><b>👥 Grupo:</b> "+(act.grupo||"Por definir")+"</p>"
    +"<h3>Horario</h3>"+construirHorario(act)
    +"<h3>Presentación</h3><p>"+pres+"</p>";
    document.getElementById("modalFicha").style.display="flex";
}

function cerrarModal(){
 document.getElementById("modalFicha").style.display="none";
}

window.addEventListener("click",function(e){
 const m=document.getElementById("modalFicha");
 if(e.target===m)m.style.display="none";
});
