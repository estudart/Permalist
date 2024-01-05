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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>New years "todo" list</h2>
      <Card
        style={{
          width: "auto",
          border: "2px solid black",
          borderRadius: "10px",
          backgroundColor: "#DCDCDC",
        }}
      >
        <Card.Header
          style={{
            color: "#fff",
            textAlign: "center",
            backgroundColor: "purple",
            padding: "10px 0 10px 0",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Tasks
        </Card.Header>
        <ListGroup variant="flush" style={{ padding: "4px" }}>
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
                style={{
                  padding: 0,
                  border: "none",
                  background: `url('/trash.png') no-repeat center center`,
                  backgroundSize: "cover",
                  width: "20px",
                  height: "20px",
                  borderRadius: "20%",
                }}
              />
            </ListGroup.Item>
          ))}
          <ListGroup.Item style={{ padding: "3px" }}>
            <Form onSubmit={handleNewTask}>
              <InputGroup
                size="sm"
                className="mb-3"
                onChange={(e) => setText(e.target.value)}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Form.Control
                  name="task"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ borderRadius: "5px", border: "2px", width: "70%" }}
                  value={text}
                />
                <Button
                  type="submit"
                  variant="outline-light"
                  style={{ borderRadius: "50%", border: "1px solid black" }}
                >
                  +
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
