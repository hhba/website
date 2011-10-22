		var tablaDont_old = {
			'codigoCiudadBuenosAires': {
				'codigoFrenteParaVictoria' : 5,
				'codigoUnionparaElDesarrolloSocial' : 3,
				'codigoListaRodriguezSaa' : 2
			}
			,
			'codigoSanLuis': {
				'codigoListaRodriguezSaa' : 9,
				'codigoFrenteParaVictoria' : 5,
				'codigoUnionparaElDesarrolloSocial' : 3
			}
    }

// este es un mock  para el mapa que es input.
		var tablaDont = {
			5: {
				'codigoFrenteParaVictoria' : 5,
				'codigoUnionparaElDesarrolloSocial' : 3,
				'codigoListaRodriguezSaa' : 2
			}
			,
			6: {
				'codigoListaRodriguezSaa' : 9,
				'codigoFrenteParaVictoria' : 5,
				'codigoUnionparaElDesarrolloSocial' : 3
			}
    }

// mock de resultado esperado
 var bancoPorProvincia = 
[
	{
		provincia : [1, "Ciudad Autónoma Bs.As."],
		primerPuesto : [1, "Mvto. de Int. y Desarroll", "Movimiento de Integración y Desarrollo", "0132"],
		segundoPuesto : [50, "Partido Socialista", "Partido Socialista", "0134"]
		
	}
]
// mock 
var codigoProvincia = {
	5 : 'neuquen',
	6 : 'rio negro'
}
//mock
var codigoPartido = {
	1 : 'FPV',
	2 : 'Ricardo Alfonsin'
}

var codigoProvinciaJSON = null;
var codigoPartidoJSON = null


	function senadoresProvincia() {
		console.log(codigoProvinciaJSON['rows']);
		console.log(codigoPartidoJSON["rows"]);
		
		var codigoProvincias  = codigoProvinciaJSON['rows'];
		var codigoPartido = codigoPartidoJSON["rows"];
		
		for (cprovincias in codigoProvincias){
			
		}
		
		
		for (var codprov in tablaDont) {
		    console.log(codigoProvincia[codprov])
			
			var partidos = tablaDont[codprov];
			for (var p in partidos) {
				var codpartido = partidos[p];
			    console.log(codigoPartido[codpartido])
			}
		
		}

		
	}
	
	
	function findCodigoPartido2(resTableCodigoPartido) {
		codigoPartidoJSON = resTableCodigoPartido.table;
		senadoresProvincia();
	}
	
	function findCodigoProvincia1(restableCodigoProvincia) { 
    	codigoProvinciaJSON = restableCodigoProvincia.table;

		var sql="SELECT * FROM 1882588";
		      var url = 'http://www.google.com/fusiontables/api/query?sql=';
		      url = url + encodeURIComponent(sql) + '&jsonCallback=?';
		      $.getJSON(url).success(findCodigoPartido2);

   }
	
	
	function mainSenadores(){

			var sql="SELECT * FROM 1930648";
			      var url = 'http://www.google.com/fusiontables/api/query?sql=';
			      url = url + encodeURIComponent(sql) + '&jsonCallback=?';
			      $.getJSON(url).success(findCodigoProvincia1);
	}
	
	

