import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
export default function EditRecipe() {
    const [recipeData,setRecipeData]= useState({})
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        const getData = async()=>{
        await axios.get(`http://localhost:5000/recipe/${id}`)
        .then(response=>{
            let res = response.data
            setRecipeData({
              title:res.title,
              ingredients:res.ingredients.join(","),
              instructions:res.instructions,
              time:res.time
            })
        })
    }
    getData()
    },[])
const onHandleChange =(e)=>{
     let val =(e.target.name==='ingredients') ? e.target.value.split(","): (e.target.name==='file')? e.target.files[0]: e.target.value
     setRecipeData(pre=>({...pre,[e.target.name]:val}))
    }
const onHandleSubmit = async (e)=>{
  const token = localStorage.getItem("token");
console.log("Mon token envoyé est :", token); // Vérifie dans la console s'il s'affiche bien
      e.preventDefault()
      await axios.put(`http://localhost:5000/recipe/${id}`,recipeData,{
        headers:{
            'Content-Type':'multipart/form-data',
            'authorization': 'Bearer '+localStorage.getItem("token")
        }
      })
      .then(()=> navigate("/myRecipe"))
      .catch((err) => {
    // Ce code s'exécute si une erreur survient
    if (!err.response) {
      // Cas où le serveur est éteint (pas de réponse)
      console.log("Le serveur ne répond pas. Vérifiez s'il est allumé.");
      alert("Erreur : Impossible de contacter le serveur.");
    } else {
      // Cas où le serveur répond mais avec une erreur (ex: 400 ou 401)
      console.log("Erreur du serveur :", err.response.data.message);
      alert("Erreur : " + err.response.data.message);
    }
  });
    }
  return (
    <>
    <div className='container'>
        <form className='form' onSubmit={onHandleSubmit}>
            <div className='form-control'>
                <label> Title </label>
                <input type='text' className='input' name='title' onChange={onHandleChange} value={recipeData.title}></input>
            </div>
    <div className='form-control'>
        <label> Time </label>
        <input type='text' className='input' name='time' onChange={onHandleChange} value={recipeData.time}></input>
    </div>
    
        <div className='form-control'>
        <label> Ingredients </label>
        <textarea  className='input-textarea' name='ingredients' rows="5" onChange={onHandleChange} value={recipeData.ingredients}></textarea>
    </div>
     <div className='form-control'>
        <label> Instructions </label>
        <textarea  className='input-textarea' name='instructions' rows="5" onChange={onHandleChange} value={recipeData.instructions}></textarea>
    </div>
    <div className='form-control'>
        <label> Recipe Image </label>
        <input type='file' className='input' name='file' onChange={onHandleChange}></input>
    </div>
    <button type='submit'> Edit Recipe </button>
        </form>

    </div>
    </>
  )
}

