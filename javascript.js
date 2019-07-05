function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      alert('No ha seleccionado ningun archivo plano');
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
      mostrarDatos(lector);
      //mostrarContenido(prueba,'contenido-archivo');
    };
    lector.readAsText(archivo);
  }
  
  function mostrarContenido(contenido,nombre) {
    var elemento = document.getElementById(nombre);
    elemento.innerHTML = contenido;
  }

  function mostrarDatos(data) {
    var archivo = data.result.split(/\r?\n|\r/);
    var saltos = new Array(archivo.length-1);
    var tiempos= new Array(archivo.length-1);
    var organizaciones= new Array(archivo.length-1);
    var ips= new Array(archivo.length-1);
    var i=-1;
    var tabla = '<table>';
    for (var fila = 0; fila < archivo.length; fila++) {
      if (fila === 0) {
        tabla += '<thead>';
        tabla += '<tr>';
      } else {
        tabla += '<tr>';
      }
      var datos = archivo[fila].split(',');
      for (var dato = 0; dato < datos.length; dato++) {
        if (fila === 0) {
          tabla += '<th>';
          tabla += datos[dato];
          tabla += '</th>';
        } else {
          tabla += '<td>';
          tabla += datos[dato];
          tabla += '</td>';
          if(dato===0)
            saltos[i]=datos[dato];
          else{
            if(dato===1)
              tiempos[i]=datos[dato];
            else{
              if(dato===2)
                organizaciones[i]=datos[dato];
              else
                ips[i]=datos[dato];
            }
          }
        }
      }
      i++;
      if (fila === 0) {
        tabla += '</tr>';
        tabla += '</thead>';
        tabla += '<tbody>';
      } else {
        tabla += '</tr>';
      }
    } 
    tabla += '</tbody>';
    tabla += '</table>';
    mostrarContenido(tabla,'tabla')
    console.log(saltos)
//    console.log(saltos.length)
    console.log(organizaciones)
//    console.log(organizaciones.length)
    console.log(tiempos)
//    console.log(tiempos.length)
    console.log(ips)
//    console.log(ips.length)
  }
  
  document.getElementById('file-input').addEventListener('change', leerArchivo, false);