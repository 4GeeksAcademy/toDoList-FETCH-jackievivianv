import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {

	//const storedList = JSON.parse(localStorage.getItem('list'))
	//const storedTasksDone = JSON.parse(localStorage.getItem('tasksDone'));
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const [visible, setVisibleItem] = useState("none");
	const [hoverIndex, setHoverIndex] = useState(null);
	const [tasksDone, setTasksDone] = useState([]);
	const [visibleAlert, setVisibleAlert] = useState("none");
	const newUser = [];
	const tareasUsuario = [
		{ label: "Make the bed", done: false },
		{ label: "Walk the dog", done: false },
		{ label: "Do the replits", done: false }
	]
	
	useEffect(() => {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/jackievivianv', {	
	 method: 'POST',
	 headers: {
		  'Content-Type': 'application/json',
		},
	 body: JSON.stringify([]),
	
	})

    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        // Here is where your code should start after the fetch finishes
        console.log(data); // This will print on the console the exact object received from the server
		//setList(data);
    })
    .catch(error => {
        console.log(error);
    });
	}, []);

	function actualizarTareas(tarea){
	fetch('https://playground.4geeks.com/apis/fake/todos/user/jackievivianv', {	
	 method: 'PUT',
	 headers: {
		  'Content-Type': 'application/json',
		},
	 body: JSON.stringify(tarea),
	
	})

    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        // Here is where your code should start after the fetch finishes
        console.log(data); // This will print on the console the exact object received from the server
		//setList(data);
    })
    .catch(error => {
        console.log(error);
    });

 	}


	useEffect(() => {
		getTasksList();
	}, []);


	function getTasksList(){
	fetch('https://playground.4geeks.com/apis/fake/todos/user/jackievivianv', {
	 method: 'GET',
	 headers: {
		  'Content-Type': 'application/json',
		},
	})

    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        console.log(data); // This will print on the console the exact object received from the server
		//setList(data);
    })
    .catch(error => {
        console.log(error);
    });
	};
 
	

	/*fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => console.log('Tarea creada en el servidor:', data))
    .catch(error => console.error('Error al agregar tarea:', error));
}*/

	

	/*useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	  }, [list]);
  
	  useEffect(() => {
		  localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
		}, [tasksDone]);
	*/
  
	  function mouseHoverEvent(index){
			  setVisibleItem("d-flex gap-5");    //hace visible la x
			  setHoverIndex(index); // para que solo aparezca la x en el <li> en el que estoy posicionada
	  }
	  
	  function mouseLeaveEvent(){
		  setVisibleItem("d-none");       //hace invisible la x
	  }
  
	  function handleVisibleAlert(){
		  setVisibleAlert("flex");       //hace invisible la x
	  }
	  
	  
	  function handleTask(event){
		  setTask(event.target.value);
	  }
  
	  function handleRemoveItem(index) {
		  setList((prevList) => prevList.filter((_, i) => i !== index));
		  actualizarTareas(list);
		}
  
	  function handleSaveTask(item, index){
	  //const listTaskD = setTasksDone((prevList) => prevList.filter((_, i) => i === index));
		  setTasksDone(tasksDone.concat(item))
		  setList((prevList) => prevList.filter((_, i) => i !== index));
			console.log(tasksDone);
	  }
  
	  function handleList(event){
		let aux = [];
			  if (event.keyCode === 13) {
				  const newData = event.target.value;
				  setList([...list, { label: newData, done: false }]); // Crea un nuevo array con el dato adicional
				 //setList(newData); // Actualiza el estado con el nuevo array
				aux = [...list, { label: newData, done: false }]
				actualizarTareas(aux);
				 console.log(aux);
				  event.target.value = '';
			  }
		  
	  }
  
  
  
	  return (
		  <div className="container d-block justify-content-center bg-dark p-5 col-lg-6 col-md-4 col-sm-10 mt-5 pb-3" style={{width: "30rem"}}>
			  <h1 className="text-light p-2 d-flex justify-content-center">My To-Do List</h1>
			  <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm p-5" onChange={handleTask} onKeyUp={handleList} placeholder="Add your task for today here :)"></input>
			  <ul className="text-light pt-3" style={{ paddingLeft: "0rem", display: "flex", flexDirection: "column", gap: "10px" }}>
					{list.length > 0 ? list.map((item, index) => (
					  <li key={index} style={{ listStyleType: "none" }} className="bg-dark d-flex justify-content-between align-items-center p-2 border border-secondary" onMouseEnter={()=> mouseHoverEvent(index)} onMouseLeave={mouseLeaveEvent}>
							<span>{item.label}</span>
						  <div className="d-flex gap-2 align-items-center">
							<span onClick={() => handleRemoveItem(index)} className={`text-secondary text-lg ${hoverIndex === index ? visible : "d-none"}`} > ✖</span>
						  <span onClick={() => handleSaveTask(item, index)} style={{fontSize: "small"}} className={`text-secondary ${hoverIndex === index ? visible : "d-none"}`} > ✔</span>
						  </div>
					  </li>
					)): <p className="d-flex justify-content-center">No se agregaron tareas</p>}
			  </ul>
			  <div className="container d-flex justify-content-around">
			  <button className="bg-dark rounded-4 text-light p-2 m-2 justify-content-around" onClick={handleVisibleAlert} style={{fontFamily: "cursive"}}>Tasks Done</button>
			  </div>	
			  <div className="alert alert-secondary col-12" role="alert" style={{display: visibleAlert}}>
					
				  <ul className="alert-heading text-dark pt-1"><strong>These are the tasks that you have done:</strong> 
				  {tasksDone.map((item, index) => 
					  <li key={index} className="mb-0 text-secondary" style={{ listStyleType: "none" }}>{item}</li>
				  )}
				  </ul>
			  </div>
				  
			  <div>
			  <span className="text-light font-italic" style={{fontFamily: "fantasy", fontSize: "small"}}>{list.length} items left</span>
			  </div>			
		  </div>
		  
	  );
  };
  
  
  
  
  
  export default Home;
  