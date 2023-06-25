"use client";
import React, { useEffect, useRef, useState } from "react";

export default function page() {
  const [Computer, setComputer] = useState([]);
  function compucters() {
    let arr = []
    Computer.computers.map(sus => {console.log(sus.id)})
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/orders/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
    <div>
      <div className="w-full grid grid-cols-3">
        {Computer.map((comp) => {
          return (
            <div className="w-full flex" key={comp.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Компьютер</div>
                  <p className="text-gray-700 text-base">
                    Адрес: {comp.adres}
                  </p>
                  <p className="text-gray-700 text-base">
                    Статус: {comp.delivery }
                  </p>
                  <p className="text-gray-700 text-base">
                    {/* Общая цена: {comp.computers} */}
                  </p>
                  <p className="text-gray-700 text-base">
                    Общая цена: {comp.total_price}
                  </p>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
