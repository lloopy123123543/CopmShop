<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Computers;
class ComputerController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function ComputerAdd(Request $request)
    {
        $bearer = $request->header("authorization");
        $token = explode(" ", $bearer)[1];
        $user = User::all()->where("token", $token)->first();

        if ($bearer != '') {
            if ($user != null) {
                if ($user->login == 'admin') {
                    $add = new Computers();
                    $add -> cpu = $request -> input('cpu');
                    $add -> gpu = $request -> input('gpu');
                    $add -> ram = $request -> input('ram');
                    $add -> motherboard = $request -> input('motherboard');
                    $add -> box = $request -> input('box');
                    $add -> powerblock = $request -> input('powerblock');
                    $add -> disk = $request -> input('disk');
                    $add -> cooling = $request -> input('cooling');
                    $add -> comp_image = $request -> file('comp_image');
                    $add -> price = $request -> input('price');
                    $add -> save();
                    return response() -> json(['message' => 'created' ]);
                }else{return response()->json("forbidden for you");}
            }else{return response()->json("user not found");}
        }else{return response()->json("token is empty");}
    }
    public function ComputerShow(){
        $comp = Computers::all();
        return response() -> json($comp);
    }

}
