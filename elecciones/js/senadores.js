		var tablaSenadores = {};

		function dameTablaSenadores() {
			return tablaSenadores;
		}

		function cargarDatosSenadores() {
			var sql="SELECT INDRAProv, cod_agrupacion, votos_agrupacion FROM 1932455 ORDER BY INDRAProv";
			var url = 'http://www.google.com/fusiontables/api/query?sql=';
			url = url + encodeURIComponent(sql) + '&jsonCallback=?';
			$.getJSON(url).success(callbackCargarDatosSenadores);
			setTimeout("cargarDatosSenadores()", 300000);
		}				
		
		setTimeout("cargarDatosSenadores()", 500);		

		function callbackCargarDatosSenadores(response) { 
			console.log(response.table);

			var rows = response.table.rows;
			rows.splice(0,1);
			var numRows = rows.length;
			var i = 0;
			while (i<numRows) {
				var row = rows[i];
				var codigoDistrito = row[0];
				var votosDistrito = {};
				while (i<numRows && (codigoDistrito == row[0])) {
					var codigoAgrupacion = formatString(row[1],4);
					votosDistrito[codigoAgrupacion] = row[2];
					i++;
					row = rows[i];
				}
				var codigoDistritoString = formatString(codigoDistrito,2);
				tablaSenadores[codigoDistritoString] = armarDatosSenadoresDistrito(votosDistrito, 3);
			}			
			
			console.log(tablaSenadores);
			$(document).trigger("datosSenadoresCargados");
		}
		
		/*
		 * Devuelve. Map. key = codigoAgrupacion. value=cant senadores que mete
		 * Recibe 
		 * votosDistrito. Map. key = codigoAgrupacion. value=votosPositivos
		 * numescs. cantidad de senadores totales a repartir
		 */
		function armarDatosSenadoresDistrito(votosDistrito, numescs) {
				var numpartidos=votosDistrito.lenght;
							
				//Map. key = codigoAgrupacion. value=cant senadores que mete
				var esc={}; 
											
				var codigoAgrupacionPrimera = "";
				var codigoAgrupacionSegunda = "";
				var cantidadVotosAgrupacionPrimera = 0;
				var cantidadVotosAgrupacionSegunda = 0;

				for (codigoAgrupacion in votosDistrito) {
					if (votosDistrito[codigoAgrupacion] > cantidadVotosAgrupacionPrimera) {
						cantidadVotosAgrupacionSegunda = cantidadVotosAgrupacionPrimera;
						codigoAgrupacionSegunda = codigoAgrupacionPrimera;
						cantidadVotosAgrupacionPrimera = votosDistrito[codigoAgrupacion];
						codigoAgrupacionPrimera = codigoAgrupacion;						
					} else if (votosDistrito[codigoAgrupacion] > cantidadVotosAgrupacionSegunda) {
						cantidadVotosAgrupacionSegunda = votosDistrito[codigoAgrupacion];
						codigoAgrupacionSegunda = codigoAgrupacion;						
					}
				}
					
				esc[codigoAgrupacionPrimera]=2;
				esc[codigoAgrupacionSegunda]=1;
								
				return esc;
			
		}
			

		
		function formatString(number, digits){
			var numberString = number.toString();
			var originalNumberDigits = numberString.length;
			var numberOfMissingZeros = digits - originalNumberDigits;
			for (var i=0; i<numberOfMissingZeros; i++) {
				numberString = '0' + numberString;
			}
			return numberString;
		}
