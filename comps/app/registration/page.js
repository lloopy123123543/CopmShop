"use client"
import Link from 'next/link';
import React, { useRef } from 'react'

export default function page() {

  let logins = useRef();
  let passwords = useRef();
  let emails = useRef();
  let phones = useRef();

  function registration(){
    localStorage.setItem("token", null)

    let FormData = {
      login: logins.current.value,
      password: passwords.current.value,
      email:emails.current.value,
      phone: phones.current.value,
    };

    fetch("http://localhost:8000/api/users/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.token);

      })
      .catch((error) => alert(error.message));

  }
  return (
    <div>
    <section className=" dark:bg-gray-900">
<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">

        CompShop    
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Создайте в свой аккаунт
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Ваш логин</label>
                    <input ref={logins} type="text" name="login" id="login" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Fedor365" required=""></input>
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
                    <input ref={passwords} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Почта</label>
                    <input ref={emails} type="email" name="email" id="email" placeholder="lalaland@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Номер телефона</label>
                    <input ref={phones} type="text" name="phone" id="phone" placeholder="88005553535" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <Link href="/shop"><button onClick={registration} className="py-2 px-4 rounded bg-indigo-600 text-white">Создать</button></Link>

                    </div>

                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Еще нету аккаунта? <Link href="/registration"><div  className="font-medium text-primary-600 hover:underline">Зарегестрироваться</div></Link>
                </div>
            </form>
        </div>
    </div>
</div>
</section>
  </div>
  )
}
