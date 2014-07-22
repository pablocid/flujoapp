'use strict';

flujoApp.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://flujogenicoback.dev:8081');
	//RestangularProvider.setDefaultHeaders({'X-Auth-Token': window.sessionStorage.token});
	RestangularProvider.setDefaultHttpFields({ withCredentials: true , cache: true});

	RestangularProvider.setErrorInterceptor(
        function(response) {
            if (response.status == 401) {
                console.log("Login required... ");
                window.location.href='/#/login';
            } else if (response.status == 404) {
                console.log("Resource not available...");
            } else {
                console.log("Response received with HTTP error code: " + response.status );
            }
            return false; // stop the promise chain
     });
});	

flujoApp.factory('RelacionSpService',function(Restangular){
    return Restangular.all('query');
});


flujoApp.factory('DescripcionService',function(){

    return function(sp){

 var descripcion =  sp.taxa;
    
 if(sp.nombre_comun_es.length > 0 && sp.nombre_comun_es[0].name){ descripcion += ' (nombre común: '+ sp.nombre_comun_es[0].name + ')'; }
    
 descripcion +=' pertenece a la familia '+ sp.familia.nombre.name;

 if(sp.type==1){
//tipo origen
if(sp.Cnati==1 && sp.Cen==1)     { descripcion +=' y corresponde a una especie nativa y endémica de Chile. ' }
else if(sp.Cen==1)                   { descripcion +=' y corresponde a una especie de origen endémica en Chile. ' }
else if(sp.Cnati==1)             { descripcion +=' y corresponde a una especie nativa de Chile. ' }
else if(sp.Cin ==1 && sp.Cnatu ==1)  { descripcion +=' y corresponde a una especie introducida y naturalizada en Chile. '}
else if(sp.Cin ==1)                  { descripcion +=' y corresponde a una especie introducida en Chile. '}
else if(sp.Cnatu ==1)                { descripcion +=' y corresponde a una especie naturalizada en Chile. '}
else                                 { descripcion +='.'}

//ciclo de vida
if(sp.Can==1 && sp.Cbi==1 &&  sp.Cbu==1){descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual y bianual'}
else if(sp.Can==1 && sp.Cbi==1)      {descripcion +='Respecto a su biología, presenta un ciclo de vida anual y bianual'}
else if(sp.Cbi==1 && sp.Can==1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual'}
else if(sp.Cbi==1 && sp.Cbu==1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida bianual'}
else if(sp.Can==1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida anual'}
else if(sp.Cbi==1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida bianual'}
else if(sp.Cpe==1 && sp.Cbu==1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida perenne'}
else if(sp.Cpe==1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida perenne'}
else if(sp.Cbu==1)                   {descripcion +='Respecto a su biología, es una especie bulbosa'}
else if(sp.Cse==1 || sp.Cve==1)      {descripcion +='Respecto a su biología, es una especie'}

//tipo de reproducción
if(sp.Cse==1 && sp.Cve==1)           {descripcion +=' con reproducción sexual y vegetativa'}
else if(sp.Cse==1)                   {descripcion +=' con reproducción sexual'}
else if(sp.Cve==1)                   {descripcion +=' con reproducción vegetativa'}

//tipo polinizacion
if (sp.Cang==0 && sp.Calg==0)        {descripcion +='.'}
else if(sp.Cang==1)                  {descripcion +=' y tipo de polinización autógama.'}
else if(sp.Calg==1){
 if(sp.Cent==1&&sp.Cart==1)      {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila), además de polinización artificial en sistemas productivos.'}
 else if(sp.Cane==1&&sp.Cart==1) {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila), además de polinización artificial en sistemas productivos.'}
 else if(sp.Cane==1)             {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila).'}
 else if(sp.Cent==1)             {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila).'}
 else if(sp.Cart==1)             {descripcion +=' y tipo de polinización alógama realizada de forma artificial en sistemas productivos.'}
 else                            {descripcion +='.'}
}

//tipo de especie
if(sp.Cag==1 && sp.Cor==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia agrícola, ornamental y como maleza.'}
else if(sp.Cag==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia agrícola y como maleza.'}
else if(sp.Cor==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia ornamental y como maleza.'}
else if(sp.Cma==1)               {descripcion +='En el área productiva, esta especie se comporta como maleza.'}
else if(sp.Cfo==1)               {descripcion +='En el área productiva, es una especie de importancia forestal.'}

}//END... if(sp.type==1){



if(sp.type==2){

//2.     Naturalizada
var naturalizada ='';
if(sp.In==1)                             {naturalizada ='naturalizada'}

//1.     Tipo de especie
if(sp.Ia==1 && sp.Io==1 && sp.Ima==1)        {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola, ornamental y como maleza'}
else if(sp.Ia==1 && sp.Ima==1 && sp.Ime==1) {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza, además de su uso medicinal'}
else if(sp.Ia==1 && sp.Ima==1)               {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza'}
else if(sp.Io==1 && sp.Ima==1)               {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental y como maleza'}
else if(sp.Ia==1 && sp.Ime==1)               {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y uso medicinal'}
else if(sp.Ia==1)                            {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola'}
else if(sp.Ime==1)                           {descripcion +='. En el área productiva, esta especie '+naturalizada+' se comporta como maleza'}
else if(sp.Ifo==1)                           {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia forestal'}
else if(sp.Ima==1)                           {descripcion +='. En el área productiva, es una especie '+naturalizada+' de uso medicinal'}
else if(sp.Io==1)                            {descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental'}

descripcion +='.';
}//END... if(sp.type==2){

if(sp.type==3){

//2.     Endémica
if(sp.Nen==1)                                {descripcion +=' y es endémica de Chile. '

 if(sp.Nex == 1)                             {descripcion +='Actualmente su estatus de conservación es "Extinta".'}
 else if(sp.Np == 1)                         {descripcion +='Actualmente su estatus de conservación es "En peligo de extinción".'}
 else if(sp.Nv == 1)                         {descripcion +='Actualmente su estatus de conservación es "Especie vulnerable".'}
 else if(sp.Nr == 1)                         {descripcion +='Es considerada como una especie "Rara".'}

} //END ... if(sp.Nen==1)
else                                     {descripcion +='.'}

}//END... if(sp.type==3){

 return descripcion;

    };
});