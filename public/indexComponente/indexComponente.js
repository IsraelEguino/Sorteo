class BoletosSorteo extends HTMLElement {
    constructor() {
        super();
    }
    // Sirve para mostrar los elementos de presentación 
    connectedCallback() {
        let usuario = "organizador";
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow, usuario);
        this.#cargarBoletos(shadow, usuario);
        this.#seleccionarBoletos(shadow);
        
        this.#agregarEstilo(shadow);


    }

    // Demas funciones para llenar los elementos de presentación
    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./indexComponente/css/estiloIndexComponente.css");
        shadow.appendChild(link);
    }

    #cargarBoletos(shadow,usuario) {
        //Cargar <div class="grid-container"></div>
        fetch('http://localhost:3000/api/boletos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json);
                var numeros = json.data;
                const gridContainer = shadow.querySelector('.grid-container');

                if (usuario == "organizador") {
                    for (let i = 0; i < numeros.length; i++) {
                        if (numeros[i].estadoBoleto === "APARTADO") {
                            let div = document.createElement('div');
                            div.innerHTML = `${i + 1}`;
                            div.className = `grid-item item${i + 1}`;
                            gridContainer.appendChild(div);

                        }


                    }
                } else {
                    let idUsuario = "61af9330dade9456c26f7f3e";
                    for (let i = 0; i < numeros.length; i++) {
                        if (numeros[i].estadoBoleto === "APARTADO") {
                            if (numeros[i].usuario == idUsuario) {
                                let div = document.createElement('div');
                                div.innerHTML = `${i + 1}`;
                                div.className = `grid-item item${i + 1}`;
                                gridContainer.appendChild(div);
                            }

                        }

                    }
                }

            });

    }

    #seleccionarBoletos(shadow) {
        const gridContainer = shadow.querySelector('.grid-container');
        const msg = shadow.querySelector('.msg')
        gridContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains(`item${e.srcElement.innerHTML}`)) {
                return
            }
            console.log(e.srcElement.innerHTML);
            const i = e.srcElement.innerHTML;
            e.target.classList.toggle('active');

            if (e.target.classList.contains('active')) {
                let cont = document.createElement('div');
                let span = document.createElement('span');
                let span2 = document.createElement('span');
                span2.id = `span-${i}`;
                
                span.innerHTML = `Número #`;
                span2.innerHTML = `${i}`;
                let div1 = document.createElement('div');

                div1.className = 'count1';
                div1.id = `count-${i}`;
                console.log("div1:"+div1.id)
                div1.appendChild(span);
                div1.appendChild(span2);
                shadow.getElementById('count').appendChild(div1);
            }
            else {
                const id = shadow.getElementById(`count-${i}`);
                console.log("id count: "+id.id);
                shadow.getElementById('count').removeChild(id);
            }


        });
        
        this.#liberar(shadow);
    }

    #render(shadow, usuario) {

        shadow.innerHTML = `

        <div class="contenido">
        <div class="tickets">
        <h1 style="margin:0; text-align: center;">SORTEO SENTRA 2022</h2>
        <div class="grid-container">
            
        </div>
        <div class="bottom">
            <div class="bottom1">
                <div class="square available"></div>
                Apartados
            </div>
            <div class="bottom1">
                <div class="square select"></div>
                Seleccionados
            </div>
        </div>
    </div>

    <div class="monto">
            <div><h3 style="text-align: center;">NÚMEROS SELECCIONADOS</h2></div>
            <div class="count">
                <div class="countdiv" id="count">
                    
                </div>
                <hr>
            </div>
            
            <div class="buttons">
                <button class="btn btn1" id="botonFunc">Liberar</button>
                <button class="btn btn2">Regresar</button>
            </div>
            <template>
                <div class="count1">
                    <span>Número #1</span>
                    <span></span>
                </div>
            </template>
        </div>
        </div>
    `

        let header = document.getElementById("header");
        

        if (usuario == "organizador") {
            header.innerHTML = `<h1>Liberar Apartado</h1>`;
        } else if (usuario == "cliente") {
            header.innerHTML = `<h1>Cancelar Apartado</h1>`;
        }
    }

    #liberar(shadow) {
        
        const boton = shadow.getElementById("botonFunc");
        boton.addEventListener('click', function() {
            for (let i = 0; i < 20; i++) {
                //console.log(`count-${i}`)
                //console.log(`span en liberar: span-${i}`);
                let id = shadow.getElementById(`span-${i}`);
                
                if (id == null | id === "") {
                    
                }else {
    
                    fetch('http://localhost:3000/api/boletos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => { return response.json() })
                        .then((json) => {
                            var boletos = json.data;
                            console.log(boletos);
                            for (let x = 0; x < boletos.length; x++) {
                                
                                if (boletos[x].numero == id.innerHTML) {
                                    console.log("boleto: " + boletos[x]+", id: "+id.innerHTML);
                                    boletos[x].estadoBoleto = "DISPONIBLE";
                                    
                                    boletos[x].usuario = null;
                                    console.log("id: "+boletos[x].id);
                                    console.log("_id: "+boletos[x]._id);
                                    console.log(JSON.stringify(boletos[x]));
                                    fetch('http://localhost:3000/api/boleto/:'+boletos[x]._id, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        
                                        body: JSON.stringify(boletos[x]),
                                    });
                                }
                                
                            }
    
                        });
    
    
                } 
            }
        })
        



    }

}
window.customElements.define("boletos-sorteo", BoletosSorteo);