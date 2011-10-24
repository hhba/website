
    var listas_senadores_listas_presidente = {"0002":"0000","0003":"0137","0005":"0132","0008":"0000","0012":"0000","0014":"0135","0022":"0131","0023":"0132","0036":"0132","0038":"0000","0040":"0134","0047":"0047","0050":"0134","0055":"0000","0060":"0000","0061":"0135","0063":"0133","0068":"0000","0069":"0134","0091":"0000","0092":"0000","0131":"0131","0132":"0132","0133":"0133","0134":"0134","0135":"0135","0137":"0137","0150":"0131","0151":"0132","0152":"0137","0153":"0000","0154":"0000","0156":"0132","0157":"0133","0158":"0133","0160":"0131","0166":"0000","0168":"0047","0174":"0000","0176":"0132","0177":"0047","0178":"0132","0180":"0000","0181":"0132","0182":"0000","0183":"0132","0184":"0000","0185":"0132","0186":"0047","0187":"0000","0188":"0131","0211":"0135","0220":"0000","0221":"0000","0222":"0000","0223":"0000","0224":"0000","0225":"0000","0226":"0000","0227":"0000","0228":"0000","0229":"0000","0230":"0000","0231":"0000","0232":"0000","0233":"0000","0234":"0000","0235":"0000","0236":"0000","0237":"0000","0238":"0000","0239":"0000","0240":"0000","0241":"0000","0242":"0000","0243":"0000","0244":"0000","0245":"0000","0246":"0000","0247":"0000","0248":"0000","0249":"0000","0250":"0000","0251":"0000","0252":"0000","0253":"0000","0254":"0000","0255":"0000","0256":"0000","0257":"0000","0258":"0000","0259":"0000","0260":"0000","0261":"0000","0266":"0000","0302":"0137","0601":"0133","0602":"0000","0603":"0131","0604":"0132","0605":"0000","0606":"0132","0607":"0131","0608":"0134","0609":"0137","0610":"0131","0611":"0137","0612":"0000","0613":"0131","0614":"0000","0615":"0131","0616":"0000","0617":"0137","0618":"0137","0619":"0132","0620":"0132","0621":"0133","0622":"0000","0623":"0047","0624":"0000","0625":"0135","0626":"0131","0632":null,"0641":null,"0701":null,"0702":"0131","0703":null,"0704":null,"0705":null,"0706":null,"0707":null,"0708":null,"0709":null,"0710":null,"0711":null,"0712":null,"0713":null,"0714":null,"0715":null,"0717":null,"0718":null,"0719":null,"0720":null,"0722":null,"0723":null,"0801":null,"0802":null,"0803":null,"0804":null,"1001":null,"1002":null,"1003":null,"1004":null,"1005":null,"1006":null,"1007":null,"1008":null,"1009":null,"1010":null,"1011":null,"1012":null,"1013":null,"1014":null,"1015":null,"1016":null,"1017":null,"1018":null,"1019":null,"1020":null,"1021":null,"1022":null,"1023":null,"1024":null,"1025":null,"1026":null,"1027":null,"1028":null,"1029":null,"1030":null,"1031":null,"1032":null,"1033":null,"1034":null,"1035":null,"1036":null,"1037":null,"1038":null,"1039":null,"1040":null,"1041":null,"1042":null,"1043":null,"1044":null,"1045":null,"1046":null,"1047":null,"1048":null,"1049":null,"1050":null,"1051":null,"1052":null,"1053":null,"1054":null,"1055":null,"1056":null,"1057":null,"1058":null,"1059":null,"1060":null,"1061":null,"1062":null,"1063":null,"1064":null,"1065":null,"1066":null,"1067":null,"1068":null,"1069":null,"1070":null,"1071":null,"1072":null,"1073":null,"1074":null,"1075":null,"1076":null,"1077":null,"1078":null,"1079":null,"1080":null,"1081":null,"1082":null,"1083":null,"1084":null,"1085":null,"1086":null,"1087":null,"1088":null,"1089":null,"1090":null,"1091":null,"1092":null,"1093":null,"1094":null,"1095":null,"1096":null,"1097":null,"1098":null,"1099":null,"1100":null,"1101":null,"1102":null,"1103":null,"1104":null,"1105":null,"1106":null,"1107":null,"1108":null,"1109":null,"1110":null,"1111":null,"1112":null,"1113":null,"1114":null,"1115":null,"1116":null,"1117":null,"1118":null,"1119":null,"1120":null,"1121":null,"1122":null,"1123":null,"1124":null,"1125":null,"1126":null,"1127":null,"1128":null,"1129":null,"1130":null,"1131":null,"1132":null,"1133":null,"1134":null,"1135":null,"1136":null,"1137":null,"1138":null,"1139":null,"1140":null,"0955":"0132","9997":"0000"}

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
    map: map,
    query: {
      select: 'KML',
      from: 1941867
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
        var partido_presidente = listas_senadores_listas_presidente[partido] 
        $(elementos[i]).attr("data-partido", partido).addClass("lista-" + partido_presidente);
      }
    });

  });
  $(document).trigger("updated")
}

$(document).ready(function(){
/*    
  var $senadores = $('#senadores-chart');

  $.each(tablas.listas, function(key) {
    $senadores.append('<div id="senador-' + key + '" class="lista-' + key + '"> </div>');
  });
*/
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

function set_tooltips_from_class(){
  $('[class*="lista-"]').each(function(n,el){
    var lista=el.className.split(" ").filter(function(e){ return e.indexOf("lista-") == 0 })[0]
    if(lista){
        $(el).attr("title","Aca debería haber un buen tooltip para la :"+lista);
    }
  })

}
$(document).bind("updated",set_tooltips_from_class)

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
/*
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
*/
