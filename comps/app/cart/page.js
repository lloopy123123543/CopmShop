"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function cart() {
    const [Cart, setCart] = useState([])
    const ID = useRef()


    const ADRES = useRef()
    useEffect(() => {

        fetch('http://localhost:8000/api/carts/show',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.length)
            setCart(data)
          })
          .catch(error => console.log('Failed: ' + error.message));


    }, [])

    function order(){
      let FormData = {
        adres: ADRES.current.value,

      };
 

      // запрос на добавление заказа
      fetch('http://localhost:8000/api/orders/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(FormData),
      })
      .then(response => response.json())
      .then(data => {
        ID.current = data.id
        console.log(ID.current)

      })
      .catch(error => console.log('Failed: ' + error.message));


// Запрос на добавление компьютеров из заказа в таблицу

let FormID = {
  computer_id: 2,
  order_id: ID.current,
};
      for (let i = 0; i < Cart.length; i++) {
        fetch('http://localhost:8000/api/comps_order/add',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(FormID),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.length)
        })
        .catch(error => console.log('Failed: ' + error.message));
      }






    }
      



  return (
    <div>
    <div className="container w-full mx-auto grid grid-cols-3 gap-10">
      {!!Cart ? Cart.map((comp) => {
        return (
          <div className="" key={comp.id}>
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
            </div>
          </div>
        );
      }): <div>Loading</div>}
    </div>
    <div className="w-full container mx-auto flex items-center justify-center mt-10">
      <form className="flex gap-10">
        <label>Адрес</label>
        <input ref={ADRES} className="border"></input>
      <div onClick={order} className="bg-indigo-500 px-3 py-1 rounded text-white hover:bg-indigo-300 hover:text-black">Заказать все</div>
      </form>
    </div>
    </div>
  )
}
