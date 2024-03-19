<?php

namespace App\Http\Controllers;

use App\Enums\CheckinStatus;
use App\Enums\RoomStatusEnum;
use App\Exports\CheckinsExport;
use App\Exports\CheckoutsExport;
use App\Http\Requests\CheckinRequest;
use App\Models\Checkin;
use App\Models\Member;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CheckinController extends Controller
{

    public function export()
    {
        // dd('Here');
        return Excel::download(new CheckinsExport, 'Checkins.xlsx');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Checkin/Index', ['checkins' => Checkin::with(['member:id,name', 'room:id,number'])->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $response = [
            'members' => Member::all(['id', 'name']),
            'rooms' => Room::where('status', '=', RoomStatusEnum::Open->value)->get(['id', 'number']),
            'status' => CheckinStatus::cases()
        ];
        return Inertia::render('Checkin/CreateCheckin', ['response' => $response]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CheckinRequest $request)
    {
        try {
            DB::beginTransaction();

            Checkin::create($request->validated());

            if ($request->validated('status') == CheckinStatus::Active->value) {
                # code...
                Room::find($request->validated('room_id'))->update(['status' => RoomStatusEnum::Full->value]);
            }

            DB::commit();
            return redirect()->route('checkins.index')->with('message', 'Checkin data saved successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            return redirect()->route('checkins.index')->with('message', 'Something went wrong, data not saved. Try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Checkin $checkin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Checkin $checkin)
    {
        $response = [
            'members' => Member::all(['id', 'name']),
            'rooms' => Room::where('status', '=', RoomStatusEnum::Open->value)->get(['id', 'number']),
            'status' => CheckinStatus::cases(),
            'checkin' => $checkin
        ];
        return Inertia::render('Checkin/EditCheckin', ['response' => $response]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CheckinRequest $request, Checkin $checkin)
    {
        try {
            DB::beginTransaction();

            if ($request->validated('status') == CheckinStatus::Closed->value) {
                # code...
                Room::find($request->validated('room_id'))->update(['status' => RoomStatusEnum::Open->value]);
            }

            if ($checkin->room_id != $request->validated('room_id')) {
                Room::find($checkin->room_id)->update(['status' => RoomStatusEnum::Open->value]);
                Room::find($request->validated('room_id'))->update(['status' => RoomStatusEnum::Full->value]);
            }

            $checkin->update($request->validated());


            DB::commit();
            return redirect()->route('checkins.index')->with('message', 'Checkin data changed successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            return redirect()->route('checkins.index')->with('message', 'Something went wrong, data not saved. Try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Checkin $checkin)
    {
        $checkin->delete();
        Room::find($checkin->room_id)->update(['status' => RoomStatusEnum::Open->value]);
        return redirect()->route('checkins.index')->with('message', 'Checkin data removed successfully.');
    }
}
