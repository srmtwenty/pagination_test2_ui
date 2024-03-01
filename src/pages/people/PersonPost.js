import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';
function PersonPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [gender, setGender]=useState(0)

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/people/create", {
            name:name,
            description:description,
            gender:gender
        })
            .then(res=>{
                navigate("/people")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Post Person</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="34" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Gender:</label>
                                <select id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>
                            <input type="submit" value="Post Person"/>
                        </form>
                    </div>
                    
                    <Link to="/people">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default PersonPost;