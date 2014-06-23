<?php

class Familia extends Eloquent {
protected $table = 'tax_familia';
protected $softDelete = true;

public function nombre(){
	return $this->hasOne('FamiliaName', 'id', 'code');
}


}