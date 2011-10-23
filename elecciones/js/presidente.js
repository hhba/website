            var query = function(sql, cb) {
                url = 'http://www.google.com/fusiontables/api/query?sql=';
                var url = url + encodeURIComponent(sql) + '&jsonCallback=?';
                $.getJSON(url).success(cb);
            }

            function completarPresidente(id, class_field, content_field, cargo) {
                    function getTotales(res) {
                            var total=0;
                            for (var i=0; i < res.table.rows.length; i++)
                                    total+= parseInt(res.table.rows[i][1]);

                            return total;
                    }

                    function getPercentage(res, total) {
                            var dictPerc = {};
                            for (var i=0; i < res.table.rows.length; i++)
                                    dictPerc[res.table.rows[i][0]] = (100 * parseInt(res.table.rows[i][1]) /  total).toFixed(2);

                            return dictPerc;
                    }

                    function sort_hash(hash){
                        var k;
                        var unsorted = [];
                        for (k in hash) {
                            unsorted.push([k,hash[k]])
                        }
                        var sorted = unsorted.sort(function(a,b){return parseFloat(a[1]) - parseFloat(b[1]);})
                            return sorted
                    }
                    function cb(res) {
                            var total = getTotales(res),
                                perc = getPercentage(res, total);
                            for (key in perc) { 
                                $("."+cargo+" .lista-"+Number(key)).html(perc[key] + " %" );
                            }
                            $(document).trigger('onReadyDatosPresidente',{total: total, pct: sort_hash(perc).reverse()}); //Terminamos de traer los datos de la Fusion del Presidente
                    }
                    var sql = 'select '+ class_field +',  sum('+content_field+') as votos from '+id+' group by ' + class_field;
                    query(sql, cb);
            }

            function completarLegislativo(cargo, getData) {
                var datos_provincias = getData()
                datosDict = {};

                for (provincia in datos_provincias) {
                        var partidos = datos_provincias[provincia];
                        for (partido in partidos) {
                            datosDict[partido] = (typeof(datosDict[partido]) == 'undefined') ? partidos[partido] : datosDict[partido] + partidos[partido];
                        }
                }


                for (key in datosDict) { 
                        $("."+cargo+" .lista-"+Number(key)).html(String(datosDict[key]));
                }

            }
            $(document).ready(function() {
                completarPresidente(1930850, 'cod_agrupacion', 'votos_agrupacion', 'presidente'); //Presidentes
                setTimeout(function() {$(document).trigger('onReadyDatosLegislativo')}, 5000); //Triggereo el evento (prueba del evento de Oscar, lo llamaria el al traer de la DB los datos del legislativo)
            });
            $(document).bind('datosDiputadosCargados', function() {
                    completarLegislativo('diputados', dameTablaDhontDiputados);
            });
            $(document).bind('datosSenadoresCargados', function() {
                    completarLegislativo('senadores', dameTablaSenadores);
            });
            //completarListasPorc(1930116, 'cod_agrupacion', 'votos_agrupacion', 'diputados'); //Diputados
            //completarListasPorc(1930850, 'cod_agrupacion', 'votos_agrupacion', 'presidente'); //Presidentes
            //var sql = "select 'cod_agrupacion' as id', average('votos_agrupacion_pct') as 'count' from 1870721 group by 'cod_agrupacion' order by average('votos_agrupacion_pct') desc";
            /*var sql = "select * from 1870721";
            var query = 'http://www.google.com/fusiontables/api/query?sql=' + encodeURIComponent(sql) + '&jsonCallback=?';
            alert(query)Legislativo     $.getJSON(query).success(function(res) {
                    console.log(res.table);
            });*/

