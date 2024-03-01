import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function NationUpdate(){
    const [name, setName]=useState("")
   
    const {id}=useParams();
    const navigate=useNavigate();
    const loadNation=()=>{
        axios.get(`http://localhost:8080/nations/${id}`)
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)

            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNation();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/nations/${id}/update`, {
            name:name
        })
            .then(res=>{
                navigate(`/nations/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Nation</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            
                            <input type="submit" value="Update Nation"/>
                        </form>
                    </div>
                    
                    <Link to="/nations">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default NationUpdate;