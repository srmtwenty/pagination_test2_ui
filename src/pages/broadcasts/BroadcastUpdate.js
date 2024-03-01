import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import '../style1.css';
import Stack from '@mui/material/Stack';

function BroadcastUpdate(){
    const [name, setName]=useState("")
    const [url, setUrl]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")

    const {id}=useParams();
    const navigate=useNavigate();
    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/broadcasts/${id}/update`, {
            name:name,
            url:url,
            date:date,
            description:description
        })
            .then(res=>{
                navigate(`/broadcasts/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Broadcast</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">URL:</label>
                                <input type="text" onChange={(e)=>setUrl(e.target.value)} value={url}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <input type="submit" value="Update Broadcast"/>
                        </form>
                    </div>
                    <Link to="/broadcasts">Back to List</Link>
                </div>
            </div>
        </>
    )
}
export default BroadcastUpdate;