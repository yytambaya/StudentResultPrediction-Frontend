import React, {useState, useEffect} from "react"
import { getAPIBaseURL, getSiteBaseURL } from "../services/helpers";
import { postData } from "../services/request";
import { validateEmail, validateName, validatePassword } from "../services/validators";
import Logo from '../asset/images/afit-logo.jpg'

const Prediction = () => {
    const [id, setID] = useState("");
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [health, setHealth] = useState(null);
    const [studyTime, setStudyTime] = useState(null);
    const [freeTime, setFreeTime] = useState(null);
    const [internet, setInternet] = useState(null);
    const [absences, setAbsences] = useState(null);
    const [desire, setDesire] = useState(null);
    const [passedGrade, setPassedGrade] = useState(null);
    const [extraClass, setExtraClass] = useState(null);
    const [LRbtnState, setLRBtnState] = useState("Linear Regression");
    const [RFbtnState, setRFBtnState] = useState("Random Forest");
    const [DTbtnState, setDTBtnState] = useState("Decision Tree");
    const [error, setError] = useState([{field: "id", msg:""}, {field: "age", msg:""}, {field: "gender", msg:""}, {field: "desire", msg:""}, {field: "freeTime", msg:""}, {field: "internet", msg:""}, {field: "health", msg:""}, {field: "passedGrade", msg:""}, {field: "absences", msg:""}, {field: "studyTime", msg:""}, {field: "extraClass", msg:""}]);
    const [genError, setGenError] = useState("")
    
    const sendData = async () => {
        //alert("Email: " + email + " Password: " + password);
        var id_val = validateTextInput(id)[0];
        var a_val = validateInput(age, 15, 22)[0];
        var g_val = validateInput(gender, 0, 1)[0];
        var hel_val = validateInput(health, 0, 1)[0];
        var st_val = validateInput(studyTime, 0, 5)[0];
        var ft_val = validateInput(freeTime, 0, 5)[0];
        var inter_val = validateInput(internet, 0, 1)[0];
        var abs_val = validateInput(absences, 0, 93)[0];
        var des_val = validateInput(desire, 0, 1)[0];
        var pg_val = validateInput(passedGrade, 0, 20)[0];  
        var ec_val = validateInput(extraClass, 0, 1)[0];
        
        setError([...error, error.find(item => item.field == "id").msg = validateTextInput(id)[1]])
        setError([...error, error.find(item => item.field == "age").msg = validateInput(age, 15, 22)[1]])
        setError([...error, error.find(item => item.field == "gender").msg = validateInput(gender, 0, 1)[1]])
        setError([...error, error.find(item => item.field == "health").msg = validateInput(health, 0, 1)[1]])
        setError([...error, error.find(item => item.field == "studyTime").msg = validateInput(studyTime, 0, 5)[1]])
        setError([...error, error.find(item => item.field == "freeTime").msg = validateInput(freeTime, 0, 5)[1]])
        setError([...error, error.find(item => item.field == "internet").msg = validateInput(internet, 0, 1)[1]])
        setError([...error, error.find(item => item.field == "absences").msg = validateInput(absences, 0, 93)[1]])
        setError([...error, error.find(item => item.field == "desire").msg = validateInput(desire, 0, 1)[1]])
        setError([...error, error.find(item => item.field == "passedGrade").msg = validateInput(passedGrade, 0, 20)[1]])
        setError([...error, error.find(item => item.field == "extraClass").msg = validateInput(extraClass, 0, 1)[1]])
        

        if(id_val && a_val && g_val && hel_val && st_val && ft_val && inter_val && abs_val && des_val && pg_val && ec_val){
            alert("All values set")
            setLRBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/student-result-prediction/linear-regression`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {id, age, gender, health, studyTime, freeTime, internet, absences, desire, passedGrade, extraClass};

            const request = await postData(url, headers, data)
            alert(JSON.stringify(request))
        }
       setLRBtnState("Linear Regression")
    }

    const validateInput = (input, min, max) => {
        const num_reg = /^[0-9]{0,}$/
        if(input != "" && input != null && input != undefined){
            if(num_reg.test(input)){
                if(input >= min && input <= max){
                    return [true, null]
                }else{
                    return [false, "invalid value range. Check input description for the range"]
                }
            }else{
                return [false, "value not a number"]
            } 
        }else{
            return [false, "value is empty"]
        }
    } 

    const validateTextInput = (input) => {
        if(input != "" && input != null && input != undefined){
            return [true, null]
        }else{
            return [false, "value is empty"]
        }
    } 

    

    return(
        <section class="bg-gray-50">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-bold text-gray-900 ">
                <img class="w-16 h-16 mr-2" src={Logo} alt="logo"/>
                AFIT Student Grade Prediction System    
            </a>
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-2xl xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Enter student parameters
                    </h1>
                    <div class="space-y-4 md:space-y-6">
                        {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Registration Number</label>
                            <input value={id} onChange={(e) => setID(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: u18cs1005" required=""/>
                            <p className=" text-gray-500">school id</p>
                            {error.find(item => item.field == "id").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "id").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Age</label>
                            <input value={age} onChange={(e) => setAge(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: 19" required=""/>
                            <p className=" text-gray-500">15 to 22</p>
                            {error.find(item => item.field == "age").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "age").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
                                <option value={null}>--select--</option>
                                <option value={1}>Male</option>
                                <option value={0}>Female</option>
                            </select>
                            {error.find(item => item.field == "gender").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "gender").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Are you healthy?</label>
                            <select value={health} onChange={(e) => setHealth(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
                                <option value={null}>--select--</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {error.find(item => item.field == "health").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "health").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Study time</label>
                            <input value={studyTime} onChange={(e) => setStudyTime(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: 1" required=""/>
                            <p className=" text-gray-500">Weekly study time (numeric: 1 - less than 2 hours, 2 - 2 to 5 hours, 3 - 5 to 10 hours, or 4 - more than 10 hours)</p>
                            {error.find(item => item.field == "studyTime").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "studyTime").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Do you take extra lesson classes?</label>
                            <select value={extraClass} onChange={(e) => setExtraClass(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
                                <option value={null}>--select--</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {error.find(item => item.field == "extraClass").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "extraClass").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Does you have access to internet?</label>
                            <select value={internet} onChange={(e) => setInternet(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
                                <option value={null}>--select--</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {error.find(item => item.field == "internet").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "internet").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">Do you have passion for higher education?</label>
                            <select value={desire} onChange={(e) => setDesire(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
                                <option value={null}>--select--</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {error.find(item => item.field == "desire").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "desire").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">How many classes did you missed?</label>
                            <input value={absences} onChange={(e) => setAbsences(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: 16" required=""/>
                            <p className=" text-gray-500">0 to 93</p>
                            {error.find(item => item.field == "absences").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "absences").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 "> Your free time?</label>
                            <input value={freeTime} onChange={(e) => setFreeTime(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: 2" required=""/>
                            <p className=" text-gray-500">0 to 5</p>
                            {error.find(item => item.field == "freeTime").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "freeTime").msg }</p>: null}
                        </div>
                        <div>
                            <label for="health" class="block mb-2 text-lg text-gray-900 ">What is your passed grade?</label>
                            <input value={passedGrade} onChange={(e) => setPassedGrade(e.target.value)} type="text" name="health" id="health" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="e.g: 10" required=""/>
                            <p className=" text-gray-500">0 to 20</p>
                            {error.find(item => item.field == "passedGrade").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "passedGrade").msg }</p>: null}
                        </div>
                        
                        
                        {/*<div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>*/}
                        <div className="flex justify-between space-x-8">
                            <button onClick={() => sendData()} type="submit" class="w-full text-black bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">{LRbtnState}</button>
                            <button onClick={() => sendData()} type="submit" class="w-full text-black bg-red-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">{RFbtnState}</button>
                            <button onClick={() => sendData()} type="submit" class="w-full text-black bg-green-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">{DTbtnState}</button>
                        </div>
                        <div>
                            <button onClick={() => sendData()} type="submit" class="w-40 text-black bg-slate-100 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"clear"}</button>
                        </div>
                        {/*<p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>*/}
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Prediction