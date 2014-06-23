<?php

class Cultivadas extends Eloquent {
protected $table = 'cultivadas';
protected $softDelete = true;

public function regiones(){
	return $this->hasMany('dstrRegion', 'id_taxa', 'id')->where('type',1)->with('nombre');
}

public function familia(){
	return $this->hasOne('Familia', 'id_taxa', 'id')->where('type',1)->with('nombre');
}

public function nombreComunEs(){
	return $this->hasMany('NombresComunes','id_taxa','id')->where('type',1)->where('language','es');
}

public function nombreComunEn(){
	return $this->hasMany('NombresComunes','id_taxa','id')->where('type',1)->where('language','en');
}

}
