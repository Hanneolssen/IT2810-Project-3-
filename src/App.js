import React, {Component} from 'react';
import './App.css';
import Table from './components/table'
import Header from './components/header'
import getActors2 from './components/data.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchActorsAction from './components/fetchActors'
import {getActorsError, getActorsPending} from './reducers/reducer'
import FormContainer from './components/FormContainer'

class App extends Component {
  constructor(props){
    super(props);
    this.shouldComponentRender=this.shouldComponentRender.bind(this);
  }

  componentDidMount(){
    const {fetchActors}=this.props;
    fetchActors()
  }

  shouldComponentRender(){
      if(this.pending === false) return false;
      return true;
}

  render() {
     const { error} = this.props;
     if(!this.shouldComponentRender()) return (<div>Appen laster ikke</div>)
     getActors2()

      return (
          <div>
              {error && <span >{error}</span>}
              <div className="App">
              <header className="App-header">
                <Header/>
                <div className="mainContent">
                  <div className="table1">
                    <Table/>
                  </div>
                  <div className="formContainer">
                    <FormContainer/>
                  </div>
                </div>
              </header>
            </div>
              
          </div>
      )
  }
}


const mapStateToProps = state => ({
  actors: state.actors.actors,
  error: getActorsError(state),
  pending: getActorsPending(state)
 
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchActors: fetchActorsAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App );
