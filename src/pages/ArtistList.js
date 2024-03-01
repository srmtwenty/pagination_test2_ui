import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function ArtistList(){
    const [artists, setArtists]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadArtists=()=>{
        axios.get("http://localhost:8080/artists")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadArtists();
        loadArtistsPagination();
    },[])

    const deleteArtist=(id)=>{
        axios.delete(`http://localhost:8080/artists/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/artists")
            })
            .catch(err=>console.log(err))
    }

    const loadArtistsByName=(field)=>{
        axios.get(`http://localhost:8080/artists/sort/${field}`)
            .then(res=>{
                console.log(res.data)
                setArtists(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadArtistsPagination=()=>{
  
        axios.get(`http://localhost:8080/artists/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setArtists(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadArtistsPagination();
    }
    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadArtistsPagination();
        
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadArtistsPagination();
        
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                artists.length!=0?
                <>
                <h2>Artist List</h2>
              
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
                            artists.map(artist=>(
                            <tr>
                                <td><Link to={`/artists/${artist.id}`}>{artist.id}</Link></td>
                                <td>{artist.name}</td>
                                <td>
                                    <a href={`/artists/${artist.id}/update`}>Edit</a>
                                    <button onClick={()=>deleteArtist(artist.id)}>Delete</button>
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
                <h2>Artist List is Empty</h2>
            }
            
            <Link to="/artists/create">Post Artist</Link>
            </div>
            </div>
            
        </>
    )
}
export default ArtistList;