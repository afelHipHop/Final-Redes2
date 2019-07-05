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

  var fils = new Array(archivo.length - 1);

  var xaxis = new Array(archivo.length - 1);
  var yaxis = new Array(archivo.length - 1);
  var ips = new Array(archivo.length - 1);

  xaxis[0] = 0;
  yaxis[0] = 0;
  ips[0] = 'localhost';

  for (var i = 1; i < archivo.length; i++) {
    fils[i] = archivo[i].split(",");
    
    if(fils[i][1] == '*'){
      xaxis[i] = xaxis[i - 1];
      yaxis[i] = yaxis[i - 1];
      ips[i] = '*';
    }
    else{
      xaxis[i] = (parseInt(fils[i][1]) + parseInt(fils[i][2]) + parseInt(fils[i][3])) / 3 + xaxis[i - 1];
      yaxis[i] = (parseInt(fils[i][5]));
      ips[i] = fils[i][5];
    }
  }

  var trace1 = {
    x: xaxis,
    y: yaxis,
    mode: 'lines+markers+text',
    type: 'scatter',
    name: 'Team A',
    text: ips,
    marker: {
      color: 'rgb(60, 220, 235)',
      size: 60,
      line: {
        color: 'rgb(40, 190, 190)',
        width: 2
      }
    }
  };

  var layout = {
    
    xaxis: {

      zeroline: false,
      autorange: true
    },
    yaxis: {

      visible:false,
      autorange: true

    },
    title:'Gráfico nodos'
  };

  var data = [trace1];

  Plotly.newPlot('nodos', data, layout);
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);