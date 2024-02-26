<?php

namespace App\Http\Livewire;

use App\Models\User;
use Livewire\Component;
use Livewire\WithPagination;

class Users extends Component
{
    use WithPagination;
    public $perPage = 6;
    public function render()
    {
        $users = User::with('position')->paginate($this->perPage);
        return view('livewire.users', compact('users'));
    }
    public function loadMore()
    {
        $this->perPage += 6;
    }
}
