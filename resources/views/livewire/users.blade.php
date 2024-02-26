<div>
    {{-- To attain knowledge, add things every day; To attain wisdom, subtract things every day. --}}
    <div class="w-full p-2 mx-auto grid grid-cols-3 gap-1">
        @foreach ($users as $user)
            <div
                class="p-2 basis-full md:basis-1/2 lg:basis-1/3 w-full border-spacing-3 border-2 border-l-teal-950 dark:border-white rounded-lg">
                <img src="{{ $user->photo }}">
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>ID</div>
                    <div class=" text-left">{{ $user->id }}</div>
                </div>
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>Name</div>
                    <div class=" text-left">{{ $user->name }}</div>
                </div>
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>Email</div>
                    <div class=" text-left">{{ $user->email }}</div>
                </div>
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>Phone</div>
                    <div class=" text-left">{{ $user->phone }}</div>
                </div>
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>Position ID</div>
                    <div class=" text-left">{{ $user->position_id }}</div>
                </div>
                <div class="text-black dark:text-white w-full flex justify-between">
                    <div>Position</div>
                    <div class=" text-left">{{ $user->position->name }}</div>
                </div>
            </div>
        @endforeach
    </div>
    <div class="flex justify-center mt-5 mb-10 items-center">
        @if ($users->hasPages())
            <nav role="navigation" aria-label="Pagination Navigation">

                <span>
                    @if ($users->onLastPage())
                        <button disabled rel="next" class="cursor-not-allowed">Show more</button>
                    @else
                        <button wire:click.prevent="loadMore" rel="next">Show more</button>
                    @endif
                </span>
            </nav>
        @endif
    </div>
</div>
