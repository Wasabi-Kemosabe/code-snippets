import React from 'react';
import queryString from 'qs';
import * as surveyInstanceService from "../../../services/surveyInstanceService";
import * as surveyTemplateService from "../../../services/surveyTemplateService";
import * as userService from '../../../services/userService';
import { QUESTION_TYPES } from "../../../enums/questionTypes";
import { withCookies } from 'react-cookie';
import DropzoneComponent from "../../Dropzone";
import MentorCheckBox from '../../MentorCheckBox';
import MentorSignUpHeader from '../../MentorSignUpHeader';
import { connect } from 'react-redux';
import swal from "sweetalert2";


class SurveyInstance extends React.Component {
    constructor(props) {
        super(props);

        const str = this.props.location.pathname.split('/');

        this.state = {
            survey: {},
            userId: '',
            userProfile: {},
            imageUrl: '',
            surveyInstance: [],
            version: '',
            surveyId: '',
            isPreview: false,
            dateCreated: '',
            url: str[1]
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    componentDidMount() {
        if (this.state.url == 'survey-template') {
            surveyTemplateService.getById(this.props.match.params.id)
                .then(response => {
                    this.setState({
                        survey: response.item,
                        surveyId: response.item.id,
                        version: response.item.version,
                        userId: this.props.userProfile.userId
                    })
                })
                .catch(console.log)
        } else {
            surveyInstanceService.getInstanceId(this.props.match.params.id)
                .then(response => {
                    this.setState({
                        surveyId: response.item[0].surveyTemplateId,
                        isPreview: true,
                        surveyInstance: response.item,
                        dateCreated: new Date(response.item[0].dateCreated).toString(),
                        userId: response.item[0].userId
                    })
                    return this.state.surveyId;
                })
                .then(surveyTemplateService.getById)
                .then(response => {
                    const surveyObj = response.item;
                    let answerRows = this.state.surveyInstance;
                    for (let answerIndex = 0; answerIndex < answerRows.length; answerIndex++) {
                        let answerRow = answerRows[answerIndex];
                        let sectionIndex = answerRow.surveySectionSortOrder;
                        let questionIndex = answerRow.surveyQuestionSortOrder;

                        if (surveyObj.sections[sectionIndex].questions[questionIndex].questionTypeId === 0 && surveyObj.sections[sectionIndex].questions[questionIndex].isMultipleAllowed == false ) {
                            surveyObj.sections[sectionIndex].questions[questionIndex].answerInt = answerRow.answerInt;
                        } 
                        else if (surveyObj.sections[sectionIndex].questions[questionIndex].questionTypeId === 0 && surveyObj.sections[sectionIndex].questions[questionIndex].isMultipleAllowed == true ) {
                            if(surveyObj.sections[sectionIndex].questions[questionIndex].multAnswerInt){  
                                surveyObj.sections[sectionIndex].questions[questionIndex].multAnswerInt.push(answerRow.answerOptionId)}
                             else{
                                surveyObj.sections[sectionIndex].questions[questionIndex].multAnswerInt = [answerRow.answerOptionId]
                             }   

                        }
                        else if (surveyObj.sections[sectionIndex].questions[questionIndex].questionTypeId === 1 || 2 || 3) {
                            surveyObj.sections[sectionIndex].questions[questionIndex].textAnswer = answerRow.answer;
                        }
                    }
                    const resultsObj = {
                        survey: surveyObj,
                        surveyId: response.item.id,
                        version: response.item.version
                    };
                    return resultsObj;
                    
                })
                .then(resultsObj => {
                    userService.readById(this.state.userId)
                        .then(response => {
                            this.setState({
                                userProfile: response.items,
                                survey: resultsObj.survey,
                                surveyId: resultsObj.surveyId,
                                version: resultsObj.version
                            })
                        })
                })
                .catch(console.log)
        }
    }

    getAnswersArray() {
        // ... removing for brevity
      }

    onChange(e, sectionIndex, questionIndex) {
        // ... removing for brevity
    }

    onCheckChange(e, sectionIndex, questionIndex) {
        // ... removing for brevity
      }

    onSubmit() {
        // ... removing for brevity
    }

    onFileUpload(uploadedImage, sectionIndex, questionIndex, ansOptId) {
        // ... removing for brevity
    }

    questionType(question, sectionIndex, questionIndex) {
        // ... removing for brevity
    }

    render() {
        const survey = this.state.survey;
        const assessment = this.state.url == 'assessment' ? true : false
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">{survey.name}</h1>
                        {this.props.location.search ? <MentorSignUpHeader /> : null}
                        <br />
                        {!assessment && this.state.userProfile &&
                            <React.Fragment>
                                <p className="card-subtitle">Created by {this.state.userProfile.firstName} {this.state.userProfile.lastName}</p>
                                <p className="card-subtitle">on {this.state.dateCreated}</p>
                                <p className="card-subtitle">{survey.description}</p>
                            </React.Fragment>}
                        <div>
                            {survey && survey.sections && survey.sections.map((section, sectionIndex) => {
                                return (
                                    <div key={section.id}>
                                        {!assessment &&
                                            <React.Fragment>
                                                <h4 className="card-title">{section.title}</h4>
                                                <p className="card-subtitle">{section.description}</p>
                                            </React.Fragment>}
                                        <div>
                                            {section.questions && section.questions.map((question, questionIndex) => {
                                                return (
                                                    <div className="card" key={question.id}>
                                                        <div className="card-body">
                                                            <p>Question {questionIndex + 1}</p>
                                                            <p>{question.question}</p>
                                                            <div>
                                                                <br></br>
                                                                {this.questionType(question, sectionIndex, questionIndex)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <button type="button" className="btn btn-light btn-block" disabled={this.state.isPreview} onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userProfile: state.userProfiles
  })

export default withCookies(connect(mapStateToProps)(SurveyInstance))
