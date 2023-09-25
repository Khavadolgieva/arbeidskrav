import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Username = ({ username, setUsername, setNext }) => {
    
     const handleNext = () => {
        if (!username) return;
        localStorage.setItem("username", username)
        setNext(true);
        // navigate("/category")
    }

     const handleChange = (e) => {
         setUsername(e.target.value)
    }

     return (

        <div className="mt-2 row w60" >
             <div className="col-12">

                <Form.Control onChange={handleChange} size="lg" type="text" placeholder="Username" style={{ borderRadius: 15 }} />
             </div>
             <div className='col-12' style={{display: "flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end"}} >

                <Button disabled={!username}  type='submit' onClick={handleNext} size='lg' style={{ marginTop: 10, alignSelf: "flex-end", width: "100%,", borderRadius: 15 }} >Neste</Button>
             </div>
        </div>

    )
}

export default Username
