<?php

class Transgenicas extends Eloquent {
protected $table = 'scr_transgenicas';
//protected $softDelete = true;

public function getRegion(){
	return $this->hasMany('dstrRegion', 'id_taxa', 'id')->where('type',4);
}

}