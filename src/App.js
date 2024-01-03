import "./App.css";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/");
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleNewTask(event) {
    event.preventDefault();

    const newText = event.target.elements.task.value;
    console.log(newText);

    try {
      console.log("New Text:", newText);
      await axios.post("http://127.0.0.1:5000/add", { task: newText });

      // Refresh the tasks after adding a new one
      const response = await axios.get("http://127.0.0.1:5000/");
      setTasks(response.data);
      setText("");
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  }

  async function handleDeleteTask(inputTask) {
    try {
      console.log(inputTask);
      await axios.delete("http://127.0.0.1:5000/delete", {
        data: { task: inputTask },
      });
      const response = await axios.get("http://127.0.0.1:5000/");
      setTasks(response.data);
      setText("");
    } catch (error) {
      console.error("Error handling delete task");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "auto",
          border: "2px solid black",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Card.Header
          style={{
            color: "#fff",
            textAlign: "center",
            backgroundColor: "purple",
            paddingBottom: "10px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Tasks
        </Card.Header>
        <ListGroup variant="flush">
          {tasks.map((task, index) => (
            <ListGroup.Item
              key={index}
              style={{
                borderBottom: "1px solid black",
                padding: "3px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{task.task}</span>
              <Button
                type="submit"
                variant="danger"
                onClick={() => handleDeleteTask(task.task)}
              >
                <img
                  src="/trash.png"
                  alt="trashImage"
                  style={{ width: "13px" }}
                />
              </Button>
            </ListGroup.Item>
          ))}
          <ListGroup.Item style={{ padding: "3px" }}>
            <Form onSubmit={handleNewTask}>
              <InputGroup
                size="sm"
                className="mb-3"
                onChange={(e) => setText(e.target.value)}
              >
                <Form.Control
                  name="task"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ borderRadius: "5px" }}
                  value={text}
                />
                <Button type="submit" variant="secondary">
                  Add
                </Button>
              </InputGroup>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default App;
