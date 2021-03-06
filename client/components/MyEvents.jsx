import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NavBar from './NavBar.jsx';
import Event from './Event.jsx';
import DeleteModal from './DeleteModal.jsx';
import { connect } from 'react-redux';
import { history } from '../routes';

export class MyEvents extends Component {

    constructor(props){
      super(props);
      this.state = {
        myEvents: []
      };
    }

    componentWillMount() {
      let token = localStorage.getItem('x-access-token');
      try{
         let decoded = jwtDecode(token);
         let timeLeft = decoded.exp - (Date.now()/1000);
         if(timeLeft <= 0) {
          return history.push("/login")
         }
       } catch (e) {
        return history.push("/login")
       }
    }

    componentDidUpdate() {
      let token = localStorage.getItem('x-access-token');
      let decoded = jwtDecode(token);
      let userId = decoded.id;

      axios({
      method: 'GET',
      url:'/api/v1/users/' + userId,
      withCredentials: true,
      })
      .then((response) => {
        if(this.state.myEvents.length > response.data.data.Events.length){
           this.setState({ myEvents: response.data.data.Events});
        }
       
      })
      .catch((err) => {
        console.log(err.response);
      });
    }


    componentDidMount() {
      document.body.title = 'My Events | Events Manager'
      document.body.style.backgroundImage = "url('../img/ambitious-creative-co-rick-barrett-110145.jpg')";
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';

      let token = localStorage.getItem('x-access-token');

      try{
         let decoded = jwtDecode(token);
       } catch (e) {
        return history.push("/login")
       }
     
      let userId = jwtDecode(token).id;

      axios({
      method: 'GET',
      url:'/api/v1/users/' + userId,
      withCredentials: true,
      })
      .then((response) => {
        this.setState({ myEvents: response.data.data.Events});
      })
      .catch((err) => {
        console.log(err.response);
      });

    }



    render() {
        return (
            <div>
                <NavBar page='MyEvents' auth={true}/>
                <div className="container events">
			            <div className="row event-row">
                    {
                      (this.state.myEvents.map((event) =>  <Event key={event.id} eventDetails={event} />))
                    }
			            </div>
		            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    allState: state.userReducer
  }
}

export default connect(
  mapStateToProps,
  null
)(MyEvents)

