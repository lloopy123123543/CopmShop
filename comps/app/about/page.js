import React from 'react'

export default function about() {
  return (

            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">О НАС</h1>
                        <p className="font-normal text-base leading-6 text-gray-600 ">Наша команда состоит из одного разработчика, который трудится на благо всей планеты, чтобы у всех были мощные и дешевые компьютеры для игр и не только!</p>
                    </div>
                    <div className="w-full lg:w-8/12 ">
                        <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                    </div>
                </div>
    

            </div>

    
  )
}
