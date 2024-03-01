import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';

function PersonDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [gender, setGender]=useState(0)
    const [nationality, setNationality]=useState(1)
    const [allNationalities, setAllNationalities]=useState([])
    const [roles, setRoles]=useState([])
    const [allRoles, setAllRoles]=useState([])
    const [tags, setTags]=useState([])
    const [allTags, setAllTags]=useState([])
    const [snss, setSnss]=useState([])
    const [tName, setTName]=useState("")
    const [rName, setRName]=useState("")
    const [sName, setSName]=useState("")

    const {id}=useParams();
    const navigate=useNavigate();
    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`)
            .then(res=>{
                //console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setGender(res.data.gender)
                setNationality(res.data.nationality)
            })
            .catch(err=>console.log(err))
    }
    const loadAllRoles=()=>{
        axios.get("http://localhost:8080/roles")
            .then(res=>{
                setAllRoles(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadRolesForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/roles`)
            .then(res=>{
                //console.log(res.data)
                setRoles(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllTags=()=>{
        axios.get("http://localhost:8080/tags")
            .then(res=>{
                setAllTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadTagsForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/tags`)
            .then(res=>{
                //console.log(res.data)
                setTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadSNSForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/snss`)
            .then(res=>{
                //console.log(res.data)
                setSnss(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations")
            .then(res=>{
                setAllNationalities(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPerson()
        loadAllRoles()
        loadRolesForPerson()
        loadAllTags()
        loadTagsForPerson()
        loadSNSForPerson()
        loadAllNations()
    }, [])

    const addRole=(roleId)=>{
        axios.put(`http://localhost:8080/people/${id}/addRole/${roleId}`)
            .then(res=>{
                console.log("role has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeRole=(roleId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeRole/${roleId}`)
            .then(res=>{
                console.log("role has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag=(tagId)=>{
        axios.put(`http://localhost:8080/people/${id}/addTag/${tagId}`)
            .then(res=>{
                console.log("tag has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeTag=(tagId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeTag/${tagId}`)
            .then(res=>{
                console.log("tag has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/addTagAlt`,{
            name:tName
        })
            .then(res=>{
                setTName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
            })
            .catch(err=>console.log(err))
              
    }
    
    const addSNS=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/people/${id}/addSNS`,{
            name:sName
        })
            .then(res=>{
                setSName("")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSNS=(snsId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeSNS/${snsId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignNationality=(nationId)=>{
        axios.put(`http://localhost:8080/people/${id}/assignNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeNationality=(nationId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeNation/${nationId}`)
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
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
                            <span className="label">Gender: </span>
                            <span className="value">{gender}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Nationality: </span>
                            <span className="value">
                                {
                                    nationality?
                                    <><Link to={`/nations/${nationality.id}`}>{nationality.name}</Link>
                                        <button className="marginLeft" onClick={()=>removeNationality(nationality.id)}>Remove Nationality</button>
                                    </>:
                                    <>Null</>
                                }
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label2">Roles:</span>
                            <ul className="ultest2">
                            {   
                                roles.length!=0?
                                roles.map((r)=>(
                                    <li><Link to={`/roles/${r.id}`}>{r.name}</Link>
                                        <button className="marginLeft" onClick={()=>removeRole(r.id)}>Remove Role</button>
                                    
                                    </li>
                                )):
                                <>Null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <span className="label2">SNS:</span>
                            <ul className="ultest2">
                            {   
                                snss.length!=0?
                                snss.map((s)=>(
                                    <li><a href={s.name}>{s.name}</a>
                                        <button className="marginLeft" onClick={()=>removeSNS(s.id)}>Remove SNS</button>
                                    </li>
                                )):
                                <>Null</>
                            }<form onSubmit={addSNS}>
                                <div>
                                    <input type="text" placeholder="Enter SNS address" style={{width: "10em"}} onChange={(e)=>setSName(e.target.value)}/>
                                    <input type="submit" id="submitbtn"/>
                                </div>
                            </form>
                            </ul>   
                        </div>
                        
                        <div className="row2">    
                            <span className="label2">Tags:</span>
                            <div className="ultest2">
                                <ul>
                                    <li style={{verticalAlign:"top"}}>
                                        <form onSubmit={addTag2}>
                                            <div>
                                                <input type="text"  placeholder="Enter Tag Name" style={{width: "10em"}} onChange={(e)=>setTName(e.target.value)}/>
                                                <input type="submit" id="submitbtn"/>
                                            </div> 
                                        </form>
                                    </li>
                                </ul>
                                
                                <div className="tag_block"> 
                                    {   
                                    tags?
                                    tags.map((t)=>(
                                        <div className="tag_field">
                                            <a href={`/tags/${t.id}`} className="tag">{t.name}</a><button onClick={()=>removeTag(t.id)} className="buttonTag">x</button>
                                        </div>
                                    )):
                                    <>Null</>
                                    }
                                </div>
                            </div>
                              
                        </div> 
                        <div className="row2">
                            <p>{description}</p> 
                        </div>   
                    </div>
                    <div className="buttonsWrapDetail">
                        <div className="postDetail">
                            <Link to="/people/create">Post Person</Link>
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link to={`/people/${id}/update`}>Update</Link>
                            </div>
                            <div className="backToDetail">
                                <Link to="/people">Back to List</Link>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile_grid1">
                        <h2>All Roles</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                                allRoles.length!=0?
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
                                        allRoles.map((role)=>(
                                        <tr>
                                            <td>{role.id}</td>
                                            <td>{role.name}</td>
                                            <td>
                                                <button onClick={()=>addRole(role.id)}>Add Role</button>
                                                <button onClick={()=>removeRole(role.id)}>Remove Role</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                                <p>Role List is empty</p>
                            }
                            </div>
                        </div>
                </div>
                <div className="profile_grid1">
                    <h2>All Tags</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                            allTags.length!=0?
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
                                        allTags.map((tag)=>(
                                        <tr>
                                            <td>{tag.id}</td>
                                            <td>{tag.name}</td>
                                            <td>
                                                <button onClick={()=>addTag(tag.id)}>Add Tag</button>
                                                <button onClick={()=>removeTag(tag.id)}>Remove Tag</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>Tag List is Empty</p>
                            } 
                            </div>
                        </div>
                </div>  
                <div className="profile_grid1">
                    <h2>All Nations</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                            allNationalities.length!=0?
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
                                        allNationalities.map((an)=>(
                                        <tr>
                                            <td>{an.id}</td>
                                            <td>{an.name}</td>
                                            <td>
                                                <button onClick={()=>assignNationality(an.id)}>Assign Nationality</button>
                                                <button onClick={()=>removeNationality(an.id)}>Remove Nationality</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>Nations List is Empty</p>
                            } 
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
export default PersonDetail;