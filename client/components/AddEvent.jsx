import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from "./NavBar.jsx";
import { addEvent } from '../actions/eventAction';

class AddEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event:{},
      centers: []
    }
  }

  handleChange = (e) => {
    this.setState({ event: {
      ...this.state.event, 
      [e.target.name]: e.target.value,
      venue: this.refs.venue.options[this.refs.venue.selectedIndex].text }
    });
    console.log(this.state.event)
  }

  handleSubmit = (e) => {
      e.preventDefault();
      console.log("SUBMIT");
      let eventDetails = this.state.event;
      const { dispatch } = this.props;
      return dispatch(addEvent(eventDetails));
    }

  componentDidMount() {
    axios({
      method: 'GET',
      url:'http://localhost:3000/api/v1/centers',
      withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        this.setState({ centers: response.data.data});
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    console.log("STATUS ",this.props.status);
    if( this.props.status == 'Success') {
      return <Redirect to="/myevents" push={true} />
    }
    return (
      <div>
        <NavBar />
        <div className="container add-event ">
          <div className="row">
            <div className="container">
              <form>
                <p className="text-center h5">
                  <b>ADD EVENT</b>
                </p>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-3 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" name="title" placeholder="Title" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="Description" className="col-sm-3 col-form-label">
                    Description
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="venue" className="col-sm-3 col-form-label">
                    Venue
                  </label>
                  <div className="col-sm-9">
                    <select className="form-control" ref="venue" name="centerId" onChange={this.handleChange}>
                      <option></option>
                      {
                        (this.state.centers.map((center) =>  <option key={center.id}  value={center.id}>{center.name}</option>))
                      }
                    </select>
                    <small id="fileHelp" className="form-text text-muted">
                      <a href="./centers" target="_blank">
                        View Centers
                      </a>
                    </small>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-3 col-form-label">
                    Date
                  </label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" name="date" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-3 col-form-label">
                    Time
                  </label>
                  <div className="col-sm-9">
                    <input type="time" className="form-control" name="time" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="exampleInputFile" className="col-sm-3 col-form-label">
                    Image
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      aria-describedby="fileHelp"
                      onChange={this.handleChange}
                    />
                    <small id="fileHelp" className="form-text text-muted">
                      ( Optional )
                    </small>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="offset-sm-3 col-sm-9">
                    <button type="submit" className="btn btn-sm btn-success" onClick={this.handleSubmit} >
                      <i className="fa fa-plus fa-lg" /> Add Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => {
  return {
    status: state.eventReducer.status,
    message: state.eventReducer.message
  }
};

export default connect(
     mapStateToProps,
    mapDispatchToProps
)(AddEvent);

