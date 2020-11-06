import React ,{Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './headerComponent';
import Footer from './footerComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Contact from './ContactComponents';
import {connect} from 'react-redux';
import {addComment, fetchDishes} from '../redux/ActionCreators';

const mapStateToProps = state =>{
  return {
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  };
}
const mapDispatchProps = (dispatch)=> ({
  addComment: (dishId, rating, author, comment)=> dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () =>{dispatch(fetchDishes())}
});

class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }
 render(){

  const Homepage = () =>{
    return (
      <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
      promotions={this.props.promotions.filter((promo)=> promo.featured)[0]}
      leaders ={this.props.leaders.filter((leaders)=>leaders.featured)[0] }
      />
      
    );
  }

  const DishWithId = ({match})=>{
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.filter((comment)=>
        comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment} />
      );
  }
  
   return (
       <div>
         <Header />
       
            <Switch>
              <Route path="/home" component={Homepage} />
              <Route exact path="/menu" component={() =><Menu dishes ={this.props.dishes} />} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
              <Footer />
       </div>
   )
 }
}

export default withRouter(connect(mapStateToProps,mapDispatchProps)(Main));
