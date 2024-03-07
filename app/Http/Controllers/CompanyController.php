<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Company/Index', ['companies' => Company::paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Company/CreateCompany');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        Company::create($request->validated());
        return redirect()->route('companies.index')->with('message', 'Company data saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Inertia::render('Company/EditCompany', ['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $company->update($request->validated());
        return redirect()->route('companies.index')->with('message', 'Company data changed successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('companies.index')->with('message', 'Company data removed successfully.');

    }
}
