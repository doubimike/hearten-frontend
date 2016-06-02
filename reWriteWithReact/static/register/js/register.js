var Register = React.ceateClass({
    getInitialState: function() {
        return {
            value: ''
        };
    },
    handleChange: function (event) {
         this.setState({
              value: event.target.value
          }); 
    },
    render: {
        return (
            <form action="#">
                <input type="text" value={value} onChange={this.handleChange} name="username" placeholder="请输入帐号名称"/>
            </form>
        );
    }
});

ReactDom.render({
    <Register />,
    document.getElementById('register')
});