import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UserPost(){
    const [name, setName]=useState("");
    const navigate=useNavigate();

    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/users/create",{
            name:name
        })
            .then(res=>
                    navigate("/users")
                )
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create User</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <input type="submit" value="Post User"/>
                        </form>
                    </div>
                      
                    <Link to="/users">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default UserPost;