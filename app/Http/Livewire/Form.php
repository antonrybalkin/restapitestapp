<?php

namespace App\Http\Livewire;

use App\Models\Positions;
use App\Models\User;
use App\Traits\Image;
use Livewire\Component;
use Livewire\WithFileUploads;

class Form extends Component
{
    use WithFileUploads, Image;
    public $name;

    public $email;

    public $phone;

    public $position_id;
    public $photo;
    public function render()
    {
        $success = false;
        $msg = '';
        $positions = Positions::all();
        return view('livewire.form', compact("positions", 'success', 'msg'));
    }
    protected $rules = [
        'name' => ['required', 'string', 'min:2', 'max:60'],
        'email' => ['required', 'unique:users', 'string'],
        'phone' => ['required', 'unique:users', 'string'],
        'position_id' => ['required', 'integer', 'min:1'],
        'photo' => ['required', 'image', 'mimes:jpg,jpeg', 'max:5000'],
    ];

    public function store()
    {
        $emailRegexp = '/^(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/m';
        $phoneRegexp = '/^[\+]{0,1}380([0-9]{9})$/m';
        $msg = '';
        $positions = Positions::all();

        $data = $this->validate();
        $success = false;
        if (preg_match($emailRegexp, $data['email']) == 0 || preg_match($phoneRegexp, $data['phone']) == 0) {
            $errors = [];
            if (preg_match($emailRegexp, $data['email']) == 0) {
                $this->errorBag->add("email", 'The email must be a valid email address.');
            }
            if (preg_match($phoneRegexp, $data['email']) == 0) {
                $this->errorBag->add("phone", 'The phone field is required.');
            }

            return view('livewire.form', compact("positions"));
        }

        $image = $data['photo'];

        unset($data['photo']);

        $user = User::where('name', $data['name'])->where('email', $data['email'])->where('phone', $data['phone'])->where('position_id', $data['position_id'])->first();

        if ($user) {
            $msg = "User already exist";
            session()->flash('msg', $msg);
            session()->flash('status', $success);
            return view('livewire.form', compact("positions"));
        } else {
            $image = $this->saveImage($image, $data['name']);

            if ($image) {
                $data['photo'] = $image;
                $user = User::create($data);

                $success = true;

                $msg = "User succesfuly added ID: " . $user->id;
                session()->flash('msg', $msg);
                session()->flash('status', $success);
                return view('livewire.form', compact("positions"));
            } else {
                $errors[] = ['photo' => 'Image is invalid.'];
                $msg = 'Image is invalid.';
                session()->flash('msg', $msg);
                session()->flash('status', $success);
                return view('livewire.form', compact("positions"));
            }

        }
    }
}
