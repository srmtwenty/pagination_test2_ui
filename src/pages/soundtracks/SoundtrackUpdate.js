import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function SoundtrackUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    //const [musics, setMusics]=useState([])
    //const [allMusics, setAllMusics]=useState([])

    const navigate=useNavigate();
    const {id}=useParams();
    const loadSound=()=>{
        axios.get(`http://localhost:8080/soundtracks/${id}`)
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadSound();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/soundtracks/${id}/update`, {
            name:name,
            description:description
        })
            .then(res=>{
                navigate(`/soundtracks/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Soundtrack</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Soundtracks"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/soundtracks/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/soundtracks">Back to List</Link>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default SoundtrackUpdate;