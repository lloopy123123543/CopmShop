<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Comps_in_order;
class OrderController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function addOrder(Request $request){
        {
            $bearer = $request->header("authorization");
            $token = explode(" ", $bearer)[1];
            $user = User::all()->where("token", $token)->first();


            if ($bearer != '') {
                if ($user != null) {
                    $user_id = $user -> id;
                    $comps = Comps_in_order::all()->where("user_id", $user_id);
                    $order = new Orders();
                    $order -> user_id = $user_id;
                    $order -> adres = $request -> input("adres");
                    $order -> delivery = $request -> input("delivery");
                    return response()-> json($comps);
                    // $order -> total_price =
                    // $order -> save();
                    return response() -> json("success");
                }else{return response()->json("user not found");}
            }else{return response()->json("token is empty");}
        }

    }
}
