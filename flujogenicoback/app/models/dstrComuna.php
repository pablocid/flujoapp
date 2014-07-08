<?php

class dstrComuna extends Eloquent {
protected $table = 'dstr_comuna';
protected $softDelete = true;

public function nombre(){
	return $this->hasOne('dstrComunaName', 'id','code');
}

}