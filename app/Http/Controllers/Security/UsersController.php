<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Traits\Image;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    use Image;
    public function getUserByID($id): JsonResponse
    {
        if (!is_numeric($id)) {
            return response()->json(["success" => false,
                "message" => "Validation failed",
                "fails" => [
                    "user_id" => [
                        "The user_id must be an integer.",
                    ],
                ]], 400);
        }
        $user = User::with("position")->where("id", $id)->first();
        if ($user) {
            return response()->json([
                "success" => true,
                "user" => array(
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "phone" => $user->phone,
                    "position" => $user->position->name,
                    "position_id" => $user->position->id,
                    "photo" => asset('storage/images/' . $user->photo),
                ),
            ], 200);
        } else {
            return response()->json(["success" => false,
                "message" => "The user with the requested identifier does not exist",
                "fails" => [
                    "user_id" => [
                        "User not found",
                    ],
                ]], 404);
        }
    }
    public function getUsers(Request $request): JsonResponse
    {
        $page = $request->page ? $request->page : 1;
        $count = $request->count ? $request->count : 6;
        $offset = $request->offset ? $request->offset : 0;

        if (($page < 1 && is_numeric($page)) || ($offset < 0 && is_numeric($offset)) || (($count < 1 || $count > 100) && is_numeric($count)) || !is_numeric($page) || !is_numeric($offset) || !is_numeric($count)) {
            $error = [];
            $fields = ['page' => $page, 'count' => $count, 'offset' => $offset];
            foreach ($fields as [$key, $value]) {
                if ($value < 1 && is_numeric($value) && $key != "offset") {
                    $error[$key][] = "The $key must be at least 1.";
                }
                if ($value < 1 && is_numeric($value) && $key == "count") {
                    $error[$key][] = "The $key must be at less then 100 or equal 100.";
                }
                if ($value < 0 && is_numeric($value) && $key == "offset") {
                    $error[$key][] = "The $key must be at least 0.";
                }
                if (!is_numeric($value)) {
                    $error[$key][] = "The $key must be an integer";
                }
            }

            throw new HttpResponseException(response()->json(["success" => false,
                "message" => "Validation failed",
                "fails" => $error], 400));
        }

        $users = User::select("users.id", "users.name", "users.email", "users.phone", 'positions.name as position', "users.position_id")
            ->selectRaw("UNIX_TIMESTAMP(users.created_at) as registration_timestamp, users.photo")
            ->join('positions', 'users.position_id', '=', 'positions.id')->orderBy("id", 'asc')
            ->paginate($count);

        if ($users->lastPage() < $page && count($users->items()) == 0) {

            throw new HttpResponseException(response()->json([
                "success" => false,
                "message" => "Page not found",
            ], 400));
        }

        return response()->json([
            "success" => true,
            "page" => $page,
            "total_pages" => $users->lastPage(),
            "total_users" => $users->total(),
            "count" => $count,
            "links" => [
                "next_url" => $users->nextPageUrl(),
                "prev_url" => $users->previousPageUrl(),
            ],
            "users" => $users->items()], 200);
    }

    public function addUser(UserRequest $request): JsonResponse
    {
        $emailRegexp = '/^(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/m';
        $phoneRegexp = '/^[\+]{0,1}380([0-9]{9})$/m';

        $data = $request->validated();

        if (preg_match($emailRegexp, $data['email']) == 0 || preg_match($phoneRegexp, $data['phone']) == 0) {
            $errors = [];
            if (preg_match($emailRegexp, $data['email']) == 0) {
                $errors['email'][] = 'The email must be a valid email address.';
            }
            if (preg_match($phoneRegexp, $data['email']) == 0) {
                $errors['phone'][] = 'The phone field is required.';
            }

            throw new HttpResponseException(response()->json([
                "success" => false,
                "message" => "Validation failed",
                "fails" => $errors,
            ], 422));
        }

        $image = $data['photo'];

        unset($data['photo']);

        $user = User::where('name', $data['name'])->where('email', $data['email'])->where('phone', $data['phone'])->where('position_id', $data['position_id'])->first();

        if ($user) {

            throw new HttpResponseException(response()->json([
                "success" => false,
                "message" => "User with this phone or email already exist",
            ], 409));
        } else {
            $image = $this->saveImage($image, $data['name']);

            if ($image) {
                $data['photo'] = $image;
                $user = User::create($data);
                return response()->json([
                    "success" => true,
                    "user_id" => $user->id,
                    "message" => "New user successfully registered",
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Image is invalid.",
                    "fails" => ['photo' => "Image is invalid."],
                ], 422);
            }

        }

    }
}
