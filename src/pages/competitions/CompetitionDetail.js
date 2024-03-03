import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function CompetitionDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [location, setLocation]=useState("")
    const [date, setDate]=useState(new Date());
    const [nation, setNation]=useState(1);
    const [allNations, setAllNations]=useState([])

    const {id}=useParams()
    const navigate=useNavigate();
    const loadCompetition=()=>{
        axios.get(`http://localhost:8080/competitions/${id}`)
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setLocation(res.data.location)
                setDate(res.data.date)
                setNation(res.data.nation)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations")
            .then(res=>{
                setAllNations(res.data)
            })
    }
    useEffect(()=>{
        loadCompetition();
        loadAllNations();
    },[])

    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/competitions/${id}/assignNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/competitions/${id}`)
            })
    }
    const removeNation=(nationId)=>{
        axios.put(`http://localhost:8080/competitions/${id}/removeNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/competitions/${id}`)
            })
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Competition: <strong>{name}</strong></h2>
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
                            <span className="label">Location: </span>
                            <span className="value">{location}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Nation: </span>
                            <span className="value">
                            {
                                nation?
                                <><Link to={`/nations/${nation.id}`}>{nation.name}</Link><button className="marginLeft" onClick={()=>removeNation(nation.id)}>Remove Nation</button></>:
                                <>null</>
                            }    
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label">Date: </span>
                            <span className="value">{date.toLocaleString().split(',')[0]}</span>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
                        </div>  
                    </div>
                </div>
                <div className="buttonsWrapDetail">
                    <div className="postDetail">
                        <Link className="link" to="/competitions/create">Post Competition</Link>
                    </div>
                    <div>
                        <div className="backToDetail">
                            <Link className="link" to={`/competitions/${id}/update`}>Update</Link>
                        </div>
                        <div className="backToDetail">
                            <Link className="link" to="/competitions">Back to List</Link>  
                        </div>
                    </div>                
                </div>
                
                <div className="profile_grid1">
                    <h2>All Nations</h2>
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
                                        allNations.map((nation, index)=>(
                                        <tr>
                                            <td>{nation.id}</td>
                                            <td>{nation.name}</td>
                                            <td><button onClick={()=>assignNation(nation.id)}>Assign Nation</button></td>
                                        
                                        </tr>    
                                        ))
                                    }
                                    
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
export default CompetitionDetail;