import react, {Component} from "react";
import { useHistory, useParams } from 'react-router-dom'
function TodoComponent(props) {
   
    let params  = useParams();
    console.log(params.id);
    return (<div>Todo Component for id - {params.id}</div>)
    
}
export default TodoComponent;