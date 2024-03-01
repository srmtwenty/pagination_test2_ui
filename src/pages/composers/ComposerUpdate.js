import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function ComposerUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const {id}=useParams();
    const navigate=useNavigate();

    const loadComposer=()=>{
        axios.get(`http://localhost:8080/composers/${id}`)
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadComposer();
    },[])
    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/composers/${id}/update`, {
            name:name,
            description:description
        })
            .then(res=>{
                navigate(`/composers/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Composer</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <input type="submit" value="Update Composer"/>
                        </form>
                    </div>
                    
                    <Link to="/composers">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default ComposerUpdate;