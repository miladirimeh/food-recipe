import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.jpg'
import Navbar  from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  const [isOpen,setIsOpen] = useState(false)
  const addRecipe = () =>{
    let token = localStorage.getItem("token")
    if(token)
  navigate("/addRecipe")
else {
  setIsOpen(true)
}
  }
  return (
    <>
    <section className='home'>
    <div className='left'>
        <h1>Foud Recipe</h1>
        <h5>we have a massive collection of recipes that are submitted, rated and reviewed by people who are passionate about food.</h5>
        <button onClick={addRecipe}>Share your recipe </button>
    </div>
    <div className='right'>
        <img src={foodRecipe} width="320px" height="300px"></img>
    </div>
    </section>
    <div className='bg'>
    </div>
        {(isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    <div className='recipe'>
        <RecipeItems/>
    </div>
    </>
  )
}
