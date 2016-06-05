var ForgotPass = React.createClass({
    getInitialState: function() {
        return {
            email: ''
        };
    },
    handleEmailChange: function (event) {

         this.setState({
              email: event.target.value
          });          
    },
    render: function () {
        var email = this.state.email;
         return (
          <div>
          <h2>忘记密码</h2>
          <div>请输入邮箱，验证码将会发送至你的注册邮箱</div>
            <form action="/forgotpass" method="POST">
              <span>邮箱</span>
                <input type="email" value={email} onChange={this.handleEmailChange} name="email" placeholder="请输入邮箱"/>
                <input type="submit"/>
            </form>
          </div>
        ); 
    }
});


ReactDOM.render(
    <ForgotPass />,
    document.getElementById('forgot-pass')
);