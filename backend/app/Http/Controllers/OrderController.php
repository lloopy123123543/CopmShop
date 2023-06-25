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
use App\Models\Computers;

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
                    $order -> delivery = 1;
                    $order -> save();

                    return response() -> json(["id" => $order->id]);
                }else{return response()->json("user not found");}
            }else{return response()->json("token is empty");}
        }

    }
    public function showOrder(Request $request)
    {
        $bearer = $request->header("authorization");
        if (!$bearer) {
            return response()->json("Token is empty");
        }

        $token = explode(" ", $bearer)[1];
        $user = User::where("token", $token)->first();
        if (!$user) {
            return response()->json("User not found");
        }

        $orders = Orders::all();

        $result = [];
        foreach($orders as $order) {
            $comp_ids = Comps_in_order::where("order_id", $order->id)->pluck("computer_id");
            $computers = Computers::whereIn("id", $comp_ids)->get();
            $total_price = $order->delivery == 'pickup' ? 0 : $order->delivery_cost;

            foreach($computers as $computer){
                $total_price += $computer->price;
            }

            $result[] = [
                "adres" => $order->adres,
                "delivery" => $order->delivery,
                "computers" => $computers,
                "total_price" => $total_price
            ];
        }

        return response()->json($result);
    }
}
