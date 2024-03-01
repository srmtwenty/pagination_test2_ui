import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function ComposerList(){
    const [composers, setComposers]=useState([])
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const loadComposers=()=>{
        axios.get("http://localhost:8080/composers")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadComposers();
        loadComposersPagination();
    },[])
    
    const deleteComposer=(id)=>{
        axios.delete(`http://localhost:8080/composers/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/composers")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadComposersPagination=()=>{
        axios.get(`http://localhost:8080/composers/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setComposers(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadComposersPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadComposersPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadComposersPagination();
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                composers.length!=0?
                <>
                <h2>Composer List</h2>
              
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
                            composers.map((com)=>(
                            <tr>
                                <td><Link to={`/composers/${com.id}`}>{com.id}</Link></td>
                                <td>{com.name}</td>
        
                                <td><button onClick={()=>deleteComposer(com.id)}>Delete Composer</button></td>
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
            <h2>Composer List is Empty</h2>
            }
        
        
        
            <Link to="/composers/create">Create Composer</Link>
            </div>
                </div>
        </>
    )
}
export default ComposerList;