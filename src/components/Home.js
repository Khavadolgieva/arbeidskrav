import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Category} from './Category';
import Username from './Username';

function Home({ username, category, setCategory, setUsername }) {
    const { state } = useLocation()
    const [next, setNext] = useState((state?.next && localStorage.username) ?? false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("startTest")
    };

    return (
        <div className='container-lg' >
          {next &&  <div className='flexRow' style={{textTransform: "uppercase"}}>

                <Alert variant="success">Hei! {localStorage.username}</Alert>
            </div>
}
            <div className='flexCol' style={{paddingBottom: 100}} >

                <form className="space-y-6" action="#" method="POST">
                    {
                        !next ?
                            <div >
                                <Username username={username} setUsername={setUsername} setNext={setNext} />
                            </div>
                            :
                            <div >
                                <Category handleSubmit={handleSubmit} setCategory={setCategory} category={category} />
                            </div>
                    }
                </form>
            </div>
        </div>
    );
}

export default Home
