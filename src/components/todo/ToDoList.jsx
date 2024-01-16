import React, { useState } from "react";
import ToDoListItem from "./ToDoListItem";

import InputToDo from "./InputToDo";
import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ToDoList = ({ todos, setTodos, fetchTodosData }) => {
  const navigate = useNavigate();

  const [showToDoForm, setShowToDoForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("des");

  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };
  console.log(typeof todos, "Nitish");
  console.log(todos.todos, "Nitish");

  let elementReference = useRef();

  const handleAdd = () => {
    setShowToDoForm((prev) => !prev);
  };

  const handleRadioChange = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const fetchData = async (sort) => {
      try {
        // const url = `${process.env.REACT_APP_API_ROOT_URL}bank/format`;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getToDos/sort/${sort}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const result = await response.json();
        if(result.success){
          setTodos(result.sortedData.todos);
        }else{
          logoutHandler()
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(selectedOption);
  }, [selectedOption, setTodos, auth.token]);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center	">
          <h2 className="font-bold text-lg ">TO-DO</h2>
          <div>
            {showToDoForm ? null : (
              <button onClick={handleAdd} className="text-lg">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#1560bd] hover:text-blue-500 font-bold"
                />
              </button>
            )}
          </div>
        </div>
        <ul className="mt-4">
          {showToDoForm && (
            <InputToDo
              forwardRef={elementReference}
              setTodos={setTodos}
              setShowToDoForm={setShowToDoForm}
            />
          )}

          {todos.map((todo) => (
            <ToDoListItem
              key={todo._id}
              todo={todo}
              {...todo}
              todos={todos}
              setTodos={setTodos}
              fetchTodosData={fetchTodosData}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
