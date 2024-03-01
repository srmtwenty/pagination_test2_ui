import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';

function CompetitionList(){
    const [competitions, setCompetitions]=useState([])
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const loadCompetitions=()=>{
        axios.get("http://localhost:8080/competitions")
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadCompetitions();
        loadCompetitionsPagination();
    },[])

    const deleteCompetition=(id)=>{
        axios.delete(`http://localhost:8080/competitions/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/competitions")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadCompetitionsPagination=()=>{
        axios.get(`http://localhost:8080/competitions/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setCompetitions(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadCompetitionsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadCompetitionsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadCompetitionsPagination();
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                competitions.length!=0?
                <>
            <h2 style={{padding:"10px 0 10px 0"}}>Competition List</h2>
                <div className="rowTable">
                    <table>
                        <thead>
                            <tr>
                                <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                competitions.map((comp)=>(
                                <tr>
                                    <td><Link to={`/competitions/${comp.id}`}>{comp.id}</Link></td>
                                    <td>{comp.name}</td>
                                    <td>{comp.date.toLocaleString().split(',')[0]}</td>
                                    <td><button onClick={()=>deleteCompetition(comp.id)}>Delete Competition</button></td>
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
            <h2>Competition List is Empty</h2>
                
            }
            <div style={{padding:"10px 0 10px 0"}}>
                <Link to="/competitions/create">Create Competition</Link>
            </div>
            
            </div>
            </div>
        </>
    )
}
export default CompetitionList;