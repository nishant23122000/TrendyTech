import React from "react";
import "./bucket.scss";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import AddIcons from "@mui/icons-material/Add";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {useDispatch,useSelector} from "react-redux";
import {getBuckets,addBucket} from "../../store/actions/bucketAction";
import {getTasksByBucketId} from "../../store/actions/taskAction";
import { ADD_CURRENT_BUCKET } from "../../store/actions/actionType";

function SimpleDialog(props) {
    const dispatch = useDispatch();
    const { onClose,open} = props;
    const [name,setName]=React.useState("");
    const handleClose = () => onClose();


    const handleChange = (e) => setName(e.target.value);

    const handleSubmit=()=>dispatch(addBucket(name,onClose));
    
    return (
        <Dialog fullWidth onClose={handleClose} open={open}>
            <DialogTitle>Add New Bucket</DialogTitle>
            <div className="dialog">
                <TextField name={name} onChange={handleChange} fullWidth id="standard-basic" label="Bucket Name" variant="standard" />
                <br />
                <br />
                <Button disabled={!name} onClick={handleSubmit} fullWidth variant="contained" startIcon={<AddIcons />}>
                    Add Bucket
                </Button>
            </div>
        </Dialog>
    );
}
const Bucket = (props) => {

    const dispatch = useDispatch();
    const buckets=useSelector((state)=>state.bucket.buckets);
    
    React.useEffect(() => {
        dispatch(getBuckets())
       
    }, [])
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => setOpen(true);

    const handleClose = (value) =>  setOpen(false);
    const handleBucketClick=(bucket)=>{
        dispatch({type:ADD_CURRENT_BUCKET,payload:bucket});
        dispatch(getTasksByBucketId(bucket._id));
    }
    return (
        <div className="bucket_section">
            <div className="bucket_heading">
            <Button fullWidth onClick={handleClickOpen} variant="contained" startIcon={<AddIcons />}>
                    Add Bucket
                </Button>
            </div>
            <div className="bucket_list">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        !buckets.length ? (
                            <h4 className="not_found">No bucket found, please add one.</h4>
                        ) : (
                            
                                buckets.map((bucket) => {
                                    return (
                                        <React.Fragment key={bucket._id}>
                                            <ListItemButton
                                            onClick={()=>handleBucketClick(bucket)}
                                                className="list"
        
                                            >
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={bucket.name}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline', }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    Created At : {new Date(bucket.createdAt).toLocaleString()}
                                                                </Typography>
        
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </ListItemButton>
        
                                        </React.Fragment>
        
                                    )
                                })
                            
                        )
                        
                    }


                </List>
            </div>
            <SimpleDialog
            
                
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}

export default Bucket;