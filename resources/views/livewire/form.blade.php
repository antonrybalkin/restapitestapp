<div>
    {{-- To attain knowledge, add things every day; To attain wisdom, subtract things every day. --}}
    @if (session()->has('status') && session()->has('msg') && session('status'))
        <div class="bg-green-800 p-3 text-center text-white">
            {{ session('msg') }}
        </div>
    @endif
    @if (count($errors) > 0)
        <div class="bg-red-800 text-white p-3 flex items-center justify-center">
            <ul>
                @foreach ($errors as [$key, $value])
                    <li class="table"><span class="table-column">{{ $key }}</span> <span
                            class="table-column">{{ $value }}</span></li>
                @endforeach
            </ul>
        </div>
    @endif
    <form method="POST" wire:submit.prevent='store' enctype='multipart/form-data'
        class="w-6/12 mx-auto my-5 flex flex-col p-1 gap-10">
        @csrf
        <label class="w-full">
            <input type="text" required name='name' wire:model="name"
                class="w-full p-1 border-solid border-2 border-slate-950 dark:border-white" />
            @error('name')
                <span>{{ $message }}</span>
            @enderror
        </label>
        <label class="w-full">
            <input type="email" required name='email' wire:model="email"
                class="w-full p-1 border-solid border-2 border-slate-950 dark:border-white" />
            @error('email')
                <span>{{ $message }}</span>
            @enderror
        </label>
        <label class="w-full">
            <input type="text" required name='phone' wire:model="phone"
                class="w-full p-1 border-solid border-2 border-slate-950 dark:border-white" />
            @error('phone')
                <span>{{ $message }}</span>
            @enderror
        </label>
        <label class="w-full">
            <select name='position_id' wire:model="position_id"
                class="w-full p-1 border-solid border-2 border-slate-950 dark:border-white">
                <option>Choose position</option>
                @foreach ($positions as $position)
                    <option value="{{ $position->id }}">{{ $position->name }}</option>
                @endforeach
            </select>
            @error('position_id')
                <span>{{ $message }}</span>
            @enderror
        </label>
        <label class="w-full">
            <input type="file" name='photo' wire:model="photo" required accept=".jpeg,.jpg"
                class="w-full border-2 border-solid border-slate-950 dark:border-white">
            <div wire:loading wire:target="photo">Uploading...</div>
            @error('photo')
                <span>{{ $message }}</span>
            @enderror
        </label>
        <button class=" border-2 border-solid border-slate-950 dark:border-white p-2">Submit</button>
    </form>

</div>
