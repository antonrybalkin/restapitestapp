<?php

namespace App\Traits;

use App\Traits\Tinypng;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
trait Image
{
    use Tinypng;
    public function saveImage(UploadedFile $file, String $name)
    {

        $image = $this->optimizeImage($file, $name);
        if ($image['status'] != 'ok') {
            Log::error("Error on save image, message:" . $image['message']);
            return false;
        }
        return $image['image'];

    }

    public function removeImage($filename)
    {
        //todo
    }
}
