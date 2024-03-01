import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function RoleUpdate(){
    const [name, setName]=useState("");
    const navigate=useNavigate();
    const {id}=useParams();

    const loadRole=()=>{
        axios.get(`http://localhost:8080/roles/${id}`)
            .then(res=>{
                setName(res.data.name)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadRole();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/roles/${id}/update`,{
            name:name
        })
            .then(res=>
                    navigate(`/roles/${id}`)
                )
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Role</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            
                            <input type="submit" value="Update Role"/>
                        </form>
                    </div>
                    
                    <Link to="/roles">Back to List</Link>  
                </div>
            </div>
        </>
    )
}
export default RoleUpdate;