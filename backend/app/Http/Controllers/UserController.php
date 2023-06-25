<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function registration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "login" => "required|string",
            "email" => "required|string",
            "password" => "required|string",
            "phone" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => [
                    "message" => "validation failed",
                    "errors" => $validator->errors()
                ]
            ]);
        } else {
            $login = User::all()->where("login", $request->input("login"));
            if ($login != null) {
                $add = new User();
                $add->login = $request->input("login");
                $add->password = $request->input("password");
                $add->email = $request->input("email");
                $add->phone = $request->input("phone");
                $token = bin2hex(openssl_random_pseudo_bytes(16));
                $add->token = $token;
                $add->save();
                return response()->json(["token" => $token]);
            } else {
                return response()->json(["error" => ["errors" => "login alrady exist"]]);
            }
        }
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "login" => "required|string|min:4",
            // "email" => "required|string|email",
            "password" => "required|string"
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => [
                    "message" => "validation failed",
                    "errors" => $validator->errors()
                ]
            ]);
        } else {
            $user = User::all()->where("login", $request->input("login"))->first();
            if ($user != null) {
                if ($user->password == $request->input("password")) {
                    $token = bin2hex(openssl_random_pseudo_bytes(16));
                    $user->token = $token;
                    $user->save();
                    return response()->json(["token" => $token]);
                }
            } else {
                return response()->json([
                    "error" => [
                        "message" => "Login failes",
                        "errors" => "Login was not found"
                    ]
                ]);
            }
        }
    }

    public function show_users(Request $request)
    {
        $bearer = $request->header("authorization");
        $token = explode(" ", $bearer)[1];
        $user = User::all()->where("token", $token)->first();

        if ($bearer != '') {
            if ($user != null) {
                if ($user->login == 'admin') {
                    $show = User::all();
                    return response()->json($show);
                }else{return response()->json("forbidden for you");}
            }else{return response()->json("user not found");}
        }else{return response()->json("token is empty");}
    }
}
