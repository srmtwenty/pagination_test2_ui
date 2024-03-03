import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function TagList(){
    const [tags, setTags]=useState([])

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const navigate=useNavigate();

    const loadTags=()=>{
        axios.get("http://localhost:8080/tags")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadTags();
        loadTagsPagination()
    },[])
    const deleteTag=(tagId)=>{
        axios.delete(`http://localhost:8080/tags/${tagId}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/tags")
            }
            )
            .catch(err=>console.log(err))
    }

    const loadTagsPagination=()=>{
        axios.get(`http://localhost:8080/tags/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setTags(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadTagsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadTagsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadTagsPagination();
    }
    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    {tags.length!=0?
                    <>
                    <h2 style={title}>Tag List</h2>
                   
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
                                tags.map(tag=>(
                                <tr>
                                    <td><Link to={`/tags/${tag.id}`}>{tag.id}</Link></td>
                                    <td>{tag.name}</td>
                                    <td>
                                        <div className="tdButtonWrapper">
                                            <div className="tdButtonContainer1">
                                                <Link className="link" to={`/articles/${tag.id}/update`}>Edit</Link>    
                                            </div>
                                            <div className="tdButtonContainer2">
                                                <button onClick={()=>deleteTag(tag.id)}>Delete</button>
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
                            <h2>Tag List is Empty</h2>  
                    }
                    <div className="createLink">
                        <Link className="link" to="/tags/create">Create Tag</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TagList;