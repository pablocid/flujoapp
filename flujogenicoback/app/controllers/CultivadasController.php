<?php

class CultivadasController extends BaseController {

	public function index(){
		$species = Cultivadas::orderBy( 'taxa','ASC')->get();
		return $species;
	}

	public function show($id){
		$sp = Cultivadas::with(
			['comunas','nombreComunEs','nombreComunEn','familia','regiones']
			)->find($id);

		function getDistribucion($sp){
			//$elements = dstrComuna::where('id_taxa','=',$sp['id'])->where('type','=',1)->get()->toArray();
			$elements = dstrRegion::where('id_taxa','=',$sp['id'])->where('type','=',1)->get()->toArray();

			return $elements;
		}
		$sp['distribucion'] = getDistribucion($sp);
		return $sp;
	}

	public function store(){
		$sp = new Cultivadas;
		$sp->name = Input::get('name');
		$sp->save();
	}

	public function update($id){
			$nerd = Cultivadas::find($id);
			$nerd->name = Input::get('name');
			$nerd->save();
	}

	public function destroy($id){
		$nerd = Cultivadas::find($id);
		$nerd->delete();
	}

	public function getTrash($id = null){
		if($id==null){
			$species = Cultivadas::onlyTrashed()->get();
			return $species;
		}else{
			$species = Cultivadas::withTrashed()->find($id);
			$species->restore();
			return $species;
		}
	}
	public function deleteTrash($id){
		$species = Cultivadas::withTrashed()->find($id);
		$species->forceDelete();
	}



}