<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomRequest;
use App\Models\Block;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Room/Index', ['rooms' => Room::with('block')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Room/CreateRoom', ['blocks' => Block::all(['id', 'name'])]);    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomRequest $request)
    {
        Room::create($request->validated());
        return redirect()->route('rooms.index')->with('message', 'Room data saved successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Block $block)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return Inertia::render('Room/EditRoom', ['room' => $room, 'blocks' => Block::all(['id', 'name'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomRequest $request, Room $room)
    {
        $room->update($request->validated());
        return redirect()->route('rooms.index')->with('message', 'Room data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('rooms.index')->with('message', 'Room data removed successfully.');
    }
}
