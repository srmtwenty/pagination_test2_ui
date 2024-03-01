import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';

function ArticleList(){
    const [articles, setArticles]=useState([])
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const navigate=useNavigate();
    const loadArticles=()=>{
        axios.get("http://localhost:8080/articles")
            .then(res=>{
                console.log(res.data)
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadArticles();
        loadArticlesPagination();
    },[])

    const deleteArticle=(id)=>{
        axios.delete(`http://localhost:8080/articles/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/articles")
            })
            .catch(err=>console.log(err))
    }
    const loadArticlesPagination=()=>{
        axios.get(`http://localhost:8080/articles/${page}/${rowsPerPage}/${field}`)
            .then(res=>{   
                setArticles(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadArticlesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadArticlesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadArticlesPagination();
    }

    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                articles.length!=0?
                <>
                <h2 style={title}>Article List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                    <th>Address</th>
                                    <th>Date</th>
                                
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    articles.map(article=>
                                    <tr>
                                        <td><Link to={`/articles/${article.id}`}>{article.id}</Link></td>
                                        <td>{article.name}</td>
                                        <td>{article.address}</td>
                                        <td>{article.date}</td>
                                        
                                        <td><button onClick={()=>deleteArticle(article.id)}>Delete</button></td>
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
            
                    <h2>Article List is Empty</h2>
            
            }
            <Link to="/articles/create">Create Article</Link>
            </div>
            </div>
        </>
    )
}
export default ArticleList;