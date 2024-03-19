<?php

namespace App\Http\Controllers;

use App\Http\Requests\SectionRequest;
use App\Models\Department;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Section/Index', ['sections' => Section::with('department:id,name')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Section/CreateSection', ['departments' => Department::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SectionRequest $request)
    {
        Section::create($request->validated());
        return redirect()->route('sections.index')->with('message', 'Section data saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        return Inertia::render('Section/EditSection', ['departments' => Department::all(), 'section' => $section]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return redirect()->route('sections.index')->with('message', 'Section data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return redirect()->route('sections.index')->with('message', 'Section data removed successfully.');
    }
}
