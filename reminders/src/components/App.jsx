import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminder } from '../actions';
import moment from 'moment';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:'',
            dueDate:''
        }
        
    }
    
    addReminder() {
        console.log('this.state', this);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }
    
    deleteReminder(id){
        console.log('deleting in application', id);
        console.log(this.props);
        this.props.deleteReminder(id);
    }
    
    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div onClick = {()=>{this.deleteReminder(reminder.id)}} className="list-item delete-button">
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        console.log(this.props)
        return (
            <div className="App">
                <div className="title">
                    Reminders
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="I have to ..."
                            onChange={event => this.setState({text: event.target.value})}
                        />
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange = {event => this.setState({dueDate: event.target.value})}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={()=>{this.addReminder()}}
                    >Add Reminder</button>
                    { this.renderReminders() }
                </div>
                <div>
                    <button
                        type="button"
                        className = "btn btn-danger"
                        onClick ={()=>this.props.clearReminder()}
                    >Clear Reminders!</button>
                </div>
            </div>
        )
    }
}
/*
function mapDispatchToProps(dispatch){
    return bindActionCreators({addReminder}, dispatch);
}
*/
function mapStateToProps(state){
    console.log('state', state);
    return {
        reminders :  state
    }
}
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminder})(App);
