
var JUEGO = document.getElementById("juego");
var CTX = JUEGO.getContext("2d"); 
var DIRECCIONES = {
    ARRIBA: 1,
    ABAJO: 2,
    IZQUIERDA: 3,
    DERECHA: 4,
  };
  
  var culebra;
  var direccionActual;
  var nuevaDireccion;
  var ciclo;
  var puntos;
  var FPS = 8000 / 100;
  function rellenarCuadrado(context, posX, posY) {
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(posX, posY, 10, 10);
    
  }
  
  function dibujarCulebra(context, culebra) {
    for (var i = 0; i < culebra.length; i++) {
      rellenarCuadrado(context, culebra[i].posX, culebra[i].posY);
    }
  }
  
  function dibujarComida(context, comida) {
    rellenarCuadrado(context, comida.posX, comida.posY);
    
  }
  
  function dibujarParedes(context) {
    context.beginPath();
    context.lineWidth = "5";
    context.rect(15, 15, 560, 560);
    context.stroke();
  }
  
  function dibujarTexto(context, texto, x, y) {
    context.font = "50px verdanda";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(texto, x, y);
  }
  
 
  
  function moverCulebra(direccion, culebra) {
    var cabezaPosX = culebra[0].posX;
    let cabezaPosY = culebra[0].posY;
  
    if (direccion === DIRECCIONES.DERECHA) {
      cabezaPosX += 20;
    } else if (direccion === DIRECCIONES.IZQUIERDA) {
      cabezaPosX -= 20;
    } else if (direccion === DIRECCIONES.ABAJO) {
      cabezaPosY += 20;
    } else if (direccion === DIRECCIONES.ARRIBA) {
      cabezaPosY -= 20;
    }
  
    
    culebra.unshift({ posX: cabezaPosX, posY: cabezaPosY });
    
    return culebra.pop(); 
  }
  
  function culebraComioComida(culebra, comida) {
    return culebra[0].posX === comida.posX && culebra[0].posY === comida.posY;
  }
  
  /** ojo **/
  
  function generarNuevaPosicionDeComida(culebra) {
    while (true) {
      
      var columnaX = Math.max(Math.floor(Math.random() * 29), 1);
      var columnaY = Math.max(Math.floor(Math.random() * 29), 1);
  
      var posX = columnaX * 20;
      var posY = columnaY * 20;
  
      var colisionConCulebra = false;
      for (var i = 0; i < culebra.length; i++) {
        if (culebra[i].posX === posX && culebra[i].posY === posY) {
          colisionConCulebra = true;
          break;
        }
      }
  
      if (colisionConCulebra === true) {
        continue;
      }
  
      return { posX: posX, posY: posY };
    }
  }

  
  function ocurrioColision(culebra) {
    var cabeza = culebra[0];
  
    if (
      cabeza.posX < 20 ||
      cabeza.posY < 20 ||
      cabeza.posX >= 580 ||
      cabeza.posY >= 580
    ) {
      return true;
    }
  
    if (culebra.length === 1) {
      return false;
    }
  
    for (let i = 1; i < culebra.length; i++) {
      if (cabeza.posX === culebra[i].posX && cabeza.posY === culebra[i].posY) {
        return true;
      }
    }
  
    return false;
  }
  
  
    
  
  document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowUp" && direccionActual !== DIRECCIONES.ABAJO) {
      nuevaDireccion = DIRECCIONES.ARRIBA;
    } else if (e.code === "ArrowDown" && direccionActual !== DIRECCIONES.ARRIBA) {
      nuevaDireccion = DIRECCIONES.ABAJO;
    } else if (
      e.code === "ArrowLeft" &&
      direccionActual !== DIRECCIONES.DERECHA
    ) {
      nuevaDireccion = DIRECCIONES.IZQUIERDA;
    } else if (
      e.code === "ArrowRight" &&
      direccionActual !== DIRECCIONES.IZQUIERDA
    ) {
      nuevaDireccion = DIRECCIONES.DERECHA;
    }
  });
  
  function cicloDeJuego() {
    let colaDescartada = moverCulebra(nuevaDireccion, culebra);
    direccionActual = nuevaDireccion;
  
    if (culebraComioComida(culebra, comida)) {
      culebra.push(colaDescartada);
      comida = generarNuevaPosicionDeComida(culebra);
      
    }
  
    if (ocurrioColision(culebra)) {
      gameOver();
      return;
    }
  
    CTX.clearRect(0, 0, 600, 600);
    dibujarParedes(CTX);
    dibujarCulebra(CTX, culebra);
    dibujarComida(CTX, comida);
  }
  
  function gameOver() {
    clearInterval(ciclo);
    ciclo = undefined;
    dibujarTexto(CTX, "Click para volver a jugar", 300, 310);
    
  }
  
  function empezarJuego() {
    culebra = [
      { posX: 60, posY: 500 },
      { posX: 40, posY: 500 },
      { posX: 20, posY: 500 },
    ];
  
    direccionActual = DIRECCIONES.DERECHA;
    nuevaDireccion = DIRECCIONES.DERECHA;
  
    comida = generarNuevaPosicionDeComida(culebra);
   
  
    ciclo = setInterval(cicloDeJuego, FPS);
  }
  
  
  dibujarTexto(CTX, "Click para jugar", 300, 260);
  dibujarTexto(CTX, "ツ", 300, 330);
  dibujarTexto(CTX, "", 300, 300);
  
  
  JUEGO.addEventListener("click", function () {
    if (ciclo === undefined) {
      empezarJuego();
      ;
    }
  }
  );
  