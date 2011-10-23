$(function() {

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

});

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

var process = function (listas, series) {
var x = 0,
    $container = $('#tendencia-chart'),
    r = Raphael($container.attr('id'), $container.innerWidth(), $container.innerHeight()),
    labels = {},
    textattr = {stroke: "none", fill: "#000"},
    pathes = {};

function finishes() {
    for (var i in listas) {
        var start, end;
        for (var j = series.length - 1; j >= 0; j--) {
            var isin = false;
            for (var k = 0, kk = series[j].i.length; k < kk; k++) {
                isin = isin || (series[j].i[k][0] == i);
            }
            if (isin) {
                end = j;
                break;
            }
        }
        for (var j = 0, jj = series.length; j < jj; j++) {
            var isin = false;
            for (var k = 0, kk = series[j].i.length; k < kk; k++) {
                isin = isin || (series[j].i[k][0] == i);
            };
            if (isin) {
                start = j;
                break;
            }
        }
        for (var j = start, jj = end; j < jj; j++) {
            var isin = false;
            for (var k = 0, kk = series[j].i.length; k < kk; k++) {
                isin = isin || (series[j].i[k][0] == i);
            }
            if (!isin) {
                series[j].i.push([i, 0]);
            }
        }
    }
}

function block() {
    var p, h;
    finishes();
    for (var j = 0, jj = series.length; j < jj; j++) {
        var users = series[j].i;
        h = 0;
        for (var i = 0, ii = users.length; i < ii; i++) {
            p = pathes[users[i][0]];
            if (!p) {
                p = pathes[users[i][0]] = {f:[], b:[], c:null};
            }
            p.f.push([x, h, parseInt(users[i][1] * 100) + '%']);
            var hh = Math.round((r.height - 15 - users.length * 2) * users[i][1]);
            p.b.unshift([x, h += hh]);
            p.c = listas[users[i][0]].color;
            // h += 2;
            h += 1;
        }
        var dtext = series[j].d;
        r.text(x + 25, h + 10, dtext).attr({stroke: "none", fill: "#aaa"});
        x += 100;
    }
    var c = 0;
    for (var i in pathes) {
        labels[i] = r.set();
        var clr = pathes[i].c;
        pathes[i].p = r.path().attr({fill: clr, stroke: clr});
        var path = "M".concat(pathes[i].f[0][0], ",", pathes[i].f[0][1], "L", pathes[i].f[0][0] + 50, ",", pathes[i].f[0][1]);
        var th = Math.round(pathes[i].f[0][1] + (pathes[i].b[pathes[i].b.length - 1][1] - pathes[i].f[0][1]) / 2);
        labels[i].push(r.text(pathes[i].f[0][0] + 25, th, pathes[i].f[0][2]).attr(textattr));
        var X = pathes[i].f[0][0] + 50,
            Y = pathes[i].f[0][1];
        for (var j = 1, jj = pathes[i].f.length; j < jj; j++) {
            path = path.concat("C", X + 20, ",", Y, ",");
            X = pathes[i].f[j][0];
            Y = pathes[i].f[j][1];
            path = path.concat(X - 20, ",", Y, ",", X, ",", Y, "L", X += 50, ",", Y);
            th = Math.round(Y + (pathes[i].b[pathes[i].b.length - 1 - j][1] - Y) / 2);
            if (th - 6 > Y) {
                labels[i].push(r.text(X - 25, th, pathes[i].f[j][2]).attr(textattr));
            }
        }
        path = path.concat("L", pathes[i].b[0][0] + 50, ",", pathes[i].b[0][1], ",", pathes[i].b[0][0], ",", pathes[i].b[0][1]);
        for (var j = 1, jj = pathes[i].b.length; j < jj; j++) {
            path = path.concat("C", pathes[i].b[j][0] + 70, ",", pathes[i].b[j - 1][1], ",", pathes[i].b[j][0] + 70, ",", pathes[i].b[j][1], ",", pathes[i].b[j][0] + 50, ",", pathes[i].b[j][1], "L", pathes[i].b[j][0], ",", pathes[i].b[j][1]);
        }
        pathes[i].p.attr({path: path + "z"});
        labels[i].hide();
        var current = null;
        (function (i) {
            pathes[i].p.mouseover(function () {
                if (current != null) {
                    labels[current].hide();
                }
                current = i;
                labels[i].show();
                pathes[i].p.toFront();
                labels[i].toFront();
            });
        })(i);
    }
}
block();
};

$(function () {
  var series = [];

  query("select 'fecha_carga', 'cod_agrupacion', 'votos_pct' from 1932057", function(res) {
    var rows = res.table.rows;
    var last_fecha_carga;
    var bucket;

    for (var j = 0; j < rows.length; j++) {
      var row = rows[j];

      if (last_fecha_carga != row[0]) {
        bucket = {d: row[0].match(/ \d{2}:\d{2}/), i: []};
        series.push(bucket);
      }

      bucket.i.push([row[1], row[2] / 100]);

      last_fecha_carga = row[0];
    }

    process(tablas.listas, series);
  });
});
