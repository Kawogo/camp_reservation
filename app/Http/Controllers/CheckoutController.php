<?php

namespace App\Http\Controllers;

use App\Enums\CheckinStatus;
use App\Enums\RoomStatusEnum;
use App\Http\Requests\CheckoutRequest;
use App\Models\Checkin;
use App\Models\Checkout;
use App\Models\Member;
use App\Models\Room;
use App\Services\CheckoutService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Checkout/Index', ['checkouts' => Checkout::with('member')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $response = [
            'members' => Member::whereRelation('checkins', 'status' , CheckinStatus::Active->value)->get(['id', 'name']),
        ];
        return Inertia::render('Checkout/CreateCheckout', ['response' => $response]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CheckoutRequest $request, CheckoutService $service)
    {
        try {
            DB::beginTransaction();

            Checkout::create($request->validated());

            // CHECK IF THE MEMBER HAS ACTIVE CHECKIN
            $isActiveBooking = Checkin::where(['member_id' => $request->validated('member_id'), 'status' => CheckinStatus::Active->value])->first();
          

            if ($isActiveBooking) {
                // recalucate the onsite days
                $fromDate = \Carbon\Carbon::parse($isActiveBooking->from_date);
                $toDate = \Carbon\Carbon::parse($request->validated('leave_date'));
                $period_onsite = $toDate->diffInDays($fromDate) + 1;
                Checkin::where(['member_id' => $request->validated('member_id'), 'status' => CheckinStatus::Active->value])->update(
                    [
                        'status' => CheckinStatus::Closed->value,
                        'to_date' =>  $request->validated('leave_date'),
                        'period_onsite' => $period_onsite,
                        'from_date' => $isActiveBooking->from_date
                    ]
                );
                Room::where('id', '=', $isActiveBooking->room_id)->update(['status' => RoomStatusEnum::Open->value]);


                // send message
                $member = Member::find($request->validated('member_id'));
                // dd($member->phone);
                $service->sendSMS($member, Room::where('id', '=', $isActiveBooking->room_id)->first('number')->number);

            }

            DB::commit();
            return redirect()->route('checkouts.index')->with('message', 'Checkin data saved successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            return redirect()->route('checkouts.index')->with('message', 'Something went wrong, data not saved. Try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Checkout $checkout)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Checkout $checkout)
    {
        $response = [
            'members' => Member::all(['id', 'name']),
            'checkout' => $checkout
        ];
        return Inertia::render('Checkout/EditCheckout', ['response' => $response]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CheckoutRequest $request, Checkout $checkout)
    {
        try {
            DB::beginTransaction();

            $checkout->update($request->validated());

            // CHECK IF THE MEMBER HAS ACTIVE CHECKIN
            $isActiveBooking = Checkin::where(['member_id' => $request->validated('member_id'), 'status' => CheckinStatus::Active->value])->first();


            if ($isActiveBooking) {
                // Recalucate the onsite days
                $fromDate = \Carbon\Carbon::parse($isActiveBooking->from_date);
                $toDate = \Carbon\Carbon::parse($request->validated('leave_date'));
                $period_onsite = $toDate->diffInDays($fromDate) + 1;
                Checkin::where(['member_id' => $request->validated('member_id'), 'status' => CheckinStatus::Active->value])->update(
                    [
                        'status' => CheckinStatus::Closed->value,
                        'to_date' =>  $request->validated('leave_date'),
                        'period_onsite' => $period_onsite,
                        'from_date' => $isActiveBooking->from_date
                    ]
                );
                Room::where('id', '=', $isActiveBooking->room_id)->update(['status' => RoomStatusEnum::Open->value]);
            }

            DB::commit();
            return redirect()->route('checkouts.index')->with('message', 'Checkin data changed successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            return redirect()->route('checkouts.index')->with('message', 'Something went wrong, data not saved. Try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Checkout $checkout)
    {
        //
    }
}
