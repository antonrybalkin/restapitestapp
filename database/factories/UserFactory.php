<?php

namespace Database\Factories;

use App\Models\Positions;
use App\Traits\Unsplash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    use Unsplash;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $postions = [];
        if (Cache::has("positions")) {
            $postions = Cache::get("positions");
        } else {
            $postions = Positions::all(['id']);
            Cache::add('positions', $postions, 100000);
        }
        $email = fake()->unique()->safeEmail();
        $email = str_replace("@example", fake()->randomElement(["@gmail", "@yahoo", '@bing', '@ukr']), $email);
        \Tinify\setKey(env("TINYPNG_API_KEY"));
        $gender = fake()->randomElement(['male', 'female']);
        $name = fake()->name($gender);
        $photo = Str::slug($name) . '.jpeg';
        // //$source = \Tinify\fromUrl('https://thispersondoesnotexist.com/');

        $source = \Tinify\fromUrl($this->getImage($gender));
        $resized = $source->resize(array(
            "method" => "cover",
            "width" => 70,
            "height" => 70,
        ));
        $resized->toFile(storage_path('app/public/images/') . $photo);
        $phone = strval(fake()->unique()->randomNumber(7, true));
        $operators = ['050', '066', '095', '099', '067', '068', '096', '097', '098', '063', '073', '093', '091', '092', '094'];
        $phone = '+38' . fake()->randomElement($operators) . strval($phone);
        time_nanosleep(0, fake()->randomNumber(3));
        return [
            'name' => $name,
            'email' => $email,
            'position_id' => $postions->random(1)->first()->id,
            'photo' => $photo,
            'phone' => $phone,
        ];
    }

}
