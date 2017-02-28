import React,{Component} from 'react';

class Error extends Component {
  setDiv(div) {
    this.div = div
  }
  componentDidMount = () => {
    setTimeout( () => {
      console.log(this)
      this.div.style.opacity = 0
      setTimeout( () => {
        this.div.style.display = 'none';
      },500)
    },1000)
  }
  render() {
    const {error} = this.props

    return (
      <div
        ref={ div => this.setDiv(div)}
        style={{
        position:'fixed',
        top:'40px',
        left:'50%',
        height:'50px',
        color:'#333',
        borderRadius:'5px',
        textAlign:'center',
        verticalAlign:'middle',
        width:'200px',
        backgroundColor:'#ffa',
        transition: 'visibility 0s, opacity .5s linear'
      }}><h4>{error}</h4></div>
    )
  }
}
export default Error
