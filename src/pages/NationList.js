import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function NationList(){
    const [nations, setNations]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const loadNationList=()=>{
        axios.get("http://localhost:8080/nations")
            .then(res=>
                {
                    setTotal(res.data)
                }
            )
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadNationList();
        loadNationsPagination();
    },[])

    const deleteNation=(id)=>{
        axios.delete(`http://localhost:8080/nations/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/nations")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadNationsPagination=()=>{
        axios.get(`http://localhost:8080/nations/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setNations(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadNationsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadNationsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadNationsPagination();
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                nations.length!=0?
                <>
                <h2>Nation List</h2>
             
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
                            nations.map((nation)=>(
                            <tr>
                                <td><Link to={`/nations/${nation.id}`}>{nation.id}</Link></td>
                                <td>{nation.name}</td>
                                <td><button onClick={()=>deleteNation(nation.id)}>Delete</button></td>
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
                    <h2>Nation List is Empty</h2>
            }
            <Link to="/nations/create">Create Nation</Link>
            </div>
            </div>
        </>
    )
}
export default NationList;