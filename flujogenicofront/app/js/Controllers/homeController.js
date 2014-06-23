'use strict';

flujoApp.controller('homeController', function ($scope, Restangular, $http){

var CultivadasCollection = Restangular.all('cultivadas');
var TransgenicasCollection = Restangular.all('transgenicas');

CultivadasCollection.getList().then( function(data){ $scope.cultivadas = data; } );

TransgenicasCollection.getList().then( function(data){ $scope.transgenicas = data; });

$scope.selectedTab= 1;

$scope.especiesRelacionadas = function (sp, type){
	$scope.loadingRelation = 1 ;
	$scope.spRelation = '';
	Restangular.one('query/'+sp.id,type).get().then(function(data){
		for (var i = data.cultivadas.length - 1; i >= 0; i--) { distribution(data.cultivadas[i]); };
		for (var i = data.introducidas.length - 1; i >= 0; i--) { distribution(data.introducidas[i]); };
		for (var i = data.nativas.length - 1; i >= 0; i--) { distribution(data.nativas[i]); };
		$scope.spRelation = data;
		$scope.loadingRelation = '' ;
		//Visual
		if($scope.spRelation.cultivadas.length !== 0){ $scope.selectedTabR=1}
		else if($scope.spRelation.introducidas.length !== 0){ $scope.selectedTabR=2}
		else if($scope.spRelation.nativas.length !== 0){ $scope.selectedTabR=3}
		else {$scope.selectedTabR=0}

		$scope.especieSeleccionada = sp;
		$scope.flujoTransgenico = $scope.especieSeleccionada['Flujo Génico'];
		if(type==4){$scope.especieSeleccionada.nombre = sp.TAXA;}else{$scope.especieSeleccionada.nombre = sp.taxa;}
		// --- Visual
	});
};


$scope.description = function (sp){

	var descripcion =  sp.taxa;
	
	if(sp.nombre_comun_es.length > 0 && sp.nombre_comun_es[0].name){ descripcion += ' (nombre común: '+ sp.nombre_comun_es[0].name + ')'; }
	
	descripcion +=' pertenece a la familia '+ sp.familia.nombre.name;

	if(sp.type==1){
//tipo origen
if(sp.Cnati==1 && sp.Cen==1)		{ descripcion +=' y corresponde a una especie nativa y endémica de Chile. ' }
else if(sp.Cen==1)					{ descripcion +=' y corresponde a una especie de origen endémica en Chile. ' }
else if(sp.Cnati==1)				{ descripcion +=' y corresponde a una especie nativa de Chile.' }
else if(sp.Cin ==1 && sp.Cnatu ==1)	{ descripcion +=' y corresponde a una especie introducida y naturalizada en Chile. '}
else if(sp.Cin ==1)					{ descripcion +=' y corresponde a una especie introducida en Chile. '}
else if(sp.Cnatu ==1)				{ descripcion +=' y corresponde a una especie naturalizada en Chile. '}
else 								{ descripcion +='.'}

//ciclo de vida
if(sp.Can==1 && sp.Cbi==1 &&  sp.Cbu==1){descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual y bianual'}
else if(sp.Can==1 && sp.Cbi==1)		{descripcion +='Respecto a su biología, presenta un ciclo de vida anual y bianual'}
else if(sp.Cbi==1 && sp.Can==1)		{descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual'}
else if(sp.Cbi==1 && sp.Cbu==1)		{descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida bianual'}
else if(sp.Can==1)					{descripcion +='Respecto a su biología, presenta un ciclo de vida anual'}
else if(sp.Cbi==1)					{descripcion +='Respecto a su biología, presenta un ciclo de vida bianual'}
else if(sp.Cpe==1 && sp.Cbu==1)		{descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida perenne'}
else if(sp.Cpe==1)					{descripcion +='Respecto a su biología, presenta un ciclo de vida perenne'}
else if(sp.Cbu==1)					{descripcion +='Respecto a su biología, es una especie bulbosa'}
else if(sp.Cse==1 || sp.Cve==1)		{descripcion +='Respecto a su biología, es una especie'}

//tipo de reproducción
if(sp.Cse==1 && sp.Cve==1)			{descripcion +=' con reproducción sexual y asexual'}
else if(sp.Cse==1)					{descripcion +=' con reproducción sexual'}
else if(sp.Cve==1)					{descripcion +=' con reproducción asexual'}

//tipo polinizacion
if (sp.Cang==0 && sp.Calg==0)		{descripcion +='.'}
else if(sp.Cang==1)					{descripcion +=' y tipo de polinización autógama.'}
else if(sp.Calg==1){
	if(sp.Cent==1&&sp.Cart==1)		{descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila), además de polinización artificial en sistemas productivos.'}
	else if(sp.Cane==1&&sp.Cart==1)	{descripcion +=' y tipo de polinización alógama realizada por viento (anemófila), además de polinización artificial en sistemas productivos.'}
	else if(sp.Cane==1)				{descripcion +=' y tipo de polinización alógama realizada por viento (anemófila).'}
	else if(sp.Cent==1)				{descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila).'}
	else if(sp.Cart==1)				{descripcion +=' y tipo de polinización alógama realizada de forma artificial en sistemas productivos.'}
	else							{descripcion +='.'}
}

//tipo de especie
if(sp.Cag==1 && sp.Cor==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia agrícola, ornamental y como maleza.'}
else if(sp.Cag==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia agrícola y como maleza.'}
else if(sp.Cor==1 && sp.Cma==1) {descripcion +='En el área productiva, es una especie de importancia ornamental y como maleza.'}
else if(sp.Cma==1) 				{descripcion +='En el área productiva, esta especie se comporta como maleza.'}
else if(sp.Cfo==1) 				{descripcion +='En el área productiva, es una especie de importancia forestal.'}

}//END... if(sp.type==1){
	if(sp.type==2){
		
//1.     Tipo de especie
if(sp.Ia==1 && sp.Io==1 && sp.Ima==1) {descripcion +='. En el área productiva, es una especie de importancia agrícola, ornamental y como maleza.'}
else if(sp.Ia==1 && sp.Ima==1 && sp.Ime==1) {descripcion +='. En el área productiva, es una especie de importancia agrícola y como maleza, además de su uso medicinal.'}
else if(sp.Ia==1 && sp.Ima==1) 	{descripcion +='. En el área productiva, es una especie de importancia agrícola y como maleza.'}
else if(sp.Io==1 && sp.Ima==1) 	{descripcion +='. En el área productiva, es una especie de importancia ornamental y como maleza.'}
else if(sp.Ia==1 && sp.Ime==1) 	{descripcion +='. En el área productiva, es una especie de importancia agrícola y uso medicinal.'}
else if(sp.Ia==1) 				{descripcion +='. En el área productiva, es una especie de importancia agrícola.'}
else if(sp.Ime==1) 				{descripcion +='. En el área productiva, esta especie se comporta como maleza.'}
else if(sp.Ifo==1) 				{descripcion +='. En el área productiva, es una especie de importancia forestal.'}
else if(sp.Ima==1) 				{descripcion +='. En el área productiva, es una especie de uso medicinal.'}

	}

	if(sp.type==3){
		descripcion += 'Es una nativa';	
	}
	
	return descripcion;
} // END description

function distribution (sp){

sp.distribucion = { 'I':'', 'II':'', 'III':'', 'IV':'', 'V':'', 'VI':'', 'VII':'', 'VIII':'','IX':'','X':'','XI':'','XII':'','XIII':'',	'XIV':'','XV':''};

if(sp.regiones.length != 0){
	for (var i = sp.regiones.length - 1; i >= 0; i--) {
		if(sp.regiones[i].code==1){ sp.distribucion.I = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==2){ sp.distribucion.II = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==3){ sp.distribucion.III = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==4){ sp.distribucion.IV = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==5){ sp.distribucion.V = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==6){ sp.distribucion.VI = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==7){ sp.distribucion.VII = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==8){ sp.distribucion.VIII = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==9){ sp.distribucion.IX = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==10){ sp.distribucion.X = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==11){ sp.distribucion.XI = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==12){ sp.distribucion.XII = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==13){ sp.distribucion.XIII = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==14){ sp.distribucion.XIV = {"nombre":sp.regiones[i].nombre.name} }
		if(sp.regiones[i].code==15){ sp.distribucion.XV = {"nombre":sp.regiones[i].nombre.name} }
	};
}else{
	sp.regiones = false;
}

}

//Objeto con las ponderaciones
$scope.R = {};
//cultivadas
$scope.R.CtipO =  1;
$scope.R.Cen =  6;
$scope.R.Cnati =  5;
$scope.R.Cin =  2;
$scope.R.Cnatu =  4;

$scope.R.CtipC =  1;
$scope.R.Cag =  3;
$scope.R.Cor =  2;
$scope.R.Cfo =  2;
$scope.R.Cma =  6;

$scope.R.CtipR =  1;
$scope.R.Cse =  4;
$scope.R.Cve =  5;
$scope.R.Ccv =  1;
$scope.R.Can =  4;
$scope.R.Cbi =  4;
$scope.R.Cpe =  3;
$scope.R.Cbu =  3;
$scope.R.CtipP =  1;
$scope.R.Cang =   2;
$scope.R.Calg =   5;
$scope.R.CagP =   1;
$scope.R.Cent =   4;
$scope.R.Cane =   3;
$scope.R.Cart =   2;
$scope.R.Cland =  1;
$scope.R.Clan =   5;

//Introducidas
$scope.R.Itipoc = 	1;
$scope.R.Ia = 	3;
$scope.R.Io = 	2;
$scope.R.If = 	2;
$scope.R.Ime = 	3;
$scope.R.Ima = 	6;

$scope.R.Iotr = 	1;
$scope.R.In = 	5;

//Nativas
$scope.R.NcEc =	1;
$scope.R.Nex =	2;
$scope.R.Np =	6;
$scope.R.Nv =	5;
$scope.R.Nr =	4;
$scope.R.Notr =	1;
$scope.R.Nen =	3;


$scope.FlujoGenico = function (sp){
	if(sp.relationship==4){ $scope.resultFlujoGenico = $scope.FlujoGenicoTransgenico(sp); }
	if(sp.relationship==1){ $scope.resultFlujoGenico = $scope.FlujoGenicoCultivadas(sp); }

	return $scope.resultFlujoGenico;
}

$scope.FlujoGenicoTransgenico = function (sp){
	if(sp.type==1){ $scope.resultFlujoGenicoTransgenico = $scope.rasC(sp); }
	if(sp.type==2){ $scope.resultFlujoGenicoTransgenico = $scope.rasI(sp); }
	if(sp.type==3){ $scope.resultFlujoGenicoTransgenico = $scope.rasN(sp); }

	$scope.resultFlujoGenicoTransgenico = $scope.resultFlujoGenicoTransgenico * sp.flujo;

	if(sp.match){ $scope.resultFlujoGenicoTransgenico +=50; }
	
	return $scope.resultFlujoGenicoTransgenico;
}

$scope.FlujoGenicoCultivadas = function (sp){
	if(sp.type==1){ $scope.resultFlujoGenicoCultivo = $scope.rasC(sp); }
	if(sp.type==2){ $scope.resultFlujoGenicoCultivo = $scope.rasI(sp); }
	if(sp.type==3){ $scope.resultFlujoGenicoCultivo = $scope.rasN(sp); }

	$scope.resultFlujoGenicoCultivo = $scope.resultFlujoGenicoCultivo * sp.flujo;
	if(sp.match){ $scope.resultFlujoGenicoCultivo +=50; }
	
	return $scope.resultFlujoGenicoCultivo;
}

$scope.rasC = function(sp){
	$scope.SumaC = ($scope.R.CtipC+ ($scope.R.CtipO*2)+ $scope.R.CtipP + $scope.R.CtipR + $scope.R.Ccv + $scope.R.Cland + $scope.R.CagP )/8 ;

    $scope.riesgoC = (
        $scope.R.Cen*sp.Cen + 
        $scope.R.Cnati*sp.Cnati + 
        $scope.R.Cin*sp.Cin + 
        $scope.R.Cnatu*sp.Cnatu) * $scope.R.CtipO;                  
    
    $scope.riesgoC += (
        $scope.R.Cag*sp.Cag + 
        $scope.R.Cor*sp.Cor + 
        $scope.R.Cfo*sp.Cfo + 
        $scope.R.Cma*sp.Cma) * $scope.R.CtipC;

    $scope.riesgoC += (
        $scope.R.Clan*sp.Clan) * $scope.R.Cland;

    $scope.riesgoC += (
        $scope.R.Cse*sp.Cse + 
        $scope.R.Cve*sp.Cve) * $scope.R.CtipR;
    
    $scope.riesgoC += (
        $scope.R.Can*sp.Can + 
        $scope.R.Cbi*sp.Cbi + 
        $scope.R.Cpe*sp.Cpe + 
        $scope.R.Cbu*sp.Cbu) * $scope.R.Ccv;
    
    $scope.riesgoC += (
        $scope.R.Calg*sp.Calg + 
        $scope.R.Cang*sp.Cang) * $scope.R.CtipP;
    
    $scope.riesgoC += (
        $scope.R.Cent*sp.Cent + 
        $scope.R.Cane* sp.Cane + 
        $scope.R.Cart*sp.Cart) * $scope.R.CagP;
    
   return $scope.riesgoC/(576 * $scope.SumaC)*100;
}

$scope.rasI = function(sp){
	$scope.SumaI = ($scope.R.Itipoc + $scope.R.Iotr)/2 ;

	$scope.riesgoI  = (
		$scope.R.Ia*sp.Ia + 
		$scope.R.If*sp.If + 
		$scope.R.Ima*sp.Ima + 
		$scope.R.Io*sp.Io + 
		$scope.R.Ime*sp.Ime) * $scope.R.Itipoc;

	$scope.riesgoI += (
		$scope.R.In * sp.In) * $scope.R.Iotr;

	return $scope.riesgoI = $scope.riesgoI/( 216 * $scope.SumaI)*100;
	
}

$scope.rasN = function(sp){
	$scope.SumaN 	=	($scope.R.NcEc + $scope.R.Notr)/2;
	
	$scope.riesgoN 	=	(
		$scope.R.Np	 *	sp.Np 	+ 
		$scope.R.Nex *	sp.Nex 	+ 
		$scope.R.Nr  *	sp.Nr 	+ 
		$scope.R.Nv  *	sp.Nv ) * $scope.R.NcEc;

	$scope.riesgoN +=	$scope.R.Nen * sp.Nen * $scope.R.Notr;

	$scope.riesgoN = $scope.riesgoN /( 144 * $scope.SumaN ) * 100;

	//return	$scope.riesgoN / (144 * $scope.R.SumaN) * 100;
	return $scope.riesgoN;

}

$scope.riskLevel = function(flujo){
	if(flujo < 33.3333){return 'Bajo';};
    if(flujo >=33.3333 && flujo< 66.6666){return 'Medio';};
    if(flujo >= 66.6666){return 'Alto';};
}


});
