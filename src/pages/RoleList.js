import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function RoleList(){
    const [roles, setRoles]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadRoles=()=>{
        axios.get("http://localhost:8080/roles")
            .then(res=>{
                setTotal(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadRoles();
        loadRolesPagination();
    },[])
    const deleteRole=(id)=>{
        axios.delete(`http://localhost:8080/roles/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/roles")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadRolesPagination=()=>{
        axios.get(`http://localhost:8080/roles/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setRoles(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadRolesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadRolesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadRolesPagination();
    }


    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {roles.length!=0?
            <>
            <h2>Role List</h2>
         
                <div className="rowTable">
            <table>
                <thead>
                    <tr>
                        <th><button onClick={()=>handleFieldName("id")}><span>Id</span></button></th>
                        <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(role=>(
                        <tr>
                            <td><Link to={`/roles/${role.id}`}>{role.id}</Link></td>
                            <td>{role.name}</td>
                            <td>
                                <div className="tdButtonWrapper">
                                        <div className="tdButtonContainer1">
                                            <Link className="link" to={`/roles/${role.id}/update`}>Edit</Link>    
                                        </div>
                                        <div className="tdButtonContainer2">
                                            <button onClick={()=>deleteRole(role.id)}>Delete</button>
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
            
                    <h2>Role List is Empty</h2>
                
            }
            <div className="createLink">
                <Link className="link" to="/roles/create">Post Role</Link>
            </div>
            
            </div>
            </div>
        </>
    )
}
export default RoleList;