import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function NationDetail(){
    const [name, setName]=useState("")
    const [people, setPeople]=useState([])
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
    const loadPeopleForNation=()=>{
        axios.get(`http://localhost:8080/nations/${id}/people`)
            .then(res=>{
                console.log(res.data)
                setPeople(res.data)

            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNation()
        loadPeopleForNation()
    }, [])

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Nation: <strong>{name}</strong></h2>
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
                            <Link className="link" to="/nations/create">Post</Link>
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link className="link" to={`/nations/${id}/update`}>Update</Link>
                            </div>
                            <div className="backToDetail">
                                <Link className="link" to="/nations">Back to List</Link>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile_grid1">
                    <h2>People For Nation(ref)</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        people.map((p)=>(
                                        <tr>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            
                                        </tr>
                                        ))}  
                                </tbody>
                            </table>
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
export default NationDetail;