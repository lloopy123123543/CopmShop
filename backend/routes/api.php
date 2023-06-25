<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ComputerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ComputersForOrderController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Роуты юзера
Route::prefix("users") -> group( function () {
    Route::post("login", [UserController::class, "login"]);
    Route::post("registration", [UserController::class, "registration"]);
});


// Роуты компьютера
Route::prefix("computers") -> group( function () {
    Route::post("add", [ComputerController::class, "ComputerAdd"]);
    Route::get("show", [ComputerController::class, "ComputerShow"]);
});

// Роуты Корзины
Route::prefix("carts") -> group( function () {
    Route::post("add/{id}", [CartController::class, "addInCart"]);
    Route::get("show", [CartController::class, "showCart"]);
    Route::delete("delete/{id}", [CartController::class, "deleteCart"]);
});

// Роуты компов для заказов
Route::prefix("comps_order") -> group( function () {
    Route::post("add", [ComputersForOrderController::class, "addComputerForOrder"]);
    Route::get("show", [ComputersForOrderController::class, "showCart"]);
});

// Роуты заказов
Route::prefix("orders") -> group( function () {
    Route::post("add", [OrderController::class, "addOrder"]);
    Route::get("show", [OrderController::class, "showOrder"]);
});


