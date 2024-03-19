<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Camp;
use App\Models\Checkin;
use App\Models\Department;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $response = [
            'totalDepartments' => Department::all()->count(),
            'totalCamps' => Camp::all()->count(),
            'totalMembers' => Member::all()->count(),
            'thisMonthCheckins' => Checkin::with(['member:id,name', 'room:id,number'])->where('created_at','>=' , Carbon::now()->subMonth())->paginate(10),
            'memberBlock' => Block::with('members:id,gender,block_id')->get(['id','name'])
        ];

        return Inertia::render('Dashboard', ['response' => $response]);
    }
}
