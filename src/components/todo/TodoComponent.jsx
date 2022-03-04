import react, {Component} from "react";
import { useHistory, useParams } from 'react-router-dom'

class TodoComponent extends Component {
   
    constructor(props){
        super(props)

        this.state ={
            id: this.props.params.id
        }
    }
    render(){

        return (<div>Todo Component for id - {this.state.id}</div>);
    }
}
export default TodoComponent;