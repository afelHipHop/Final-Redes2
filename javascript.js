function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      alert('No ha seleccionado ningun archivo plano');
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      var prueba = lector.result.split(/,|\r\n/);
      successFunction(lector);
      console.log(prueba);
      //mostrarContenido(prueba,'contenido-archivo');
    };
    lector.readAsText(archivo);
  }
  
  function mostrarContenido(contenido,nombre) {
    var elemento = document.getElementById(nombre);
    elemento.innerHTML = contenido;
  }

  function successFunction(data) {
    var allRows = data.result.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      if (singleRow === 0||singleRow===1) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }
      var rowCells = allRows[singleRow].split(',');
      for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
        if (singleRow === 0||singleRow===1) {
          table += '<th>';
          table += rowCells[rowCell];
          table += '</th>';
        } else {
          table += '<td>';
          table += rowCells[rowCell];
          table += '</td>';
        }
      }
      if (singleRow === 0||singleRow===1) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    } 
    table += '</tbody>';
    table += '</table>';
    mostrarContenido(table,'tabla')
  }
  
  document.getElementById('file-input').addEventListener('change', leerArchivo, false);