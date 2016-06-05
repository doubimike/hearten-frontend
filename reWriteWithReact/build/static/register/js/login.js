var Login = React.createClass({
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
          <div>
            <form action="/login" method="POST">
                <input type="text" value={username} onChange={this.handleUNChange} name="username" placeholder="请输入帐号"/>
                <input type="password" value={password} onChange={this.handlePSChange} name="password" placeholder="请输入密码"/>
                <input type="submit" value="登录" />
            </form>
            <a href="/forgotpass">忘记密码</a>
            </div>
        ); 
    }
});


ReactDOM.render(
    <Login />,
    document.getElementById('login')
);