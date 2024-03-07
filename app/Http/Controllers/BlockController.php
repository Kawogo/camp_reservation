<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlockRequest;
use App\Models\Block;
use App\Models\Camp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Block/Index', ['blocks' => Block::with('camp')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Block/CreateBlock', ['camps' => Camp::all(['id', 'name'])]);    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlockRequest $request)
    {
        Block::create($request->validated());
        return redirect()->route('blocks.index')->with('message', 'Block data saved successfully.');

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
    public function edit(Block $block)
    {
        return Inertia::render('Block/EditBlock', ['block' => $block, 'camps' => Camp::all(['id', 'name'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlockRequest $request, Block $block)
    {
        $block->update($request->validated());
        return redirect()->route('blocks.index')->with('message', 'Block data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Block $block)
    {
        $block->delete();
        return redirect()->route('blocks.index')->with('message', 'Block data removed successfully.');
    }
}
