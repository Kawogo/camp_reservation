<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampRequest;
use App\Models\Camp;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Camp/Index', ['camps' => Camp::with('company:id,name')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Camp/CreateCamp', ['companies' => Company::all()]);
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CampRequest $request)
    {
        Camp::create($request->validated());
        return redirect()->route('camps.index')->with('message', 'Camp data saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Camp $camp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Camp $camp)
    {
        return Inertia::render('Camp/EditCamp', ['camp' => $camp, 'companies' => Company::all()]);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CampRequest $request, Camp $camp)
    {
        $camp->update($request->validated());
        return redirect()->route('camps.index')->with('message', 'Camp data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Camp $camp)
    {
        $camp->delete();
        return redirect()->route('camps.index')->with('message', 'Camp data changed successfully.');
    }
}
