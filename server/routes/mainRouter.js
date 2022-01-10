const express=require("express");

const bucketController=require("../controller/bucketController");
const taskController=require("../controller/taskController");
const router=express.Router();

router.post("/add-bucket",bucketController.setupBucket);
router.get("/buckets",bucketController.getBuckets);
router.post("/add-task/",taskController.setupTask);
router.get("/tasks/:bucketid",taskController.getTasksByBucketId);
router.delete("/task/:taskid",taskController.deleteTaskByTaskId);
router.post("/update-task/:taskid",taskController.patchTaskByTaskId);
router.post("/update-status/:taskid",taskController.updateTaskStatus);

module.exports=router;