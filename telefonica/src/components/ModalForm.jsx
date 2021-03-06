import React from 'react'
import {hot} from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField , Button} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Alert from '@material-ui/lab/Alert';
import InputMask from "react-input-mask";

const ModalForm = ({onSave ,modoEdicion = false , servicio = null , listServicio}) => {
  
    const [open, setOpen] = React.useState(false);
    const [error , setError] = React.useState(null)
    const [image , setImage]= React.useState(null)
    const [descripcion , setDescripcion]= React.useState('')
    const [host , setHost]= React.useState('')
    const [ip , setIp]= React.useState('')

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
          },
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
    }));
    const classes = useStyles();
  
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setImage('')
        setDescripcion('')
        setHost('')
        setIp('')

        setError(null)
        setOpen(false);
    };
    const handleFile = (e) => {
       
        setImage( e.target.files[0])
        
    }

    const procesarDatos = (e) => {
    
        e.preventDefault()
        
        
        if (!image) {
          
            setError( 'Seleccione una imagen.');
            return false;
        }

        if(!descripcion.trim()){
            setError('Ingrese Descripcion')
            return false;
        }
        
        if(!host.trim()){
            setError('Ingrese Host')
            return false;
        }

        if(ip == ''){
            setError('Ingrese ip')
            return false;
        }

        // si edicion es verdadera actualiza
        if(modoEdicion){
         
            servicio.image = image
            servicio.descripcion = descripcion
            servicio.host = host
            servicio.ip = ip
            onSave(servicio)
        }else{
          //sino inserta
            
            onSave({
                image: image,
                descripcion,
                host,
                ip
            })

            setImage('')
            setDescripcion('')
            setHost('')
            setIp('')
        }

        setError(null)
        handleClose()

    }

    React.useEffect(() => {
        if(servicio){
            setImage(servicio.image)
            setDescripcion(servicio.descripcion)
            setHost(servicio.host)
            setIp(servicio.ip)
        }
    } , [])

    
    return (
       
         <div className="mb-2">
             {
                 modoEdicion? (
                        <IconButton aria-label="delete" onClick={handleClickOpen}>
                            <CreateIcon fontSize="small" />
                        </IconButton>
                    ) 
                    : (
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            + New 
                        </Button>
                    )
             }
            
            <Dialog open={open}  onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {
                        modoEdicion ? 'Editar' : 'Agregar'
                    }
                </DialogTitle>
                    <DialogContent className={classes.root}>
                        { /* Si error no es null se agrega && muestra msj */
                            error && (
                               
                                <div>
                                     <Alert variant="filled" severity="error">
                                        {error}
                                    </Alert>
                                    
                                </div>
                            )
                        }
                        <input  type="file" 
                                onChange={handleFile}
                                name="image"
                                accept="image/*"
                                id="image" />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Descripcion"
                            type="text"
                            
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Host"
                            type="text"
                            value={host}
                            onChange={e => setHost(e.target.value)}
                        />
                       
                        <InputMask
                           mask="999 99 99 9"
                           autoFocus
                           margin="dense"
                           id="name"
                           label="IP"
                           type="text"
                           value={ip}
                           onChange={e => setIp(e.target.value)}
                           maskChar=" ">
                            {() => <TextField label="IP"/>}
                        </InputMask>

                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={procesarDatos} color="primary" type="submit">
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
       </div>
    )
}


export default hot(module)(ModalForm);