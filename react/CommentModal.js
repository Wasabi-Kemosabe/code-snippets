import React from 'react';
import * as messageService from '../services/messageService';
import * as appointmentMessageService from '../services/appointmentMessageService';
import * as userProfileServices from '../services/userProfileInfoService';
import Moment from 'react-moment';
import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class CommentModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            senderId: props.senderId,
            currentUserProfile: [],
            commentInput: '',
            show: false,
            commentArray: [],
            coachObjectivesId: props.coachObjectivesId,
            coachChecklistId: props.coachChecklistId,
            appointmentId: props.appointmentId,
            recipientId: props.recipientId,
            recipientProfile: []
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.submitComments = this.submitComments.bind(this);
        this.submitEmailMessage = this.submitEmailMessage.bind(this);
    }

    componentDidMount() {
        userProfileServices.readById(this.state.senderId)
            .then(response => this.setState({ currentUserProfile: response.items}))
            .catch(console.log)
        userProfileServices.readById(this.state.recipientId)
            .then(response => {
                this.setState({
                    recipientProfile: response.items
                })
            })
            .catch(console.log)
    }

    handleClose() {
        this.setState({ show: false })
    }

    handleShow(e) {
        const id = e.target.id;
        const addr = this.props.location.pathname.split('/');
        
        if (addr.includes('appointments')) {
            appointmentMessageService.readById(this.state.appointmentId)
                .then(response => {
                    this.setState({
                        commentArray: response.item.length > 0 ? response.item : [],
                        show: true
                    })
                })
                .catch(console.log)
        } else {
            messageService.readById(id)
                .then(response => {
                    this.setState({
                        commentArray: response.item.length > 0 ? response.item : [],
                        show: true,
                        coachObjectiveId: response.item > 0 ? response.item[0].checklistObjectiveId : id
                    })
                })
                .catch(console.log)
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleKeyDown(e, f) {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            f();
        }
    }

    submitComments() {
        const addr = this.props.location.pathname.split('/');
        const coachData = {
            senderId: this.state.senderId,
            message: this.state.commentInput,
            checklistId: this.state.coachChecklistId,
            checklistObjectiveId: this.state.coachObjectiveId
        };
        const appointmentData = {
            senderId: this.state.senderId,
            message: this.state.commentInput,
            appointmentId: this.state.appointmentId
        }
        if (addr.includes('appointments')) {
            appointmentMessageService.post(appointmentData)
                .then(response => {
                    console.log(response);
                    return appointmentData.appointmentId;
                })
                .then(appointmentMessageService.readById)
                .then(response => this.setState({ commentArray: response.item }))
                .catch(console.log)
        } else {
            messageService.post(coachData)
                .then(response => {
                    console.log(response);
                    return coachData.checklistObjectiveId;
                })
                .then(messageService.readById)
                .then(response => this.setState({ commentArray: response.item }))
                .catch(console.log)
        }
        this.setState({ commentInput: '' })
        this.submitEmailMessage();
    }

    submitEmailMessage() {
        const data = {
            personalizations: [{
                to: [{ email: this.state.recipientProfile.email }],
                subject: 'You received a new comment!'
            }],
            from: { email: this.state.currentUserProfile.email },
            content: [{
                type: 'text/plain',
                value: this.state.commentInput
            }]
        };
        appointmentMessageService.sendEmail(data)
            .then(response => console.log(response))
            .catch(console.log)
    }

    render() {
        const { handleSubmit } = this.props;
        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };
        const backdropStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };
        const commentArray = this.state.commentArray.length > 0 ? this.state.commentArray.map(comment => {
            if (this.state.senderId === comment.senderId) {
                return (
                    <div className="messages__item messages__item--right">
                        <div className="messages__details">
                            <p>{comment.message}</p>
                            <small><i className="zmdi zmdi-time"></i><Moment format='llll'>{comment.dateCreated}</Moment></small>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="messages__item">
                        <img src="https://www.debroekriem.nl/wp-content/uploads/2014/04/person-girl-flat.png" className="avatar-img" alt="User Pic" />
                        <div className="messages__details">
                            <p>{comment.message}</p>
                            <small><i className="zmdi zmdi-time"></i><Moment format='llll'>{comment.dateCreated}</Moment></small>
                        </div>
                    </div>
                )
            }
        }) : 'No comments added yet.  Please enter a comment in the input field below.';
        const addr = this.props.location.pathname.split('/');
        const getId = addr.includes('appointments') ? this.props.appointmentId : this.state.coachObjectivesId;
        return (
            <React.Fragment>

                <button class="btn btn-primary" onClick={e => this.handleShow(e)} id={getId}>Show Comments</button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    bsSize='large'
                    backdropStyle={backdropStyle}
                    style={modalStyle}
                    animation={false}
                >
                    <Modal.Body>
                        <div className="messages__header">
                            <div className="toolbar toolbar--inner mb-0">
                                <div className="toolbar__label"><h2>Comment Section</h2></div>

                                <div className="actions toolbar__actions">
                                    <a href="#" className="actions__item zmdi zmdi-time"></a>
                                    <a href="#" className="actions__item zmdi zmdi-info-outline"></a>
                                </div>
                            </div>
                        </div>
                        <div className="messages__content">
                            <div className="scroll-wrapper scrollbar-inner">
                                {commentArray}
                            </div>
                        </div>
                        <div className="messages__reply">
                            <form onSubmit={handleSubmit} onKeyDown={e => { this.handleKeyDown(e, this.submitComments) }}>
                                <textarea className="messages__reply__text" placeholder="Type a message..." onChange={this.handleChange} value={this.state.commentInput} name='commentInput'></textarea>
                                <button type='submit' className='btn btn-light btn--icon' style={{ display: 'none' }}>Submit</button>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }
}

export default withRouter(CommentModal);
