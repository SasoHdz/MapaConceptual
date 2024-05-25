
   
document.addEventListener('DOMContentLoaded', (event) => {

    let nombre;
    let puntos = 0;

            Swal.fire({
                title: "¡Hola! ¿Cuál es tu nombre?",
                input: "text",
                inputLabel: "Tu nombre",
                inputPlaceholder: "Ingresa tu nombre",
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                inputValidator: (value) => {
                    if (!value) {
                        return "¡Ingresa tu nombre, por favor!";
                    } else {
                        nombre = value;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    //alert(`Hola, ${nombre}!`);
                    Swal.fire(`Hola, ${nombre}. Estas listo? `);
                }
            });
    
    

    const container = document.getElementById("word-container");
    const elements = Array.from(container.getElementsByClassName("draggable"));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(elements);

    // Clear the container and append shuffled elements
    container.innerHTML = "";
    elements.forEach(element => container.appendChild(element));


    const draggables = document.querySelectorAll('.draggable');
    const dropzones = document.querySelectorAll('.dropzone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        if (e.target.id === id.replace('drag', 'rect') || e.target.id === id.replace('drag', 'word')) {
            e.target.textContent = draggable.textContent;
            draggable.remove();
            puntos +=1;
            if(draggables.length== puntos){
                //Swal.fire(`Felicidades, ${nombre}. Estas listo? `);
                Swal.fire({
                    title: `Felicidades, ${nombre}. Completaste el Mapa.`,
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  });
            }
        } else {
            draggable.classList.remove('hide');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Intentalo otra vez.... !",
              });

        }
    }
});
