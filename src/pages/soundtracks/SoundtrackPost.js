import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function SoundtrackPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/soundtracks/create", {
            name:name,
            description:description
        })
            .then(res=>{
                navigate("/soundtracks")
            })
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Soundtrack</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <input type="submit" value="Post Soundtrack"/>
                        </form>
                    </div>
                    
                    <Link to="/soundtracks">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default SoundtrackPost;