import React from 'react';
import './registration.css'

class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputName: '',
            inputPassword: '',
            inputEmail: ''
        }
    }

    onInputNameChange = (event) =>{
        this.setState({inputName: event.target.value});
    }

    onInputPasswordChange= (event) => {
        this.setState({inputPassword: event.target.value});
    }

    onInputEmailChange = (event) => {
        this.setState({inputEmail: event.target.value});
    }

    onSubmit = () =>{
        //console.log(this.state)
        fetch('https://limitless-bastion-51520.herokuapp.com/register', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.inputEmail, 
                password: this.state.inputPassword,
                name: this.state.inputName
            })
        })
        .then(res => res.json())
        .then(user =>{
            if(user.id){
                //console.log(user);
                this.props.loadUser(user);
                this.props.onRouteChange("home"); 
            }
        })

    }



    render(){
        //const { onRouteChange } = this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-75-m mw6 shadow-5 center">
                <main className="pa4 black-80 center">
                    <form className="measure centre">
                        <fieldset style={{display: 'flex', justifyContent: 'flex-end'}} id="sign_up" className="ba b--transparent ph0 mh0 center">
                        <legend className="f2 fw6 ph0 mh0">Registration</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.onInputNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onInputEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onInputPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" onClick={this.onSubmit} type="button" value="Register" />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}



export default Registration;