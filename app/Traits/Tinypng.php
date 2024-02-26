<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
trait Tinypng
{
    private function optimizeImage(UploadedFile $file, String $name)
    {

        if (!env("TINYPNG_API_KEY")) {
            return ["status" => 'error', 'image' => '', "message" => "Error on server with"];
        }
        if ($file->getRealPath() == false) {
            return ["status" => 'fail', 'image' => '', "message" => "Error on save file"];
        }

        $name = Str::of($name)->slug('-');
        if (Storage::has('app/public/images/' . $name . '.' . $file->getClientOriginalExtension())) {
            $name = hash("sha256", time());
        }
        \Tinify\setKey(env("TINYPNG_API_KEY"));

        $source = \Tinify\fromFile($file->getRealPath());
        $resized = $source->resize(array(
            "method" => "cover",
            "width" => 70,
            "height" => 70,
        ));
        $resized->toFile(storage_path('app/public/images/') . $name . '.' . $file->getClientOriginalExtension());

        return ["status" => 'ok', 'image' => $name . '.' . $file->getClientOriginalExtension(), "message" => "Succes"];

    }
}
