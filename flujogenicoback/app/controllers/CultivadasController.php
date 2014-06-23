<?php

class CultivadasController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'SpeciesController@showSpecies');
	|
	*/

	public function index(){
		$species = Cultivadas::orderBy( 'taxa','ASC')->get();
		return $species;
	}

	public function show($id){
		$sp = Cultivadas::with(
			['nombreComunEs','nombreComunEn','familia','regiones'])->find($id);
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