import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function SoundtrackList(){
    const [soundtracks, setSoundtracks]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadSoundtrackList=()=>{
        axios.get("http://localhost:8080/soundtracks")
            .then(res=>
                {
                    setTotal(res.data)
                }
            )
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadSoundtrackList();
        loadSoundtracksPagination();
    },[page])
    
    const deleteSoundtrack=(id)=>{
        axios.delete(`http://localhost:8080/soundtracks/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/soundtracks")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadSoundtracksPagination=()=>{
        axios.get(`http://localhost:8080/soundtracks/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setSoundtracks(res.data.content)
               
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadSoundtracksPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadSoundtracksPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadSoundtracksPagination();
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {soundtracks.length!=0?
            <>
            <h2>Soundtracks List</h2>
                <div className="rowTable">
                <table>
                    <thead>
                        <tr>
                            <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                            <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            soundtracks.map(sound=>(
                            <tr>
                                <td><Link to={`/soundtracks/${sound.id}`}>{sound.id}</Link></td>
                                <td>{sound.name}</td>
                                <td>
                                    <div className="tdButtonWrapper">
                                        <div className="tdButtonContainer1">
                                            <Link className="link" to={`/soundtracks/${sound.id}/update`}>Edit</Link>    
                                        </div>
                                        <div className="tdButtonContainer2">
                                            <button onClick={()=>deleteSoundtrack(sound.id)}>Delete</button>
                                        </div>                                        
                                    </div>    
                                </td>
                            </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                <Stack alignItems="left">
                <TablePagination 
                    rowsPerPageOptions={[10, 25, 50]} 
                    count={total.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage} 
                    onRowsPerPageChange={handleChangeRowsPerPage} 
                />
                </Stack>
            </div>
               
            </>:
            
                <h2>Soundtrack List is Empty</h2>
                
            }<div className="createLink">
                <Link className="link" to="/soundtracks/create">Post Soundtrack</Link>
            </div>
            
            </div>
                </div>
        </>
    )
}
export default SoundtrackList;