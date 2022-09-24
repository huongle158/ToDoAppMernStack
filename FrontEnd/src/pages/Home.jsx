import React, { useEffect } from "react";
import { useState } from "react";
import queryString from 'query-string'

import Pagination from "../paging/Pagination";

import { addTaskAction, deleteTaskAction, getTaskListAction, updateTaskAction } from "../action/taskAction";

import "./index.scss";

export default function Test() {
	const [taskList, setTaskList] = useState([]);
	const [ipValue, setIpValue] = useState("");
	const [errorMess, setErrMessage] = useState("");

	const [pagination, setPagination] = useState({
		_page: 1,
		_limit: 5,
		_totalRows: 16,
	});

	const [filters, setFilters] = useState({
        _limit: 5,
        _page:1,
    })

	const  handlePageChange = (newPage)=>{
		console.log('newPage: ', newPage);
		setFilters({
			...filters,
			_page: newPage,
		});
	}

	const onHandleGetTaskList = async () => {
		const data = await getTaskListAction();
		setTaskList(data);
	};

	const onHandleChangeTaskStatus = async (task) => {
		const updateTask = { ...task, status: !task.status };
		await updateTaskAction(task._id, updateTask);
		onHandleGetTaskList();
	};

	useEffect(() => {
		async function onHandleGetTaskList() {
			try {
			const paramsString = queryString.stringify(filters)	
			const requestURL = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
			const response = await fetch(requestURL);
			const responseJSON = await response.json();
			console.log({ responseJSON });

			const {data, pagination} = responseJSON;
			setTaskList(data);
			setPagination(pagination);
		
			} catch (error) {
				console.log('failed: ', error.message)
			}
		 }
			
		onHandleGetTaskList();
	}, [filters]);

	const onHandleDeleteTask = async (taskId) => {
		const result = await deleteTaskAction(taskId);
		if (result.status === 200) onHandleGetTaskList();
	};

	const onHandleAddTask = async () => {
		const result = await addTaskAction({
			'taskName': ipValue,
		});
		if (result?.status === 200) {
			console.log("onHandleAddTask");
			onHandleGetTaskList();
		}
		if (result?.status === 400) {
			setErrMessage("Task name already exists.");
		}
	};

	const renderTaskList = () => {
		return taskList?.map((task, index) => {
			return (
				<tr key={index}>
					<td className="text-center py-3 px-6">{task?.taskName}</td>
					<td className="text-center py-3 px-6">
						<button
							className={task?.status ? "pin-box on" : "pin-box off"}
							on={task.status}
							onClick={() => {
								onHandleChangeTaskStatus(task);
							}}
						>
							<span className="pin" />
						</button>
					</td>

					<td className="text-center py-3 px-6">
						<span className="mx-2 cursor-pointer p-3 active:bg-violet-400 active:text-slate-900 active:rounded-2xl">
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
			<div className="flex item-center justify-center bg-neutral-300 h-full">
				<div className="flex flex-col m-5 bg-cotton w-8/12 rounded-md shadow-2xl">
					<p className="my-2 uppercase text-center text-xl font-bold p-6">
						TO DO LIST
					</p>

					<div className="flex flex-row justify-center my-5">
						<div className="flex flex-col justify-center w-4/12">
							
							<input
								onChange={(e) => {
									setIpValue(e.target.value);
									// console.log("This's ~ e.target.value", e.target.value);
								}}
								className="w-full mx-1 p-4 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Type on something ..."
							/>
							
							<span
								className="block text-left text-red-600 ml-3 mt-2 text-base h-6"
								id="warning"
							>
								{errorMess}
							</span>
						</div>

						<button
							className="bg-blue-200 rounded-2xl px-2 py-4 font-bold ml-6 self-start"
							onClick={() => {
								onHandleAddTask();
							}}
						>
							Add Task
						</button>
					
					</div>

					<div className="bg-violet-300 w-10/12 mx-auto px-2 py-1 rounded-2xl">
					
					<table className=" my-6 text-left text-gray-500 dark:text-gray-400">
						
						<thead className="text-lg text-gray-700 uppercase bg-violet-300 dark:bg-gray-700 dark:text-gray-400 w-full">
							<tr className="">
								<th className="text-center py-3 px-6">TaskName</th>
								<th className="text-center py-3 px-6">Status</th>
								<th className="text-center py-3 px-6">Action</th>
							</tr>
						</thead>

						<tbody className="bg-slate-100 h-96 min-h-fit">
							{renderTaskList()}
						</tbody>
						
						<Pagination 
						pagination = {pagination}
						onPageChange={handlePageChange}/>
					
					</table>
				</div>

				<table className="bg-violet-300 w-10/12 mx-auto px-2 py-6 rounded-2xl my-6 text-left text-gray-500 dark:text-gray-400">
					<thead className="text-lg text-gray-700 uppercase bg-violet-300 dark:bg-gray-700 dark:text-gray-400">
						<tr className="">
							<th className="text-center py-3 px-6">TaskName</th>
							<th className="text-center py-3 px-6">Status</th>
							<th className="text-center py-3 px-6">Action</th>
						</tr>
					</thead>

					<tbody className="bg-slate-100 h-96 min-h-fit overflow-x-hidden overflow-y-scroll scrollbar-hide">
						{renderTaskList()}
					</tbody>
				</table>
				<Pagination pagination={Pagination} onPageChange={handlePageChange} />
			</div>
		</div>
	);
}
