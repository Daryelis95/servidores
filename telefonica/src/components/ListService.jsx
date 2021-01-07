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
import CreateIcon from '@material-ui/icons/Create';

const ListService = () => {

    //minimo de ancho tabla
    const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
    });

    const classes = useStyles();

    const [page, setPage] = React.useState(0); //pagina
    const [rowsPerPage, setRowsPerPage] = React.useState(5); //filas por paginas
    
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

    //funcion para crear filas
    function createData(image, descripcion, host, ip, editar, eliminar) {
        return { image, descripcion, host, ip, editar, eliminar };
    }

    const rows = [
        createData('jpg', 'Frozen yoghurt', 'https://es.reactjs.org/', 190.05, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>, 
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Ice cream sandwich', 'https://es.reactjs.org/', 190.04,
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>, 
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Eclair','https://es.reactjs.org/', 190.03, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>, 
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Cupcake','https://es.reactjs.org/', 190.01,
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','yoghurt','https://es.reactjs.org/', 190.06,
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','sandwich','https://es.reactjs.org/', 190.07, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','cream','https://es.reactjs.org/', 190.08, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Frozen','https://es.reactjs.org/', 190.09, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Cupcake','https://es.reactjs.org/', 190.10, 
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Eclair','https://es.reactjs.org/', 190.11,
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
        createData('jpg','Gingerbread','https://es.reactjs.org/', 190.12,
            <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="small" />
            </IconButton>,
            <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
    ];
      
    function stableSort(array) {
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
    
  

    return (
        <div>
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
                        
                    {stableSort(rows)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row , index) => (
                        <StyledTableRow key={row.ip}>
                        <StyledTableCell component="th" scope="row" >
                            {row.image}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.descripcion}</StyledTableCell>
                        <StyledTableCell align="right">{row.host}</StyledTableCell>
                        <StyledTableCell align="right">{row.ip}</StyledTableCell>
                        <StyledTableCell align="right">{row.editar}</StyledTableCell>
                        <StyledTableCell align="right">{row.eliminar}</StyledTableCell>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}
export default hot(module)(ListService); 
