<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Models\Company;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Department/Index', ['departments' => Department::with('company')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Department/CreateDepartment', ['companies' => Company::all(['id','name'])]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepartmentRequest $request)
    {
        Department::create($request->validated());
        return redirect()->route('departments.index')->with('message', 'Department data saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        return Inertia::render('Department/EditDepartment', ['department' => $department, 'companies' => Company::all(['id','name'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());
        return redirect()->route('departments.index')->with('message', 'Department data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('message', 'Department data removed successfully.');

    }
}
