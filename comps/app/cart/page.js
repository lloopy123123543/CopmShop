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

            setCart(data)
          })
          .catch(error => console.log('Failed: ' + error.message));


    }, [])

    async function order() {
      let formData = {
        adres: ADRES.current.value,
      };
    
      try {
        // Send request to create order
        const response = await fetch('http://localhost:8000/api/orders/add',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        // Get the order id
        const orderId = data.id;
        console.log(orderId);
    
        // Send request to add computers to the order
        for (let i = 0; i <Cart.length; i++) {
          const formId = {
            computer_id: Cart[i].id,
            order_id: orderId,
          };
    
          const response2 = await fetch('http://localhost:8000/api/comps_order/add',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(formId),
          });
          const data2 = await response2.json();
          console.log(data2);
          if(i == 1) {
            alert("Заказано")
          }

        }
      } catch (error) {
        console.log('Failed: ' + error.message);
      }
    }
    async function deleteCart(e){
      let sus = document.getElementById(e.target.id)
      let idishnik = e.target.id
      sus.style.display = "none";



        fetch(`http://localhost:8000/api/carts/delete/${idishnik}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          })
          .then(response => response.json())
          .then(data => {
            
          })
          .catch(error => console.log('Failed: ' + error.message));




    }
      



  return (
    <div>
            <div className="container w-full mx-auto text-center my-10 font-bold text-indigo-500 text-2xl">Корзина</div>
    <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {!!Cart && Cart.map((comp) => {
        return (
          <div className="" key={comp.id} id={comp.id}>
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
                <div onClick={deleteCart} id={comp.id} className="bg-indigo-500 text-center mt-3 cursor-pointer px-3 py-1 rounded text-white hover:bg-indigo-300 hover:text-black">Удалить из корзины</div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
    <div className="w-full container mx-auto flex items-center justify-center mt-10">
      <form className="grid gap-10">
        <label>Адрес</label>
        <input ref={ADRES} className="border"></input>
      <div onClick={order} className="bg-indigo-500 px-3 py-1 rounded cursor-pointer text-white hover:bg-indigo-300 hover:text-black">Заказать все</div>
      </form>
    </div>
    </div>
  )
}
