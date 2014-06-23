<?php

class IntroducidasController extends BaseController {

	public function index(){
		$species = Introducidas::lists('taxa','id');
		return $species;
	}

	public function show($id){
		$sp = Introducidas::with(
			['nombreComunEs','nombreComunEn','familia','regiones'])->find($id);
		return $sp;
	}

	public function store(){
		$sp = new Introducidas;
		$sp->name = Input::get('name');
		$sp->save();
	}

	public function update($id){
			$nerd = Introducidas::find($id);
			$nerd->name = Input::get('name');
			$nerd->save();
	}

	public function destroy($id){
		$nerd = Introducidas::find($id);
		$nerd->delete();
	}

	public function getTrash($id = null){
		if($id==null){
			$species = Introducidas::onlyTrashed()->get();
			return $species;
		}else{
			$species = Introducidas::withTrashed()->find($id);
			$species->restore();
			return $species;
		}
	}
	public function deleteTrash($id){
		$species = Introducidas::withTrashed()->find($id);
		$species->forceDelete();
	}



}