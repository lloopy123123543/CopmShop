<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;

class CartController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function addInCart(Request $request){
        {
            $bearer = $request->header("authorization");
            $token = explode(" ", $bearer)[1];
            $user = User::all()->where("token", $token)->first();

            if ($bearer != '') {
                if ($user != null) {
                    $user_id = $user -> id;
                    $cart = new Cart();
                    $cart -> user_id = $user_id;
                    $cart -> computer_id = $request -> input("computer_id");
                    $cart -> save();
                    return response() -> json("success");
                }else{return response()->json("user not found");}
            }else{return response()->json("token is empty");}
        }
    }

    public function showCart(Request $request){
        {
            $bearer = $request->header("authorization");
            $token = explode(" ", $bearer)[1];
            $user = User::all()->where("token", $token)->first();

            if ($bearer != '') {
                if ($user != null) {
                    $user_id = $user -> id;
                    $cart = Cart::all() -> where("user_id", $user_id);
                    return response() -> json($cart);
                    return response() -> json("success");
                }else{return response()->json("user not found");}
            }else{return response()->json("token is empty");}
        }
    }
}
