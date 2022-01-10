import React from "react";
import "./task.scss";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import AddIcons from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, updateTaskStatus, updateTask } from "../../store/actions/taskAction";
import Checkbox from '@mui/material/Checkbox';
import ListIcon from "@mui/icons-material/ListAlt"
import Tooltip from '@mui/material/Tooltip';
import Empty from "../../assets/svg/empty.svg";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function SimpleDialog(props) {
    const { onClose, bucketid, open, isEdit, task, setTask } = props;

    const handleClose = () => onClose()
    const dispatch = useDispatch();
    return (
        <Dialog fullWidth onClose={handleClose} open={open}>
            <DialogTitle>{!isEdit ? "Add New To-Do List" : "Update To-Do List"}</DialogTitle>
            <div className="dialog">
                <TextField value={task?.name} onChange={(e) => setTask({ ...task, name: e.target.value })} fullWidth id="standard-basic" label="Name" variant="standard" />
                <br />
                <TextField value={task?.description} onChange={(e) => setTask({ ...task, description: e.target.value })} fullWidth id="standard-basic" label="Description" variant="standard" />
                <br />
                <br />
                <Button disabled={!(task?.name && task?.description)} onClick={() => { isEdit ? dispatch(updateTask(task, bucketid, onClose)) : dispatch(addTask(task, bucketid, onClose)) }} fullWidth variant="contained" startIcon={<AddIcons />}>
                    {isEdit ? "Update Task" : "Add Task"}
                </Button>
            </div>
        </Dialog>
    );
}
const Task = (props) => {
    const [open, setOpen] = React.useState(false);
    const [task, setTask] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const dispatch = useDispatch();
    const bucket = useSelector((state) => state.bucket.currentBucket);
    const tasks = useSelector((state) => state.task.tasks);
    const handleClickOpen = (isEdit, task) => {
        setOpen(true);
        setEdit(isEdit);
        setTask(task);
    };

    const handleClose = (value) => setOpen(false)

    return (
        <div className="task_section">
            <div className="task_heading">
                <h1><ListIcon style={{ transform: "scale(1.5)", marginRight: "10px" }} />  To-Do List
                    {
                        bucket ? (
                            <span>( Current Bucket : {bucket?.name} )</span>
                        ) : null
                    }
                </h1>
                <div>
                    {
                        bucket ? (
                            <Button onClick={() => handleClickOpen(false, { name: "", description: "", _id: "" })} variant="contained" startIcon={<AddIcons />}>
                                Add Task
                            </Button>
                        ) : null
                    }

                </div>

            </div>

            <Box className="tasks" sx={{ minWidth: 275 }}>
                {
                    !tasks.length ? (
                        <div>
                            {
                                bucket ? (
                                    <h3 className="not_found">No Tasks, Please add new Task</h3>
                                ) : (
                                    <h3 className="not_found">Please Choose or Create Bucket To Add New Task</h3>
                                )
                            }

                            <img style={{height:"60vh",margin:"0 140px"}} src={Empty} alt="" />
                        </div>



                    ) : (

                        tasks.map((task, index) => {
                            return (
                                <Card key={task._id} className="card_section" variant="outlined">
                                    <React.Fragment>
                                        <CardContent>

                                            <Typography variant="h5" component="div">
                                                {task.name} <Tooltip title="Change Status">
                                                    <Checkbox {...label} onChange={(e) => dispatch(updateTaskStatus(task._id, bucket?._id, e.target.checked))} defaultChecked={task.isComplete} />
                                                </Tooltip>
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {task.bucketName}
                                            </Typography>
                                            <Tooltip title={task.description}>
                                                <Typography variant="body2">
                                                    {task.description.length > 200 ? task.description.slice(0, 200) + "......" : task.description}
                                                    <br />

                                                </Typography>
                                            </Tooltip>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Created At : {new Date(task.createdAt).toLocaleString()}
                                            </Typography>


                                        </CardContent>
                                        <CardActions >
                                            <Tooltip title="Edit">
                                                <EditIcon onClick={() => handleClickOpen(true, task)} style={{ cursor: "pointer" }} />
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <DeleteIcon style={{ cursor: "pointer", fill: "red" }} onClick={() => dispatch(deleteTask(task._id, bucket?._id))} />
                                            </Tooltip>
                                        </CardActions>
                                    </React.Fragment>
                                </Card>
                            )
                        })
                    )

                }

            </Box>
            <SimpleDialog
                task={task}
                setTask={setTask}
                bucketid={bucket?._id}
                open={open}
                isEdit={edit}
                onClose={handleClose}
            />
        </div>
    )
}


export default Task;