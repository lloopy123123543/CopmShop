<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Comps_in_order;

class ComputersForOrderController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function addComputerForOrder(Request $request){
        {
            $bearer = $request->header("authorization");
            $token = explode(" ", $bearer)[1];
            $user = User::all()->where("token", $token)->first();

            if ($bearer != '') {
                if ($user != null) {
                    $cart = new Comps_in_order();
                    $cart -> order_id = $request -> input("order_id");
                    $cart -> computer_id = $request -> input("computer_id");
                    $cart -> save();
                    return response() -> json("success");
                }else{return response()->json("user not found");}
            }else{return response()->json("token is empty");}
        }
    }

}
