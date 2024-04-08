import React, { useState } from "react";
import Button from "./elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const MyForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State untuk menyimpan indeks item yang akan diedit
  const [editValue, setEditValue] = useState("");
  const [warning, setWarning] = useState(null);
  const [alt, setAlt] = useState([]);

  const handleSubmit = (e) => {
    if (warning !== null) {
      setWarning(null);
    }
    e.preventDefault();
    const newObject = { title: inputValue, checked: false }; // Buat objek baru untuk disubmit
    setSubmittedValue([...submittedValue, newObject]);
    setAlt([...alt, newObject]);
    setInputValue(""); // Kosongkan nilai input setelah disubmit
    console.log(submittedValue);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = submittedValue.filter((item, i) => i !== index);
    setSubmittedValue(updatedItems);
    setAlt(updatedItems);
    setEditIndex(null); // Reset state editIndex
  };

  const handleDeleteTask = () => {
    const updatedItems = submittedValue.filter((item) => item.checked !== true);
    setSubmittedValue(updatedItems);
    setAlt(updatedItems);
    console.log(updatedItems);
  };

  const handleEditItem = (index) => {
    setEditIndex(index); // Atur state editIndex dengan indeks item yang akan diedit
    setEditValue(submittedValue[index].title); // Set nilai editValue dengan nilai judul item yang akan diedit
    // console.log(submittedValue);
  };

  const handleUpdateItem = (index) => {
    const updatedItems = submittedValue;
    updatedItems[index].title = editValue; // Perbarui nilai judul item yang sedang diedit
    setSubmittedValue(updatedItems);
    setEditIndex(null); // Reset state editIndex setelah update
  };

  const handleDone = () => {
    // alt ?? setAlt(submittedValue);
    const done = submittedValue.filter((item) => item.checked === true);
    if (done.length === 0) {
      setWarning(<h1>belum ada todo yang selesai</h1>);
      setSubmittedValue(done);
    } else {
      setSubmittedValue(done);
    }
  };
  const handleTodo = () => {
    setWarning(null);
    const done = alt.filter((item) => item.checked === false);

    setSubmittedValue(done);
  };

  const handleAll = () => {
    setWarning(null);
    setSubmittedValue(alt);
  };

  const style = {
    width: "100%",
    fontSize: "20px",
  };

  return (
    <div
      style={{
        margin: "auto",
        // backgroundColor: "black",
        width: "50%",
        padding: "5%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>todoInput</h1>
      <div
        className=""
        style={{
          border: "2.5px #e0e0e0 solid",
          padding: "0 2.5%",
          borderRadius: "5px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            // backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "2.5% 0",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "2.5px #e0e0e0 solid",
            }}
          />
          <Button type="submit" style={style}>
            Add New Task
          </Button>
        </form>
      </div>

      <h1 style={{ textAlign: "center" }}>TodoList</h1>

      <div
        className=""
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <Button style={style} onClick={handleAll}>
          all
        </Button>
        <Button style={style} onClick={handleDone}>
          done
        </Button>
        <Button style={style} onClick={handleTodo}>
          todo
        </Button>
      </div>

      {warning ??
        submittedValue.map((item, index) => (
          <div
            key={index}
            style={{
              border: "2.5px #e0e0e0 solid",
              borderRadius: "5px",
              margin: "2.5% 0",
              display: "flex",
              alignItems: "center",
              padding: "0 2.5%",
            }}
          >
            {editIndex === index ? ( // Jika editIndex sama dengan indeks item, tampilkan input edit
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <h2
                style={{
                  textDecorationLine: item.checked ? "line-through" : "",
                  width: "100%",
                }}
              >
                {item.title}
              </h2>
            )}

            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {
                  const updatedItems = [...submittedValue];
                  updatedItems[index].checked = !item.checked; // Ubah status checked item
                  setSubmittedValue(updatedItems);
                  // console.log(submittedValue);
                }}
              />
              {editIndex !== index ? ( // Tombol edit ditampilkan jika bukan sedang mode edit
                <Button
                  style={{ height: "100%" }}
                  onClick={() => handleEditItem(index)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="fa-light" />
                </Button>
              ) : (
                <Button
                  style={{ height: "100%" }}
                  onClick={() => handleUpdateItem(index)}
                >
                  Simpan
                </Button>
              )}
              <Button
                style={{ height: "100%" }}
                onClick={() => handleDeleteItem(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        ))}
      <div
        className=""
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {submittedValue.length === 0 ? (
          ""
        ) : (
          <>
            <Button style={style} onClick={handleDeleteTask}>
              delete done task
            </Button>
            <Button
              style={style}
              onClick={() => {
                setSubmittedValue([]);
                setAlt([]);
              }}
            >
              delete all task
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyForm;
