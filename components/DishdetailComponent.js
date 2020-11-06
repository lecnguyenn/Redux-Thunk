import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, ModalHeader, Modal, ModalBody, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';

import {Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponents';
 function RenderDish({dish}) {
      return(
          <div className="col-12 col-md-5 m-1">
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          </div>
      );
 }

 function RenderComments({comments, addComment, dishId}){
    if(comments!=null){
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment)=>{
                        return(
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                        <p>-- {comment.author},&nbsp;{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}
 const DishDetail = (props) =>{
    // if(props.isLoading) {
    //     return (
    //         <div className="container">
    //             <div className="row" >
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if(props.errMess){
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
     if(props.dish != null)
        return (
            <div class ="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                <div className="row">
                    
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} 
                    addComment={props.addComment}
                    dishId={props.dish.id}
                    />
                    
                </div>
            </div>
        )
        else 
            return(
                <div></div>
            )
 }

const required = ( val ) => (val) && val.length;
const maxLength = ( len ) => ( val )=> !(val) || (val.length <= len);
const minLength =( len ) => (val) => (val) && (val.length >=len);

 class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal(){
            this.setState(
                {
                isModalOpen : !this.state.isModalOpen
                }
            ) 
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
            // console.log("Current start is:" + JSON.stringify(values) );
            // alert("Current start is: " + JSON.stringify(values));
        }

        render(){
            return(
                <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit"></span>Submit Comments
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody className="m-2 font-weight-normal">
                     <LocalForm onSubmit={(values) =>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                <Label htmlFor="rating">Rating</Label>
                           
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" defaultValue="1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-control">
                                <Col md={12}>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                validators={{
                                    required,maxLength:maxLength(10),minLength:minLength(2)
                                }} />
                                <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: "Required",
                                    minLength:' Must be greater than 2',
                                    maxLength: ' Must be less more 10'
                                }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-control">
                                <Col md={12}>
                                <Label htmlFor="comment">Comment</Label>
                               
                                <Control.textarea model=".comment" id="comment" name="comment" placeholder="Comment" className="form-control" rows="6"
                                />
                                </Col>
                            </Row>
                                <Row className="font-control">
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </React.Fragment>
            )
        }
 }

export default DishDetail;