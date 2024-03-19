<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Models\Block;
use App\Models\Camp;
use App\Models\Company;
use App\Models\Department;
use App\Models\Member;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Member/Index', ['members' => Member::with(['company:id,name', 'department:id,name', 'camp:id,name', 'block:id,name', 'room:id,number'])->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'companies' => Company::all(['id', 'name']),
            'departments' => Department::with('sections')->get(['id', 'name', 'company_id']),
            'camps' => Camp::all(['id', 'name', 'company_id']),
            'blocks' => Block::all(['id', 'name', 'camp_id']),
            'rooms' => Room::all(['id', 'number', 'block_id']),
        ];
        return Inertia::render('Member/CreateMember', ['response' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MemberRequest $request)
    {
        Member::create($request->validated());
        return redirect()->route('members.index')->with('message', 'Member data saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        return Inertia::render('Member/MemberDetails', ['member' => $member->load(['company:id,name', 'department:id,name', 'department.sections:id,name,department_id', 'camp:id,name', 'block:id,name', 'room:id,number'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        $data = [
            'companies' => Company::all(['id', 'name']),
            'departments' => Department::with('sections')->get(['id', 'name', 'company_id']),
            'camps' => Camp::all(['id', 'name', 'company_id']),
            'blocks' => Block::all(['id', 'name', 'camp_id']),
            'rooms' => Room::all(['id', 'number', 'block_id']),
            'member' => $member->load(['company:id,name', 'department:id,name', 'camp:id,name', 'block:id,name', 'room:id,number'])
        ];
        return Inertia::render('Member/EditMember', ['response' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MemberRequest $request, Member $member)
    {
        $member->update($request->validated());
        return redirect()->route('members.index')->with('message', 'Member data changed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->route('members.index')->with('message', 'Member data removed successfully.');
    }
}
