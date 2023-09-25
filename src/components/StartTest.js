import React, { useState } from 'react'
import { useEffect } from 'react';
import { Alert, Button, Card} from 'react-bootstrap'
import autumJson from "../autum.json"
import oktJson from "../Oktoberfest.json"
import haloweenJson from "../Halloween.json"
import breastJson from "../Breast_Cancer_Awareness_Month.json"
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

//random ord
let totalScore = 0

function getRandomWords(array, numWords) {
    const randomWords = [];

    while (randomWords.length < numWords) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomWord = array[randomIndex];

        //slik at ord ikke gjenntar seg
        if (!randomWords.includes(randomWord)) {
            randomWords.push(randomWord);
        }
    }

    return randomWords.join(" ")
}
export const StartTest = () => {
    const [username, setUsername] = useState('');
    const [point, setPoint] = useState(0)
    const [score, setScore] = useState(0)
    const [testStart, setTestStart] = useState(false)
    const navigate = useNavigate()

    const [timer, setTimer] = useState(120); // 2 minutes (120 seconds)
    const [availbleKeywords, setavailbleKeywords] = useState("")
    const [category] = useState(localStorage.getItem("category"))
    const [numberOfCorrects, setNmberOfCorrects] = useState(0)

    const [incorrectWords, setIncorrectWords] = useState(0);

    const getRandomWordsCondition = () => {
        if (category == 1) {
            setavailbleKeywords(getRandomWords(autumJson.ord, 1))
        }
        else if (category == 2) {
            setavailbleKeywords(getRandomWords(haloweenJson.ord, 1))
        }
        else if (category == 3) {
            setavailbleKeywords(getRandomWords(breastJson.ord, 1))
        }
        else if (category == 4) {
            setavailbleKeywords(getRandomWords(oktJson.ord, 1))
        }
    }

    const reset = () => {
        setIncorrectWords(0);
        setUsername("")
        setTotalScore(point)
    }
    const setTotalScore = (point) => {
        totalScore += point;
        setScore(totalScore)

    }

    useEffect(() => {
        getRandomWordsCondition();
      }, [autumJson.ord, oktJson.ord, breastJson.ord, haloweenJson.ord]);
      
      const handleChange = (event) => {
        const typedValue = event.target.value;
        let newScore = 0;
        const typedWords = typedValue.split(' ');
        let keywords = availbleKeywords.split(' ');
        const spaceCount = (typedValue.match(/ /g) || []).length;
      
        if (spaceCount > 0) {
          getRandomWordsCondition();
          forFivtyScore(keywords, typedWords, newScore);
          reset();
          return;
        }
      
        setUsername(typedValue);
      
        
        let incorrect = 0;
        for (let i = 0; i < typedValue.length; i++) {
          if (typedValue[i] === availbleKeywords[i]) {
            newScore = newScore + 1; 
            if (incorrect < 5) {
              incorrect = incorrect + 1;
              newScore = newScore - 1;
            }
          }
        }
      
        setIncorrectWords(incorrectWords);
      
        
        setPoint(newScore);
    };
      
      


    //tids funksjon
    function handleTimerExpired() {
        toast.error("Tiden er ute!!")
        setTestStart(false);

        getRandomWordsCondition()
        setNmberOfCorrects(0)
        reset()
    }

    //for å styre tid
    useEffect(() => {
        let interval;

        if (testStart && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && testStart) {
            handleTimerExpired();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [testStart, timer]);

   
    const threeCorrectWords = (c=1) => {
        let correct = numberOfCorrects + c
        setNmberOfCorrects(correct)
        if (correct == 3) {
            totalScore = totalScore + 100
            setScore(totalScore)


        }
        else if (correct > 3) setNmberOfCorrects(0)
    }

    const forFivtyScore = (keywords, typedWords) => {
        let newScore = point

        for (let i = 0; i < keywords.length; i++) {

            if (typedWords[i] && typedWords[i] === keywords[i]) {
                newScore += 50; 
                setPoint(newScore)
                setTotalScore(newScore)
                getRandomWords(category, 1);

                threeCorrectWords(1)
            }
            else if (typedWords[i]) {
                totalScore -= incorrectWords
                setScore(totalScore)
            }
        }
    }
    return (
        <>
            <div className='container-lg'>

                <Card style={{}}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center", fontWeight: 'bold', textTransform: "uppercase" }}>Tastatur test</Card.Title>
                        <Card.Text>
                            <p style={{ color: "green", fontSize: 10, margin: 0 }}>  Given words:</p>
                            <div className="mt-2 flexRow" style={{ justifyContent: "space-between", alignItems: "center" }} >
                                <h3 style={{ fontSize: 23, fontWeight: 'bold', fontFamily: "sans-serif", width: "80%" }}>{availbleKeywords} &nbsp; </h3>


                                {
                                    testStart &&
                                    <div className="duration">
                                        <p>Tid igjen:
                                            <span style={{ color: 'red' }}>{timer} </span>seconds</p>
                                    </div>
                                }
                            </div>
                            {
                                testStart &&
                                <>

                                    <div className="mt-2 row" style={{ height: 50 }} >
                                        <input onChange={handleChange} value={username} placeholder={"Skriv undee "} disabled
                                            size="lg" type="text"
                                            style={{
                                                padding: "10px", width: "100%",
                                                border: "none", outline: "none", backgroundColor: "#fff", fontSize: 23, fontWeight: 'bold',
                                            }} />

                                    </div>

                                    <div className="mt-2 row w60" >
                                        <div className="col-12">
                                            <input value={username} onChange={handleChange} size="lg" type="text" placeholder="Skriv inn her" style={{ padding: "10px 0", width: "100%", border: "none", borderBottomWidth: "1px", borderBottomColor: "#000", outline: "none" }} />
                                           
                                           
                                        </div>
                                        <div className='col-12' >
                                        <input  value={"Trykk mellomrom for neste ord"} disabled
                                            size="lg" type="text"
                                            style={{
                                                padding: "10px 0",
                                                width:"100%",
                                                border: "none", outline: "none", backgroundColor: "#fff", fontSize: 10, fontWeight: 'bold',
                                            }} />
                                        </div>
                                    </div>


                                </>
                            }
                            <div className="scoreView">
                                <h3 className='scoreHeading' >
                                    Poeng:
                                </h3>
                                <p style={{ color: "blueviolet", fontSize: 30, fontWeight: "bold" }}>
                                    {point}
                                </p>
                                <h3 className='scoreHeading' >
                                    Total Score:
                                </h3>
                                <p style={{ color: "blueviolet", fontSize: 30, fontWeight: "bold" }}>
                                    {score}
                                </p>
                            </div>

                        </Card.Text>
                        <div className="flexRow" style={{justifyContent:"space-between"}}>

                        {
                            !testStart &&
                            <Button onClick={() =>{
                                setTestStart(true);
                                setTimer(120)
                                setScore(0);
                                setPoint(0)
                                totalScore=0;
                            }} variant="primary">Start Test</Button>
                        }
                        <Button  onClick={() =>{
                            localStorage.removeItem("category")
                                navigate("/",{state: {next: true}})
                            }} variant="secondary">Bytt Kategori</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* <CustomToast show={showToast} setShow={setShowToast} text="Your game time is over" /> */}
            <div style={{ flexDirection: "column", display: "flex", justifyContent: "flex-end", position: "absolute", bottom: 0, right: 20 }}>

                <Alert style={{ width: "170px", fontSize: 10, padding: 12, alignSelf: "flex-end" }} variant='secondary' >Copy and Paste are disabled</Alert>
            </div>
        </>
    )
}
