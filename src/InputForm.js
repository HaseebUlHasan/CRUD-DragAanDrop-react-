import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Modal, Button } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const InputForm = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [createdown, setCreatedOwn] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: id,
      createdown: createdown,
      createdBy: createdBy,
      detail: detail,
      amount: amount,
      status: status,
    };
    if (!update) {
      setData([...data, userData]);
      setId("");
      setCreatedOwn("");
      setCreatedBy("");
      setDetail("");
      setAmount("");
      setStatus("");
    } else {
      updates(id, createdown, createdBy, detail, amount, status);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setData(data.filter((del) => del.id !== id));
  };

  const handleEdit = (id) => {
    setUpdate(data.find((upd) => upd.id === id));
  };

  const updates = (id, createdown, createdBy, detail, amount, status) => {
    const newData = data.map((item) =>
      item.id === id
        ? { id, createdown, createdBy, detail, amount, status }
        : item
    );
    setData(newData);
    console.log(newData, "newData");
    setUpdate("");
  };

  useEffect(() => {
    if (update) {
      setId(update.id);
      setCreatedOwn(update.createdown);
      setCreatedBy(update.createdBy);
      setDetail(update.detail);
      setAmount(update.amount);
      setStatus(update.status);
    } else {
      setId("");
      setCreatedOwn("");
      setCreatedBy("");
      setDetail("");
      setAmount("");
      setStatus("");
    }
  }, [
    setId,
    update,
    setCreatedBy,
    setDetail,
    setAmount,
    setStatus,
    setCreatedOwn,
  ]);

  const handleDragEng = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setData(tempData);
  };

  return (
    <div>
      <Navbar handleShow={handleShow} /> <br />
      <br />
      <h3 style={{ marginLeft: "20px" }}> Order List</h3>
      <hr />
      <br />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label> Order Id: </label> <br />
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <br />
            <label> Created own: </label> <br />
            <input
              type="text"
              value={createdown}
              onChange={(e) => setCreatedOwn(e.target.value)}
            />
            <br />
            <label> Created By: </label> <br />
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
            <br />
            <label> Details: </label> <br />
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            <br />
            <label> Amount: </label> <br />
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <label> Status: </label> <br />
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <br /> <br />
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Body>
        </Modal>
      </>
      <div style={{ marginLeft: "200px" }}>
        <DragDropContext onDragEnd={handleDragEng}>
          <table>
            <thead>
              <tr style = {{backgroundColor:"#04AA6D" , color : "white" , width : "100px"}}>
                <td>
                  <strong>Order ID </strong>
                </td>
                <td>
                  <strong> Created By </strong>
                </td>
                <td>
                  <strong>Created Own </strong>
                </td>
                <td>
                  <strong> Detail </strong>
                </td>
                <td>
                  <strong>Status </strong>
                </td>
                <td>
                  <strong>Amount </strong>
                </td>
                <td>
                  <strong>Actions </strong>
                </td>
              </tr>
            </thead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <tbody ref={provider.innerRef} {...provider.droppableProps}>
                  {data.map((d, index) => {
                    return (
                      <>
                        <Draggable draggableId={d.id} key={d.id} index={index}>
                          {(provider) => (
                            <tr
                              ref={provider.innerRef}
                              {...provider.draggableProps}
                              {...provider.dragHandleProps}
                            >
                              <td> {d.id}</td>
                              <td> {d.createdBy}</td>
                              <td> {d.createdown}</td>
                              <td> {d.detail}</td>
                              <td> {d.status}</td>
                              <td> {d.amount}</td>
                              <td>
                                <DeleteOutlineIcon
                                  onClick={() => handleDelete(d.id)}
                                />{" "}
                                <EditIcon
                                  onClick={() => {
                                    handleEdit(d.id);
                                    handleShow();
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provider.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
};

export default InputForm;
