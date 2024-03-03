import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function ArticleDetail(){
    const [name, setName]=useState("")
    const [address, setAddress]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")
    const [tName, setTName]=useState("")
    const [people, setPeople]=useState([])
    const [tags, setTags]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allTags, setAllTags]=useState([])
    const navigate=useNavigate();
    const {id}=useParams();

    const loadArticle=()=>{
        axios.get(`http://localhost:8080/articles/${id}`)
            .then(res=>{
                setName(res.data.name)
                setAddress(res.data.address)
                setDate(res.data.date)
                setDescription(res.data.description)
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
    const loadPeopleForArticle=()=>{
        axios.get(`http://localhost:8080/articles/${id}/people`)
            .then(res=>{
                //console.log(res.data)
                setPeople(res.data)
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
    const loadTagsForArticle=()=>{
        axios.get(`http://localhost:8080/articles/${id}/tags`)
            .then(res=>{
                //console.log(res.data)
                setTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadArticle();
        loadAllPeople();
        loadAllTags();
        loadPeopleForArticle();
        loadTagsForArticle();
    },[])

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/articles/${id}/addPerson/${personId}`)
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/articles/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/articles/${id}/removePerson/${personId}`)
            .then(res=>{
                console.log("Person has been removed!")
                window.location.reload();
                navigate(`/articles/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag=(tagId)=>{
        axios.put(`http://localhost:8080/articles/${id}/addTag/${tagId}`)
            .then(res=>{
                console.log("tag has been added!")
                window.location.reload();
                navigate(`/articles/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeTag=(tagId)=>{
        axios.put(`http://localhost:8080/articles/${id}/removeTag/${tagId}`)
            .then(res=>{
                console.log("tag has been removed!")
                window.location.reload();
                navigate(`/articles/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/articles/${id}/addTagAlt`,{
            name:tName
        })
            .then(res=>{
                setTName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
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
                            <span className="label">Address: </span>
                            <span className="value">{address}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Date: </span>
                            <span className="value">{date.toLocaleString().split(',')[0]}</span>
                        </div>
                        
                        <div className="row2">
                            <span className="label2">People:</span>
                            <ul className="ultest2">
                            {   
                                people.length!=0?
                                people.map((p)=>(
                                    <li><Link to={`/people/${p.id}`}>{p.name}</Link>
                                        <button className="marginLeft" onClick={()=>removePerson(p.id)}>Remove Person</button>
                                    
                                    </li>
                                )):
                                <>Null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
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
                            <Link className="link" to="/articles/create">Post Person</Link>
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link className="link" to={`/articles/${id}/update`}>Update</Link>
                            </div>
                            <div className="backToDetail">
                                <Link className="link" to="/articles">Back to List</Link>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile_grid1">
                        <h2>All People</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                                allPeople.length!=0?
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
                                        allPeople.map((person)=>(
                                        <tr>
                                            <td>{person.id}</td>
                                            <td>{person.name}</td>
                                            <td>
                                                <button onClick={()=>addPerson(person.id)}>Add Person</button>
                                                <button onClick={()=>removePerson(person.id)}>Remove Person</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                                <p>All People List is empty</p>
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
                </> 
                :<h2>No Records</h2>
                }
            </div>
        </>
    )
}
export default ArticleDetail;