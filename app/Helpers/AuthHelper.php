<?php

if(! function_exists('getAuthIdOrZero')) {
    function getAuthIdOrZero() {
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
        }

        return $authId;
    }
}
