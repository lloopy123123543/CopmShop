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

  return (
    <div className="container w-full mx-auto grid grid-cols-3 gap-10">
      {Computer.map((comp) => {
        return (
          <div className="" key={comp.id}>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              {/* <img
                class="w-full"
                src="/img/card-top.jpg"
                alt="Sunset in the mountains"
              ></img> */}
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Компьютер</div>
                <p class="text-gray-700 text-base">
                    Процессор: {comp.cpu}
                </p>
                <p class="text-gray-700 text-base">
                    Видеокарта: {comp.gpu}
                </p>
                <p class="text-gray-700 text-base">
                    Оперативная память: {comp.ram}
                </p>
                <p class="text-gray-700 text-base">
                    Материнская плата: {comp.motherboard}
                </p>
                <p class="text-gray-700 text-base">
                    Процессор: {comp.cpu}
                </p>
                <p class="text-gray-700 text-base">
                    Корпус: {comp.box}
                </p>
                <p class="text-gray-700 text-base">
                    Блок питания: {comp.powerblock}
                </p>
                <p class="text-gray-700 text-base">
                    Накопитель: {comp.disk}
                </p>
                <p class="text-gray-700 text-base">
                    Охлаждение: {comp.cooling}
                </p>
                <p class="text-gray-700 text-base">
                    Стоимость: {comp.price} рублей
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button id={comp.id} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-700 hover:text-white">
                  Добавить в корзину
                </button>
   
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
