"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function shop() {
  const [Computer, setComputer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/computers/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComputer(data);
        console.log(data);
      })
      .catch((error) => console.log("Failed: " + error.message));
  }, []);

  function buy(e){
    let sus = document.getElementById(e.target.id)
    const idishnik = Number(e.target.id)
    sus.style.backgroundColor = "green";
    sus.style.color = "white";
    sus.innerHTML = "Добавлено"

    console.log(idishnik)

    fetch(`http://localhost:8000/api/carts/add/${idishnik}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) => {

      })
      .catch((error) => console.log("Failed: " + error.message));

  }

  return (
    <div>
      <div className="container w-full mx-auto text-center my-10 font-bold text-indigo-500 text-2xl">Ассортимент компьютеров</div>
          <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {!!Computer ? Computer.map((comp) => {
        return (
          <div className="" key={comp.id} >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              {/* <img
                className="w-full"
                src="/img/card-top.jpg"
                alt="Sunset in the mountains"
              ></img> */}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Компьютер</div>
                <p className="text-gray-700 text-base">
                    Процессор: {comp.cpu}
                </p>
                <p className="text-gray-700 text-base">
                    Видеокарта: {comp.gpu}
                </p>
                <p className="text-gray-700 text-base">
                    Оперативная память: {comp.ram}
                </p>
                <p className="text-gray-700 text-base">
                    Материнская плата: {comp.motherboard}
                </p>
                <p className="text-gray-700 text-base">
                    Процессор: {comp.cpu}
                </p>
                <p className="text-gray-700 text-base">
                    Корпус: {comp.box}
                </p>
                <p className="text-gray-700 text-base">
                    Блок питания: {comp.powerblock}
                </p>
                <p className="text-gray-700 text-base">
                    Накопитель: {comp.disk}
                </p>
                <p className="text-gray-700 text-base">
                    Охлаждение: {comp.cooling}
                </p>
                <p className="text-gray-700 text-base">
                    Стоимость: {comp.price} рублей
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <button onClick={buy} id={comp.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-700 hover:text-white">
                  Добавить в корзину
                </button>
   
              </div>
            </div>
          </div>
        );
      }): <div>Loading...</div>}
    </div>
    </div>
  );
}
