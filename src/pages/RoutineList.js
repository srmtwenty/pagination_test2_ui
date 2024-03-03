import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';            

function RoutineList(){
    const [routines, setRoutines]=useState([])
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadRoutines=()=>{
        axios.get("http://localhost:8080/routines")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadRoutines();
        loadRoutinesPagination();
    },[])

    const deleteRoutine=(id)=>{
        axios.delete(`http://localhost:8080/routines/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/routines")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadRoutinesPagination=()=>{
        axios.get(`http://localhost:8080/routines/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setRoutines(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadRoutinesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadRoutinesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadRoutinesPagination();
    }

    return(
        <>
            
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {routines.length!=0?
                <>
                    <h2>Routine List</h2>
         
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                    <th>Genre</th>
                                    <th>Type</th>
                                    <th>Rank</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    routines.map((r)=>(
                                    <tr>
                                        <td><Link to={`/routines/${r.id}`}>{r.id}</Link></td>
                                        <td>{r.name}</td>
                                        <td>{r.genre}</td>
                                        <td>{r.type}</td>
                                        <td>{r.rank}</td>
                                        <td>{r.date.toLocaleString().split(',')[0]}</td>
                                        <td>
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/routines/${r.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteRoutine(r.id)}>Delete</button>
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
           
                    <h2>Routine List is Empty</h2>
            }
            <div className="createLink">
                <Link className="link" to="/routines/create">Create Routine</Link>
            </div>
            
                    
            </div>
        </div>
        </>
    )
}
export default RoutineList;