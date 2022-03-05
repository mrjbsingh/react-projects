import { Field, Form, Formik } from "formik";
import moment from "moment";
import react, { Component } from "react";
import { useHistory, useParams } from "react-router-dom";

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      description: "Learn Java",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };
  }
  render() {
    return (
      <> <h1>Edit Todo</h1>
        <div className="container">
            <Formik>
                {
                    (props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                            </fieldset>
                            <button className="btn btn-success">Save</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
        <div>Todo Component for id - {this.state.id}</div>
      </>
    );
  }
}
export default TodoComponent;
