import React, { useState } from 'react';

const MyForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State untuk menyimpan indeks item yang akan diedit
  const [editValue, setEditValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObject = { title: inputValue, checked: false }; // Buat objek baru untuk disubmit
    setSubmittedValue([...submittedValue, newObject]);
    setInputValue(''); // Kosongkan nilai input setelah disubmit
    console.log(submittedValue);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = submittedValue.filter((item, i) => i !== index);
    setSubmittedValue(updatedItems);
    setEditIndex(null); // Reset state editIndex
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
    const done = submittedValue.map((item, i) => item.checked);
    setSubmittedValue(done);
    console.log(done);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">Kirim</button>
        </form>
        <button>all</button>
        <button onClick={handleDone}>done</button>
        <button>todo</button>
        {submittedValue.map((item, index) => (
          <div key={index}>
            {editIndex === index ? ( // Jika editIndex sama dengan indeks item, tampilkan input edit
              <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            ) : (
              <h2 style={item.checked ? { textDecorationLine: 'line-through' } : {}}>{item.title}</h2>
            )}
            <button onClick={() => handleDeleteItem(index)}>Hapus</button>
            {editIndex !== index ? ( // Tombol edit ditampilkan jika bukan sedang mode edit
              <button onClick={() => handleEditItem(index)}>Edit</button>
            ) : (
              <button onClick={() => handleUpdateItem(index)}>Simpan</button>
            )}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default MyForm;
