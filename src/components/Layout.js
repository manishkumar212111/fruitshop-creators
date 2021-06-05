import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from "react-redux"
import Header from "./header"
import routes from "../routes"
import Footer from "./footer"
import { getUserData } from "../utils/globals"

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to Fruit store!",
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.isLogin = getUserData('id')
    }

    componentDidMount() {
      this.setState({
        hashElement : window.location.hash
      })
      window.addEventListener('scroll', this.handleScroll);

    }
    createNotification(type, message) {
        let configs = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }
        switch (type) {
          case "info":
            return toast.info(message, configs);
          case "success":
            return toast.success(message, configs);
          case "warning":
            return toast.warn(message, configs);
          case "danger":
            return toast.error(message, configs);
          default:
        }
      }

    componentDidUpdate(){
        let alerts = this.props.alerts || [];
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, idx) => {
          this.createNotification(`${alert.alertType}`, alert.msg);
          return idx
        });
    }

    handleScroll(e) {
      let elem = document.querySelector("#header");
      if(document.getElementById('root').getBoundingClientRect().top < -25){
        elem && this.isLogin ? elem.classList.add('header-yellow-bg') : elem.classList.add('header-bg')
      } else {
        elem && elem.classList.remove('header-bg')
        elem && elem.classList.remove('header-yellow-bg')
      }

    }

    render() {
        return (
            <div>
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss = {false}
                    draggable
                    pauseOnHover
                />
                <Header />
                <div id="main" onScroll={(e) => this.handleScroll(e)}>
                  <Switch>
                      { routes.publicRouter.map( route => <Route key={ route.path } { ...route } /> ) }
                      { routes.privateRouter.map( route => 
                        this.isLogin ? <Route key={ route.path } { ...route } />
                                : <Redirect to={{ pathname: '/login'}}/> ) }
                  </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    alerts: state.alert,
  });
  
export default connect( mapStateToProps )( Layout );
  
