import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function RoleDetail(){
    const [name, setName]=useState("");
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

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Role: <strong>{name}</strong></h2>
                    <div className="labels">
                        <div className="row2">
                            <span className="label">Id: </span>
                            <span className="value">{id}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Name: </span>
                            <span className="value">{name}</span>
                        </div>
                    </div>
                    <div className="buttonsWrapDetail">
                        <div className="postDetail">
                            <Link className="link" to="/roles/create">Post</Link>  
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link className="link" to={`/roles/${id}/update`}>Update</Link> 
                            </div>
                            <div className="backToDetail">
                                <Link className="link" to="/roles">Back to List</Link>
                            </div>
                        </div>
                    </div>
                </div>
                </> 
                :<h2>No Records</h2>
                }
           </div>
        </>
    )
}
export default RoleDetail;