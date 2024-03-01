import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function NationalTeamDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [nation, setNation]=useState(1)
    const [members, setMembers]=useState([])

    const [allNations, setAllNations]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const {id}=useParams();
    const navigate=useNavigate();
    const loadNationalTeam=()=>{
        axios.get(`http://localhost:8080/nationalTeams/${id}`)
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setNation(res.data.nation)
                setMembers(res.data.members)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations")
            .then(res=>{
                setAllNations(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people")
            .then(res=>{
                setAllPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNationalTeam()
        loadAllNations()
        loadAllPeople()
    }, [])

    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/assignNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const removeNation=(nationId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/removeNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/addPerson/${personId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/removePerson/${personId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2><strong>{name}</strong> Profile</h2>
                    <div className="labels">
                        <div className="row2">
                            <span className="label">Id: </span>
                            <span className="value">{id}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Name: </span>
                            <span className="value">{name}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Nation: </span>
                            <span className="value">
                            {
                                nation?
                                <><Link to={`/nations/${nation.id}`}>{nation.name}</Link><button className="marginLeft" onClick={()=>removeNation(nation.id)}>Remove Nation</button></>:
                                <>null</>
                            }</span>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
                        </div>  
                    </div>
                    <div className="buttonsWrapDetail">
                        <div className="postDetail">
                            <Link to="/nationalTeams/create">Post</Link> 
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link to={`/nationalTeams/${id}/update`}>Update</Link>
                            </div>
                            <div className="backToDetail">
                                <Link to="/nationalTeams">Back to List</Link>
                            </div>
                        </div>
                    </div>
                     
                      
                      
                </div>
                <div className="profile_grid1">
                    <h2>Members</h2>
                      
                            <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Roles</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        members.map((m, index)=>(
                                        <tr>
                                            <td>{m.id}</td>
                                            <td>{m.name}</td>
                                            <td>
                                                <ul>
                                                {
                                                    m.roles.map((r)=>(
                                                       <li style={{display:"inline-block", marginRight:"10px"}}><div className="roleBorder">{r.name}</div></li> 
                                                    ))
                                                }</ul>
                                            </td>
                                            <td><button onClick={()=>removePerson(m.id)}>Remove Member</button></td>
                                        </tr>    
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    
                </div>
                <div className="profile_grid1">
                    <h2>All People</h2>
                   
                            <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Roles</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPeople.map((p, index)=>(
                                        <tr>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            <td><ul>
                                                {
                                                    p.roles.map((role)=>(
                                                       <li>{role.name}</li> 
                                                    ))
                                                }</ul>
                                            </td>
                                            <td><button onClick={()=>addPerson(p.id)}>Add Person</button></td>                                        
                                        </tr>    
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                </div>
                <div className="profile_grid1">
                    <h2>All Nations</h2>
                        
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
                                        allNations.map((n, index)=>(
                                        <tr>
                                            <td>{n.id}</td>
                                            <td>{n.name}</td>
                                            <td><button onClick={()=>assignNation(n.id)}>Assign Nation</button></td>
                                        
                                        </tr>    
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                    </div>
                </div>
                </> 
                :<h2>No Records</h2>
                }
            </div>           
        </>
    )
}
export default NationalTeamDetail;