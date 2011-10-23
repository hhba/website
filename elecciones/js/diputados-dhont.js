
		var tablaDhontDiputados = {};

		function dameTablaDhontDiputados() {
			return tablaDhontDiputados;
		}

		function cargarDatosDiputados() {
			//var sql="SELECT * FROM 1930633";
			var sql="SELECT INDRAProv, cod_agrupacion, votos_agrupacion FROM 1931033 ORDER BY INDRAProv";
			var url = 'http://www.google.com/fusiontables/api/query?sql=';
			url = url + encodeURIComponent(sql) + '&jsonCallback=?';
			$.getJSON(url).success(callbackCargarDatosDiputados);
    	setTimeout("cargarDatosDiputados()", 300000);
		}

		setTimeout("cargarDatosDiputados()", 500);

		function callbackCargarDatosDiputados(response) {
			// console.log(response.table);

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
				tablaDhontDiputados[codigoDistritoString] = armarDhontDistrito(votosDistrito, cantidadDiputadosPorDistrito(codigoDistritoString));
			}

			// console.log(tablaDhontDiputados);
			$(document).trigger("datosDiputadosCargados");
		}

		/*
		 * Devuelve. Map. key = codigoAgrupacion. value=cant diputados que mete
		 * Recibe
		 * votosDistrito. Map. key = codigoAgrupacion. value=votosPositivos
		 * numescs. cantidad de diputados totales a repartir
		 */

    function armarDhontDistrito(votosDistrito, numescs) {
                var numpartidos=votosDistrito.lenght;

                //Map. key = codigoAgrupacion. value=cant diputados que mete
                var esc={};


                for (codigoAgrupacion in votosDistrito) {
                    esc[codigoAgrupacion]=0;
                }

                var totalVotosPositivos = 0;
                for (codigoAgrupacion in votosDistrito) {
                    totalVotosPositivos = totalVotosPositivos + votosDistrito[codigoAgrupacion];
                }

                for (var ct=0; ct<numescs; ct++) {
                    var codigoAgrupacionMax=0;
                    var cantVotosMax=0;

                    for (codigoAgrupacion in votosDistrito) {
                            if( cantVotosMax<(votosDistrito[codigoAgrupacion]/(esc[codigoAgrupacion]+1)) &&
                                    votosDistrito[codigoAgrupacion]> totalVotosPositivos*0.04 ) {
                                    cantVotosMax=votosDistrito[codigoAgrupacion]/(esc[codigoAgrupacion]+1);
                                    codigoAgrupacionMax=codigoAgrupacion;
                            }
                    }
                    esc[codigoAgrupacionMax]++;

                }

                return esc;

        }


		function cantidadDiputadosPorDistrito(codigoDistrito) {
			var mapa = {
				"01":12,
				"02":35,
				"03":2,
				"04":9,
				"05":4,
				"06":3,
				"07":3,
				"08":4,
				"09":3,
				"10":3,
				"11":2,
				"12":3,
				"13":5,
				"14":4,
				"15":2,
				"16":3,
				"17":4,
				"18":3,
				"19":2,
				"20":2,
				"21":10,
				"22":4,
				"23":5,
				"24":3
			}
			return mapa[codigoDistrito];

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
