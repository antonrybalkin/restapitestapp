<?php
namespace App\Traits;

use App\Exceptions\InvalidApiKeyException;
trait Unsplash
{
    public function getImage(String $query = '', String $size = 'small', String $orientation = 'portrait')
    {
        if (!env("UNSPLASH_ACCES_KEY")) {
            throw new InvalidApiKeyException('Empty unsplash access key');
        }

        $curl = curl_init();
        $params = [];
        if ($query != '') {
            $params[] = 'query=' . $query;
        }
        if ($orientation != '' && !in_array($orientation, ['landscape', 'portrait', 'squarish'])) {
            $params[] = 'orientation=' . $orientation;
        }
        if (!in_array($size, ['small', 'regular', 'raw', "full", 'thumb'])) {
            $size = 'raw';
        }
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.unsplash.com/photos/random' . (count($params) > 0 ? '?' . implode($params) : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Client-ID ' . env("UNSPLASH_ACCES_KEY"),
            ),
        ));

        $response = curl_exec($curl);
        $response = json_decode($response, true);

        if (!curl_errno($curl)) {
            switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
                case 200:
                    curl_close($curl);
                    return $response['urls'][$size];

                default:
                    curl_close($curl);
                    throw new InvalidApiKeyException(is_array($response['errors']) ? implode(',', $response['errors']) : $response['errors']);

            }
        }
    }
}
