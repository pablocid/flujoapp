<?php

class dstrRegion extends Eloquent {
protected $table = 'dstr_region';
protected $softDelete = true;

public function nombre(){
	return $this->hasOne('dstrRegionName', 'id','code');
}

}