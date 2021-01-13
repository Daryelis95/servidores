import React from 'react'
import {hot} from 'react-hot-loader';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalForm from './ModalForm';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

const ListService = () => {

    const [page, setPage] = React.useState(0); //pagina
    const [rowsPerPage, setRowsPerPage] = React.useState(5); //filas por paginas
    const [servicios, setServicios] = React.useState([]); //filas por paginas

    const obtenerData = () => {

        axios.get(`/api/service`)
        .then(res => {
            const services = res.data;
            setServicios(services);
        })
    }

    React.useEffect(() => {
    
        obtenerData()
    
    },[])

    
    //minimo de ancho tabla
    const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
        image: {
            width: 128,
            height: 128,
        },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    });

    const classes = useStyles();

    
    //estilo de celdas
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);

    //estilos de fila
    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
    }))(TableRow);

    
      
    const stableSort = (array)=> {
        const stabilizedThis = array.map((el, index) => [el, index]);
        return stabilizedThis.map((el) => el[0]);
    }

    //Funcion para cambiar de pagina
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    //funcion para cambiar fila por paginas
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  
    //Funcion para insertar nuevo servicio
    const insertService = (service) => {
       console.log(service); 
        axios.post(`/api/service`, service )
        .then(res => {
            obtenerData()
        })
        
    }

    //Funcion para editar nuevo servicio
    const editService = (service) => {
       
        axios.put(`/api/service/${service.id}`, service )
        .then(res => {
         
            console.log(res.data);
            obtenerData()
        })
       
    }

    //Funcion para eliminar servicio
    const eliminar = (id) =>{

        axios.delete(`/api/service/${id}`)
        .then(res => {
         
            const arrayFiltrado = servicios.filter(item => item.id !== id)
            setServicios(arrayFiltrado) 
        })
        
    }
    //confirmacion para eliminar servicio
    const ConfmEliminar =  (id) => {
       
        
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='alert alert-secondary border border-danger' role="alert">
                  <h1>Alerta</h1>
                  <p>¿Desea eliminar este registro?</p>
                    <button className='btn btn-secondary mr-2' onClick={onClose}>No</button>
                    <button className='btn btn-secondary'
                        onClick={() => {
                    
                            eliminar(id)
                        onClose();
                        }}
                    >
                        Si
                    </button>
                </div>
              );
            }
        });
       
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return; //verifica si el destino existe sino sale de la funcion
        const items = servicios;
        const [reorderedItem] = items.splice(result.source.index, 1); //elemento arrastrado
        items.splice(result.destination.index, 0, reorderedItem); // Luego usamos nuestro destination.inddex
        setServicios(items);                                         //para agregar ese elemento nuevamente a la matriz, pero en su nueva ubicación, 
    }                                            //nuevamente usandosplice
    
    return (
        <div>
            <ModalForm onSave={insertService}/>
            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Imagen</StyledTableCell>
                            <StyledTableCell align="right">Descripcion</StyledTableCell>
                            <StyledTableCell align="right">HOST</StyledTableCell>
                            <StyledTableCell align="right">IP</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                        
                    </TableHead>
                   
                            <TableBody>
                            
                                {stableSort(servicios)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row , index) => (
                                  
                                       
                                            <StyledTableRow key={row.id}  index={index}>
                                                <StyledTableCell component="th" scope="row" className={classes.image} >
                                                    <img className={classes.img} alt="image" src={`storage/${row.image}`}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.descripcion}</StyledTableCell>
                                                <StyledTableCell align="right">{row.host}</StyledTableCell>
                                                <StyledTableCell align="right">{row.ip}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <ModalForm onSave={editService} modoEdicion = {true} servicio={row} listServicio = {servicios}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <IconButton aria-label="delete" className={classes.margin} onClick={() => ConfmEliminar(row.id)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton >
                                                </StyledTableCell>
                                            </StyledTableRow>
                                           

                                 
                                ))}
                               
                                </TableBody>
                   
                    <TableFooter>
                    <TableRow>
                  
                    </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={servicios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}
export default hot(module)(ListService); 
