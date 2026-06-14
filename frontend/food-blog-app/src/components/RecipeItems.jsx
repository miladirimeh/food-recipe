import React, {useState, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodImg.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
export default function RecipeItems() {
  const recipes= useLoaderData()
  const [allRecipes, setAllRecipes]=useState()
    let path=window.location.pathname==="/myRecipe" ? true :false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe]= useState(false)
    console.log (allRecipes)
    useEffect(()=>{
    setAllRecipes(recipes)
    },[recipes])
  const onDelete = async (id) => {
  try {
    // 1. On tente la suppression sur le serveur
    const res = await axios.delete(`https://food-recipe-4-qk7s.onrender.com/recipe/${id}`);
    console.log(res);

    // 2. Si et seulement si le serveur a réussi, on met à jour l'interface React
    setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id));
    
    // 3. On met à jour les favoris dans le localStorage
    let filterItem = favItems.filter(recipe => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(filterItem));

  } catch (error) {
    // Si le serveur renvoie une erreur (ex: problème de connexion ou de droits)
    console.error("Erreur lors de la suppression :", error);
    alert("Impossible de supprimer la recette pour le moment.");
  }
};
  const favRecipe =(item)=>{
    let filterItem = favItems.filter(recipe=>recipe._id !== item._id)
   favItems=favItems.filter(recipe=>recipe._id===item._id).length===0 ?[...favItems,item]: filterItem
   localStorage.setItem("fav",JSON.stringify(favItems))
   setIsFavRecipe(pre =>!pre)
  }
  return (
    <>
    <div className='card-container'>
    {
      allRecipes?.map((item,index)=>{
        return( <div key={index} className='card'>
       <img src={`https://food-recipe-4-qk7s.onrender.com/images/${item.coverImage}`} width="120px" height="100px"></img>
       <div className='card-body'>
        <div className='title'>{item.title}</div>
        <div className='icons'>
        <div className='timer'><BsStopwatchFill />{item.time}</div>
        {(!path) ? <FaHeart onClick={()=> favRecipe(item)} style={{color:(favItems.some(res=>res._id===item._id))? "red": "" }}/> :
        <div className='action'>
        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
       <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon' />
        </div>}
        

        </div>
        </div>
        </div>)
      })
    }
    </div>
    </>
  )
}