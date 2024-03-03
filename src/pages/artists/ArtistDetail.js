import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';

function ArtistDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [musics, setMusics]=useState([])

    const {id}=useParams();
    const navigate=useNavigate();
    const loadArtist=()=>{
        axios.get(`http://localhost:8080/artists/${id}`)
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }
    const loadMusics=()=>{
        axios.get(`http://localhost:8080/artists/${id}/musics`)
            .then(res=>{
                setMusics(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadArtist()
        loadMusics()
    }, [])

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Artist: <strong>{name}</strong></h2>
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
                            <span className="label2">Musics(ref):</span>
                            <ul className="ultest2">
                            {
                                musics.map((music)=>(
                                    <li><Link to={`/musics/${music.id}`}>{music.name}</Link></li>
                                ))
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
                        </div> 
                    </div>
                    <div className="buttonsWrapDetail">
                        <div className="postDetail">
                            <Link className="link" to="/artists/create">Post</Link>
                        </div>
                        <div>
                           <div className="backToDetail">
                                <Link className="link" to={`/artists/${id}/update`}>Update</Link>  
                            </div>
                            <div className="backToDetail">
                                <Link className="link" to="/artists">Back to List</Link>  
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
export default ArtistDetail;