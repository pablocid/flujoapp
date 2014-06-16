'use strict';

flujoApp.controller('homeController', function ($scope, Restangular, $http){

	
	var CultivadasCollection = Restangular.all('cultivadas');
	var TransgenicasCollection = Restangular.all('transgenicas');

	CultivadasCollection.getList().then( function(data){ $scope.cultivadas = data; } );

 	TransgenicasCollection.getList().then( function(data){ $scope.transgenicas = data; });

 	// $http.get('http://flujogenicoback.dev:8081/transgenicas').success(function(data){
 	// 	$scope.transgenicas = data;
 	// });

	$scope.especiesRelacionadas = function (sp, type){
		$scope.loadingRelation = 1 ;
		$scope.spRelation = '';
		Restangular.one('query/'+sp.id,type).get().then(function(data){
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


		// $http({
		// 	url: 'http://flujogenicoback.dev:8081/query/'+sp.id+'/'+type+'/',
		// 	method:"GET",
		// })
		// .success(function(data) {
  //           $scope.spRelation = data;
		// 	$scope.loadingRelation = '' ;

		// 	//Visual
		// 	if($scope.spRelation.cultivadas.length !== 0){ $scope.selectedTabR=1}
		// 	else if($scope.spRelation.introducidas.length !== 0){ $scope.selectedTabR=2}
		// 	else if($scope.spRelation.nativas.length !== 0){ $scope.selectedTabR=3}
		// 	else {$scope.selectedTabR=0}

		// 	$scope.especieSeleccionada = sp;
		// 	$scope.flujoTransgenico = $scope.especieSeleccionada['Flujo Génico'];
			
		// 	if(type==4){$scope.especieSeleccionada.nombre = sp.TAXA;}else{$scope.especieSeleccionada.nombre = sp.taxa;}
  //       }) .error(function (data, status, headers, config) {
  //       		alert(data +' - '+  status +' - '+ headers +' - '+ config)
  // 				});
		







		
	};


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

	$scope.selectedTab= 1;

});
