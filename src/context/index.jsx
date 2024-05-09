import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";




export const GlobalContext = createContext(null)


export default function GlobalState({children}){

    const [searchParam, setSearchParam] = useState("")
    const [loading, setLoading]= useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([])

    const navigate = useNavigate()
    
    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        try{
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data = await res.json()
            console.log(data);
            setLoading(false)

            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }

            console.log(data?.data?.recipes);
        }catch(e){
    
            console.log(e);
        }
    }
    
    function handleAddToFavorite(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList]
        const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)

        if(index === -1){
            cpyFavoritesList.push(getCurrentItem)
        }else{
             cpyFavoritesList.splice(index)     
        }
        setFavoritesList(cpyFavoritesList)
    }


    console.log("favoriteList", favoritesList, recipeList);

return(
        <GlobalContext.Provider value={{searchParam, loading, recipeList, setSearchParam, handleSubmit, recipeDetailsData, handleAddToFavorite, setRecipeDetailsData, favoritesList}}>
            {children}
        </GlobalContext.Provider>
    )
}