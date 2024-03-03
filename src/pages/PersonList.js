import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';

function PersonList(){
    const [people, setPeople]=useState([])
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadPeople=()=>{
        axios.get("http://localhost:8080/people")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadPeople();
        loadPeoplePagination();
    },[page, field, rowsPerPage, field])

    const deletePerson=(id)=>{
        axios.delete(`http://localhost:8080/people/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/people")
            })
            .catch(err=>console.log(err))
    }
    const loadPeoplePagination=()=>{
        axios.get(`http://localhost:8080/people/${page}/${rowsPerPage}/${field}`)
            .then(res=>{ 
                //console.log(res.data.content)  
                setPeople(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadPeoplePagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadPeoplePagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        //setRowsPerPage(e.target.value);
        setPage(0);
        //loadPeoplePagination();
    }
    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                people.length!=0?
                <>
                <h2 style={title}>Person List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                    <th>Description</th>
                                    <th>Nationality</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    people.map(person=>
                                    <tr>
                                        <td><Link to={`/people/${person.id}`}>{person.id}</Link></td>
                                        <td>{person.name}</td>
                                        <td>{person.description}</td>
                                        <td>{
                                            person.nationality?
                                            <>{person.nationality.name}</>:
                                            <>Null</>
                                            }
                                        </td>
                                        <td>{person.gender}</td>
                                        <td>
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/people/${person.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deletePerson(person.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>    
                                    )
                                }
                            </tbody>
                        </table>
                        <Stack alignItems="left">
                        <TablePagination 
                            rowsPerPageOptions={[10, 25, 50]} 
                            component="div"
                            count={total.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage} 
                            onRowsPerPageChange={handleChangeRowsPerPage} 
                        />
                        </Stack>
                </div>
            </>:
                    <h2>Person List is Empty</h2>
            }
            <div className="createLink">
                <Link className="link" to="/people/create">Create Person</Link>
            </div>
           
            </div>
            </div>
        </>
    )
}
export default PersonList;