import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Category = ({ category, setCategory, handleSubmit }) => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    if (!category) return;
    localStorage.setItem("category", category);
    handleSubmit(e);
    navigate("/category"); // Naviger til ønsket side
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="mt-0 row w60">
      <div className="col-12">
        <Form.Select size='lg' onChange={handleChange} aria-label="Default select example">
          <option> Velg tema</option>
          <option value="1">Autum</option>
          <option value="2">Halloween</option>
          <option value="3">Breast Cancer Awareness Month</option>
          <option value="4">Oktober Fest</option>
        </Form.Select>
      </div>
      <div className='col-12' style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <Button disabled={!category} onClick={handleNext} type='submit' size='lg' style={{ marginTop: 10, alignSelf: "flex-end", width: "100%", borderRadius: 15 }}>
          Neste
        </Button>
      </div>
    </div>
  );
};
