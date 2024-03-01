import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function MusicList(){
    const [musics, setMusics]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadMusicList=()=>{
        axios.get("http://localhost:8080/musics")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadMusicList();
        loadMusicsPagination();
    },[])

    const deleteMusic=(id)=>{
        axios.delete(`http://localhost:8080/musics/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/musics")
            })
            .catch(err=>console.log(err))
    }
    const loadMusicsPagination=()=>{
        axios.get(`http://localhost:8080/musics/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setMusics(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadMusicsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadMusicsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadMusicsPagination();
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
             {
                musics.length!=0?
                <>
            <h2>Music List</h2>
          
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
                            musics.map((music)=>(
                            <tr>
                                <td><Link to={`/musics/${music.id}`}>{music.id}</Link></td>
                                <td>{music.name}</td>
                    
                                <td><button onClick={()=>deleteMusic(music.id)}>Delete Music</button></td>
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
            <h2>Music List is Empty</h2>
            }
            <Link to="/musics/create">Create Music</Link>
            </div>
            </div>
        </>
    )
}
export default MusicList;