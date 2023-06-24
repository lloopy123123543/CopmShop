"use client"
import React, { useRef } from 'react'
import Link from 'next/link'

export default function login() {
  let logins = useRef();
  let passwords = useRef();
  function login(){
    localStorage.setItem("token", null)

    let FormData = {
      login: logins.current.value,
      password: passwords.current.value,
    };

    fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem(token))
      })
      .catch((error) => alert("Что-то пошло не так, убедитесь что все введено верно"));
  }
  return (
    <div>
      <section class=" dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">

          CompShop    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Войдите в свой аккаунт
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Ваш логин</label>
                      <input ref={logins} type="text" name="login" id="login" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Fedor365" required=""></input>
                  </div>
                  <div>
                      <label  class="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
                      <input ref={passwords} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        <button onClick={login} className="py-2 px-4 rounded bg-indigo-600 text-white">Войти</button>

                      </div>

                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                      <div class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Еще нету аккаунта? <Link href="/registration"><div  class="font-medium text-primary-600 hover:underline">Зарегестрироваться</div></Link>
                  </div>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
