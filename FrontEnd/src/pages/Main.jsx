import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { addTaskAction, deleteTaskAction, getTaskListAction, updateTaskAction, updateTaskNameAction } from "../action/taskAction";
import Pagination from "../component/Pagination";

import "./index.scss";

export default function Main() {
	const [taskList, setTaskList] = useState([]);
	const [ipValue, setIpValue] = useState("");
	const [errorMess, setErrMessage] = useState("");
	const [feature, setFeature] = useState("ADD TASK");
	const [currentTask, setCurrentTask] = useState({
		_id: "",
		taskName: "",
		status: false
	});
	
	// handle Pagination
	const [currentPage, setCurrentPage] = useState(1); 
	const [tasksPerPage, setTasksPerPage] = useState(4);
	// handle Page
	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const tasksInPage = taskList?.slice(indexOfFirstTask, indexOfLastTask);

	const OnHandlePaginate = (number) => {
		setCurrentPage(number);
	}

	const onHandleGetTaskList = async () => {
		const data = await getTaskListAction();
		setTaskList(data);
	};

	useEffect(() => {
		onHandleGetTaskList();
	}, []);

	const onHandleEditTaskName = async () => {
		const editTask = {
			taskName: ipValue,
			status: currentTask.status
		};
		const result = await updateTaskNameAction(currentTask._id, editTask);
		if (result?.status === 200) {
			onHandleGetTaskList();
			setFeature('ADD TASK');
			setErrMessage("");
			setIpValue('');
		}
		if (result?.status === 400) {
			setErrMessage("Task name already exists.");
		}
		
	};

	const onHandleChangeTaskStatus = async (task) => {
		const updateTask = { ...task, status: !task.status };
		await updateTaskAction(task._id, updateTask);
		onHandleGetTaskList();
	};

	const onHandleOpenEdit = async (task) => {
		setErrMessage("");
		setIpValue(task.taskName);
		setFeature("Edit");
		setCurrentTask(task);
	};	

	const onHandleDeleteTask = async (taskId) => {
		const result = await deleteTaskAction(taskId);
		if (result.status === 200) {
			await onHandleGetTaskList();
			toast.success("Successfully delete", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const onHandleAddTask = async () => {
		const result = await addTaskAction({
			taskName: ipValue,
		});
		if (result?.status === 200) {
			onHandleGetTaskList();
			setIpValue('');
			setErrMessage('');
			toast.success("Successfully added", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		if (result?.status === 400) {
			setErrMessage("Task name already exists.");
		}
	};

	const renderTaskList = () => {
		return tasksInPage?.map((task, index) => {
			return (
				<tr key={index}>
					<td className="text-center py-3 px-6">{task?.taskName}</td>
					<td className="text-center py-3 px-6">
						<button
							className={task?.status ? "pin-box on" : "pin-box off"}
							onClick={() => {
								onHandleChangeTaskStatus(task);
							}}
						>
							<span className="pin" />
						</button>
					</td>

					<td className="text-center py-3 px-6">
						<span
							onClick={() => onHandleOpenEdit(task)}
							className="mx-2 cursor-pointer p-3 active:bg-violet-400 active:text-slate-900 active:rounded-2xl"
						>
							<i className="fa fa-edit text-xl"></i>
						</span>
						<span
							onClick={() => onHandleDeleteTask(task?._id)}
							className="mx-2 cursor-pointer p-3 active:bg-violet-400 active:text-slate-900 active:rounded-2xl"
						>
							<i className="fa fa-times text-xl"></i>
						</span>
					</td>
				</tr>
			);
		});
	};

	return (
		<div className="flex item-center justify-center bg-neutral-300 h-screen">
			<div className="flex flex-col m-5 bg-cotton w-8/12 rounded-md shadow-2xl">
				<p className="my-2 uppercase text-center text-xl font-bold p-6">
					TO DO LIST
				</p>

				<div className="flex flex-row justify-center my-5">
					<div className="flex flex-col justify-center w-4/12">
						<input
							value={ipValue}
							onChange={(e) => {
								setErrMessage("");
								if (ipValue.length >= 26) {
									setIpValue(e.target.value.slice(0,26));
									setErrMessage("Name can't exceed 26 characters");
									return;
								}
									setIpValue(e.target.value);
							}}
							className="w-full mx-1 p-4 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Type on something ..."
						/>
						<span className="block text-left text-red-600 ml-3 mt-2 text-base h-6" id="warning">
							{errorMess}
						</span>
					</div>

					<button
						className="bg-blue-200 rounded-2xl px-2 py-4 font-bold ml-6 self-start w-24"
						onClick={() => {
							if (feature === "ADD TASK") {
								onHandleAddTask();
							} else {
								onHandleEditTaskName();
							}
						}}
					>
						{feature}
					</button>
				</div>

				<table className="overflow-hidden bg-violet-300 w-10/12 mx-auto px-2 py-6 rounded-3xl mt-6 mb-4 text-left text-gray-500 dark:text-gray-400">
					<thead className="text-lg text-gray-700 uppercase bg-violet-300 dark:bg-gray-700 dark:text-gray-400">
						<tr className="">
							<th className="text-center py-3 px-6">TaskName</th>
							<th className="text-center py-3 px-6">Status</th>
							<th className="text-center py-3 px-6">Action</th>
						</tr>
					</thead>

					<tbody className="bg-slate-100 h-80 min-h-fit overflow-x-hidden overflow-y-scroll scrollbar-hide">
						{renderTaskList()}
					</tbody>
				</table>
				<Pagination
					totalTask={taskList?.length}
					tasksPerPage={tasksPerPage}
					paginate={OnHandlePaginate}
				/>
			</div>
		</div>
	);
}
