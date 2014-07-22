'use strict';

flujoApp.controller('homeController', function ($scope, Restangular, $http, RelacionSpService, DescripcionService){

var CultivadasCollection = Restangular.all('cultivadas').getList();
var TransgenicasCollection = Restangular.all('transgenicas').getList();

CultivadasCollection.then( function(data){ $scope.cultivadas = data; } );

TransgenicasCollection.then( function(data){ $scope.transgenicas = data; });

$scope.selectedTab= 1;
//$scope.QueryRel = Restangular.all('query/');

$scope.especiesRelacionadas = function (sp, type){
	$scope.loadingRelation = 1 ;
	$scope.spRelation = '';
	//Restangular.one('query/'+sp.id,type).get().then(function(data){
	RelacionSpService.one(sp.id,type).get().then(function(data){
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

$scope.description = DescripcionService;

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
var Re = {CtipO:  1,
Cen:  6,
Cnati:  5,
Cin:  2,
Cnatu:  4,
CtipC:  1,
Cag:  3,
Cor:  2,
Cfo:  2,
Cma:  6,
CtipR:  1,
Cse:  4,
Cve:  5,
Ccv:  1,
Can:  4,
Cbi:  4,
Cpe:  3,
Cbu:  3,
CtipP:  1,
Cang:   2,
Calg:   5,
CagP:   1,
Cent:   4,
Cane:   3,
Cart:   2,
Cland:  1,
Clan:   5,
Itipoc :	1,
Ia :	3,
Io :	2,
If :	2,
Ime :	3,
Ima :	6,
Iotr :1,
In :	5,
NcEc :1,
Nex :2,
Np :6,
Nv :5,
Nr :4,
Notr :1,
Nen :3
}

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
	//$scope.SumaC = ($scope.R.CtipC+ ($scope.R.CtipO*2)+ $scope.R.CtipP + $scope.R.CtipR + $scope.R.Ccv + $scope.R.Cland + $scope.R.CagP )/8 ;
	$scope.SumaC = 1;

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
	//$scope.SumaI = ($scope.R.Itipoc + $scope.R.Iotr)/2 ;
	$scope.SumaI = 1 ;

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
	//$scope.SumaN 	=	($scope.R.NcEc + $scope.R.Notr)/2;
	$scope.SumaN 	=	1;
	
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

$scope.ponderacionSp = '';

$scope.R = angular.copy(Re);

$scope.$watch('R',function(R){
	if(R){
		$scope.ponderacion($scope.ponderacionSp);
	}
	
}, true);
$scope.ponderacion = function (sp){
	//$scope.ponderacionPanel = true;
	
	
	$scope.ponderacionSp = sp;
	$scope.ponderacionSpF = $scope.FlujoGenico($scope.ponderacionSp);
	$scope.ponderacionSpR = $scope.riskLevel($scope.ponderacionSpF);
}

$scope.refresh = function(){
	  $scope.$apply();	
}

$scope.ponderacionChao = function(){
	$scope.ponderacionSp = '';

	$scope.R = angular.copy(Re);

}
$scope.comunasMatch = function (sp, num) {

};

$scope.desDist = function (sp, num){
	var respuesta ="";

		if(sp.comunas.length >0){
			
			respuesta += 'Presente en las comunas de ';
			for (var i = sp.comunas.length - 1; i >= 0; i--) {
				
				if(sp.comunas[i].nombre.region_code==num){ 
					respuesta += sp.comunas[i].nombre.name; 

					if(i>0){
						respuesta +=', ';
					}else {
						respuesta +='.';
					}
				}

				
			};

			
		}

		return respuesta+'-';

}

$scope.tooltip = {
  "title": "Hello Tooltip<br />This is a multiline message!",
  "checked": false
};
// $scope.reset = function() {
//  angular.copy(originalData, $scope.data); 
// };


});
