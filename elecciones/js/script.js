window.onload = function() {

  var options = {
    zoom: 4,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    // maxZoom: 16,
    // minZoom: 5,
    // mapTypeId: 'ubime',
    mapTypeId: 'roadmap',
    zoomControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    center: new google.maps.LatLng(-38.416097, -63.616672)
  };

  var map = new google.maps.Map(document.getElementById('map-container'), options);

  map.mapTypes.set('plain', new google.maps.StyledMapType([
    { featureType: "landscape", stylers: [ { visibility: "off" } ] },
    { featureType: "road", stylers: [ { visibility: "off" } ] },
    { featureType: "water", stylers: [ { visibility: "on" }, { lightness: 100 }] },
    { featureType: "transit", stylers: [ { visibility: "off" } ] },
    { featureType: "administrative", elementType: "labels", stylers: [ { visibility: "off" } ] },
    { featureType: "landscape", stylers: [ { visibility: "off" } ] },
    { featureType: "landscape.natural", stylers: [ { visibility: "off" } ] },
    { featureType: "administrative.country", stylers: [ { lightness: 99 }, { visibility: "off" } ] }
  ]));

  map.setMapTypeId('plain');

  new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    map: map,
    query: {
      select: 'KML',
      from: 1932698
    }
  });

};

var cargosDiputados = [
  [35, "02"],
  [12, "01"],
  [10, "21"],
  [9, "04"],
  [5, "13"],
  [5, "23"],
  [4, "05"],
  [4, "08"],
  [4, "14"],
  [4, "17"],
  [4, "22"],
  [2, "03"],
  [2, "11"],
  [2, "15"],
  [2, "19"],
  [2, "20"],
  [3, "06"],
  [3, "07"],
  [3, "09"],
  [3, "10"],
  [3, "12"],
  [3, "16"],
  [3, "18"],
  [3, "24"]
]

var provincias = {
  "01": "CABA",
  "02": "Buenos Aires",
  "03": "Catamarca",
  "04": "Córdoba",
  "05": "Corrientes",
  "06": "Chaco",
  "07": "Chubut",
  "08": "Entre Ríos",
  "09": "Formosa",
  "10": "Jujuy",
  "11": "La Pampa",
  "12": "La Rioja",
  "13": "Mendoza",
  "14": "Misiones",
  "15": "Neuquén",
  "16": "Río Negro",
  "17": "Salta",
  "18": "San Juan",
  "19": "San Luis",
  "20": "Santa Cruz",
  "21": "Santa Fe",
  "22": "S. del Estero",
  "23": "Tucumán",
  "24": "Tierra del Fuego"
}


function fillSenadoresPercent(totalHeight){
  // totalHeight es del chart
  var verticalChart = {};

  $.each(dameTablaSenadores(), function(provincia, partidos){
    $.each(partidos, function(partido, bancas){
      if (!(partido in verticalChart))
        verticalChart[partido] = bancas;
      else
        verticalChart[partido] += bancas;
    });

  });

  var prefix = "senador-";
  var percent;
  $.each(verticalChart, function(partido, banca){
    percent = Math.round(banca * (100/24)); // 24 bancas en total (las nuevas)
    var element = '#' + prefix + partido;
    $(element).attr("data-percent", percent);
    $(element).css("height", percent * (100/totalHeight) + "%");
  })
}

function fillBancas(prefix,tabla){
  // el prefix es del id del contenedor de bancas (a pintar)
  $.each(tabla, function(provincia, partidos){
    var i = 0; //posicion del cuadradito a pintar
    var bancaId = '#' + prefix +"-"+ provincia;
    var elementos = $(bancaId + " > *");

    $.each(partidos, function(partido, bancas){
      for(var j=0; j < bancas; j++, i++){
        // iteracion por cada banca de un partido
        $(elementos[i]).attr("data-partido", partido).addClass("lista-" + partido);
      }
    });

  });
}

$(document).ready(function(){
  var $senadores = $('#senadores-chart');

  $.each(tablas.listas, function(key) {
    $senadores.append('<div id="senador-' + key + '" class="lista-' + key + '"> </div>');
  });

  var $ul = $('.diputados-bancas ul');

  $.each(cargosDiputados, function() {
    var id = 'bancas-diputados-' + this[1];

    var $target = $("<li><span>" + provincias[this[1]] + "</span><div id='" + id + "'></div></li>")
      .appendTo($ul)
      .find('#' + id);

    for (var i = 0; i < this[0]; i++) {
      $target.append('<div />');
    }
  });

  $(document).bind("datosSenadoresCargados",function(){
      fillSenadoresPercent(50);
      fillBancas("bancas-senadores",dameTablaSenadores());
    }
  )
  $(document).bind("datosDiputadosCargados",function(){
      fillBancas("bancas-diputados",dameTablaDhontDiputados());
  })

});
