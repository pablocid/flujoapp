<?php

class TransgenicasController extends BaseController {

	public function index(){
		$species = Transgenicas::orderBy( 'taxa','ASC')->get();
		return $species;
	}

	public function show($id){
		$sp = Transgenicas::find($id);
		return $sp;
	}

	public function store(){
		$sp = new Transgenicas;
		$sp->name = Input::get('name');
		$sp->save();
	}

	public function update($id){
			$nerd = Transgenicas::find($id);
			$nerd->name = Input::get('name');
			$nerd->save();
	}

	public function destroy($id){
		$nerd = Transgenicas::find($id);
		$nerd->delete();
	}

	// public function getTrash($id = null){
	// 	if($id==null){
	// 		$species = Transgenicas::onlyTrashed()->get();
	// 		return $species;
	// 	}else{
	// 		$species = Transgenicas::withTrashed()->find($id);
	// 		$species->restore();
	// 		return $species;
	// 	}
	// }
	// public function deleteTrash($id){
	// 	$species = Transgenicas::withTrashed()->find($id);
	// 	$species->forceDelete();
	// }



}