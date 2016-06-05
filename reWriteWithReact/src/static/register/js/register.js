var Register = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            password: ''
        };
    },
    handleUNChange: function (event) {

         this.setState({
              username: event.target.value
          });          
    },
    handlePSChange: function (event) {
         this.setState({
              password: event.target.value
          }); 
    },
    render: function () {
        var username = this.state.username;
        var password = this.state.password;
         return (
            <form action="/register" method="POST">
                <input type="text" value={username} onChange={this.handleUNChange} name="username" placeholder="请输入帐号"/>
                <input type="password" value={password} onChange={this.handlePSChange} name="password" placeholder="请输入密码"/>
                <input type="password"  placeholder="请确认密码"/>
                <input type="submit" />
            </form>
        ); 
    }
});


ReactDOM.render(
    <Register />,
    document.getElementById('register')
);

