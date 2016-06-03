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
    submitRegister: function  (event) {

        event.preventDefault();
        $.ajax({
                url: '/register',
                type: 'POST',
                data: {username: this.state.username,
                    password: this.state.password},
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
                
    },
    render: function () {
        var username = this.state.username;
        var password = this.state.password;
         return (
            <form action="#">
                <input type="text" value={username} onChange={this.handleUNChange} name="username" placeholder="请输入帐号"/>
                <input type="password" value={password} onChange={this.handlePSChange} name="password" placeholder="请输入密码"/>
                <input type="submit" onClick={this.submitRegister} />
            </form>
        ); 
    }
});


ReactDOM.render(
    <Register />,
    document.getElementById('register')
);

