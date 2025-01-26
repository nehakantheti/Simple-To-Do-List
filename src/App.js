import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      list: []
    }
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    })
  }

  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput
      };
      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput: "",
      });

    }
  }

  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit task : ");
    if (editedTodo !== null && editedTodo !== '') {
      let updatedTodo = [...todos]
      updatedTodo[index].value = editedTodo;
      this.setState({
        list: updatedTodo,
      });
    }
  }

  render(){
    return (
      <Container>
        <Row
          style = {{
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            fontSize : "3rem",
            fontWeight : "bolder",
          }}
        >
          To Do List
        </Row>

        <hr />
        <Row>
          <Col md = {{span : 5, offset : 4}}>
            <InputGroup className = "mb-3">
              <FormControl
                  placeholder="Add task"
                  size = 'lg'
                  value = {this.state.userInput}
                  onChange={(item) => this.updateInput(item.target.value)}
                  aria-label="add something"
                  aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button variant="dark"
                        className="mt-2"
                        onClick={()=>this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col md = {{span : 5, offset : 4}}>
            <ListGroup>
              {/*To print all the items in list */}  
              {this.state.list.map((item, index) => {
                return(
                  <div key = {index}>
                    <ListGroup.Item
                      variant = "dark"
                      action
                      style={{display:"flex",
                              justifyContent : 'space-between'
                      }}>
                      {item.value}
                      <span>
                      <Button style = {{marginRight:"10px"}}
                              variant = "light"
                              onClick={() => this.deleteItem(item.id)}
                              >
                                Delete
                              </Button>
                      <Button variant = "light"
                              onClick={() => this.editItem(index)}>
                                Edit
                              </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>        
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;