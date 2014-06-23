<?php

class QuerysController extends BaseController {

	function __construct() { $this->beforeFilter('auth', array() ); }

	public function getRelacionadas($id, $typeRel)
	{
		$code 	=  Genero::where('id_taxa',$id )->where('type',$typeRel)->first()->code;
		$codesp = Especie::where('id_taxa',$id )->where('type',$typeRel)->first()->code;


		function relations($genero, $especie, $type, $typeRel ,$id){
			$match_generos = Genero::where('code',$genero)->where('type',$type)->get();
			$match_especies = Especie::where('code', $especie)->where('type',$type)->get();
			$fT = Transgenicas::find($id);
			$fC = Cultivadas::find($id);


			$generos_id = [];
			$especies_id = [];

			for ($i=0; $i < count($match_generos); $i++) { $generos_id[$i] = $match_generos[$i]->id_taxa; }
			for ($i=0; $i < count($match_especies); $i++) { $especies_id[$i] = $match_especies[$i]->id_taxa; }

			if($generos_id==[]){ $relacion = []; }
			else{
				switch ($type) {
					case 1: $relacion = Cultivadas::with(array('nombreComunEs','nombreComunEn','regiones','familia'))->whereIn('id',$generos_id)->get()->toArray(); break;
					case 2: $relacion = Introducidas::with(array('nombreComunEs','nombreComunEn','regiones','familia'))->whereIn('id',$generos_id)->get()->toArray(); break;
					case 3: $relacion = Nativas::with(array('nombreComunEs','nombreComunEn','regiones','familia'))->whereIn('id',$generos_id)->get()->toArray(); break;
					case 4: $relacion = Transgenicas::whereIn('id',$generos_id)->get()->toArray(); break;
					//default: $relacion = Cultivadas::whereIn('id',$generos_id)->get()->toArray(); break;
				}
				
				for ($i=0; $i < count($relacion) ; $i++) { 
					$relacion[$i]['type'] = $type;
					$relacion[$i]['relationship'] = $typeRel;

					if($especies_id!=[]){
						for ($e=0; $e < count($especies_id); $e++) { 
							if($relacion[$i]['id'] == $especies_id[$e]){
								$relacion[$i]['match']= true;
								break;
							}else{
								$relacion[$i]['match']= false;
							}
						}
					}else{
						$relacion[$i]['match']= false;
					}

					if($typeRel==4){
						$relacion[$i]['flujo'] =  $fT['Flujo Génico'];
						$relacion[$i]['riesgoAsociadoEspecie']= riesgoAsociadoEspecie($relacion[$i]);
						$relacion[$i]['flujogenico']= $relacion[$i]['riesgoAsociadoEspecie'] * $relacion[$i]['flujo'] ;
						if($relacion[$i]['match']){ $relacion[$i]['flujogenico'] += 50; }
					}
					if($typeRel==1){
						$relacion[$i]['flujo'] =  rasC($fC)*6/8;
						$relacion[$i]['riesgoAsociadoEspecie']= riesgoAsociadoEspecie($relacion[$i]);
						$relacion[$i]['flujogenico']= $relacion[$i]['riesgoAsociadoEspecie'] * $relacion[$i]['flujo'];
						if($relacion[$i]['match']){ $relacion[$i]['flujogenico'] += 50; }
					}
				}

			}
			return $relacion;

		};

		function riesgoAsociadoEspecie($sp){

			if($sp['type']==1){ $result = rasC($sp);}
			if($sp['type']==2){ $result = rasI($sp);}
			if($sp['type']==3){ $result = rasN($sp);}
			if($sp['type']==4){ $result = null;}

			return $result;
		}

		function rasC($sp){

			$CtipO =  1;
			$Cen =  6;
			$Cnati =  5;
			$Cin =  2;
			$Cnatu =  4;
			
			$CtipC =  1;
			$Cag =  3;
			$Cor =  2;
			$Cfo =  2;
			$Cma =  6;

			$CtipR =  1;
			$Cse =  4;
			$Cve =  5;
			$Ccv =  1;
			$Can =  4;
			$Cbi =  4;
			$Cpe =  3;
			$Cbu =  3;

			$CtipP =  1;
			$Cang =   2;
			$Calg =   5;
			$CagP =   1;
			$Cent =   4;
			$Cane =   3;
			$Cart =   2;

			$Cland =  1;
			$Clan =   5;

			$SumaC = ($CtipC+ ($CtipO*2)+ $CtipP + $CtipR + $Ccv + $Cland + $CagP )/8 ;

		    $riesgoC = (
		        $Cen*$sp['Cen'] + 
		        $Cnati*$sp['Cnati'] + 
		        $Cin*$sp['Cin'] + 
		        $Cnatu*$sp['Cnatu']) * $CtipO;                  
		    
		    $riesgoC += (
		        $Cag*$sp['Cag'] + 
		        $Cor*$sp['Cor'] + 
		        $Cfo*$sp['Cfo'] + 
		        $Cma*$sp['Cma']) * $CtipC;

		    $riesgoC += (
		        $Clan*$sp['Clan']) * $Cland;

		    $riesgoC += (
		        $Cse*$sp['Cse'] + 
		        $Cve*$sp['Cve']) * $CtipR;
		    
		    $riesgoC += (
		        $Can*$sp['Can'] + 
		        $Cbi*$sp['Cbi'] + 
		        $Cpe*$sp['Cpe'] + 
		        $Cbu*$sp['Cbu']) * $Ccv;
		    
		    $riesgoC += (
		        $Calg*$sp['Calg'] + 
		        $Cang*$sp['Cang']) * $CtipP;
		    
		    $riesgoC += (
		        $Cent*$sp['Cent'] + 
		        $Cane* $sp['Cane'] + 
		        $Cart*$sp['Cart']) * $CagP;

		    return $riesgoC/(576 * $SumaC)*100;
		}

		function rasI($sp){
			$Itipoc = 	1;
			$Ia 	= 	3;
			$Io 	= 	2;
			$If 	= 	2;
			$Ime 	= 	3;
			$Ima 	= 	6;
			$Iotr 	= 	1;
			$In 	= 	5;

			$SumaI = ($Itipoc + $Iotr)/2 ;

			$riesgoI  = (
				$Ia * $sp['Ia'] + 
				$If * $sp['If'] + 
				$Ima * $sp['Ima'] + 
				$Io * $sp['Io'] + 
				$Ime * $sp['Ime']) * $Itipoc;

			$riesgoI += (
				$In  *  $sp['In']) * $Iotr;

			return $riesgoI = $riesgoI/( 216 * $SumaI)*100;
		}

		function rasN($sp){

			$NcEc =	1;
			$Nex =	2;
			$Np =	6;
			$Nv =	5;
			$Nr =	4;

			$Notr =	1;
			$Nen =	3;

			$SumaN 	=	($NcEc + $Notr)/2;

			$riesgoN 	=	(
			$Np	 *	$sp['Np'] 	+ 
			$Nex *	$sp['Nex'] 	+ 
			$Nr  *	$sp['Nr'] 	+ 
			$Nv  *	$sp['Nv'] ) * $NcEc;

			$riesgoN +=	(
				$Nen * $sp['Nen']) * $Notr;

			$riesgoN = $riesgoN /( 144 * $SumaN ) * 100;
			return $riesgoN;
		}


		return Response::json(array(
			'cultivadas' => relations($code, $codesp, 1, $typeRel, $id), 
			'introducidas' => relations($code, $codesp, 2, $typeRel, $id),
			'nativas' => relations($code, $codesp, 3, $typeRel, $id),
			'transgenicas' => relations($code, $codesp, 4, $typeRel, $id)
		));

		

		//return $test;
	}

}
