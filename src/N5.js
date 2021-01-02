import React, { Component } from 'react';
import { Input, Button, Progress, Divider } from "antd";
import { n5 } from './database';

class N5 extends Component {

    componentDidMount()
    {
        this.randomTense()
        this.startTimeOut()
    }

    startTimeOut = () =>
    {
        this.timeout = setTimeout(() =>
        {
            this.setState({ timeOut: true })
        }, 10000)


        this.interval = setInterval(() => 
        {
            this.setState({ timer: this.state.timer - 1 })
        }, 1000)
    }


    componentDidUpdate()
    {
        if (this.state.timer === 0)
        {
            clearInterval(this.interval)
        }
    }

    componentWillUnmount()
    {
        clearTimeout(this.timeout)
        clearInterval(this.interval)
    }

    state = 
    {
        value: "",
        timeOut: false,
        round: 0,
        timer: 10,
        randomTense: "",
        wrongAnswer: "",
        wrongAnswers: []
    }


    randomTense = async () =>
    {
        let TenseArray = ['romaji', 'translation']
        
        let randomTense = await TenseArray[Math.floor(Math.random() * TenseArray.length)]
        this.setState({ randomTense: randomTense })
    }

    handleRestart = () =>
    {
        
        this.setState({ timer: 10, timeOut: false, wrongAnswer: "" })
 
        this.startTimeOut();
    }

    handleChange = (event) =>
    {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();

        if (this.state.timeOut) return alert("Please click restart button to keep doing it");

        if (!this.state.value.trim()) return alert("Please Type something first!")

        this.setState({ value: "", wrongAnswer: "" })
  
        this.checkMatched()

    }

    checkMatched = () =>
    {

     
        (this.state.randomTense === 'romaji' ? n5[this.state.round].romaji : n5[this.state.round].translation) === this.state.value ?
            
            this.setState({ round: this.state.round + 1, timer: 10, wrongAnswer: "" }, () =>
            {

                this.randomTense()
              
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() =>
                {
                    this.setState({ timeOut: true })
                }, 10000)

            })

            :
          
            this.setState(
            {

                wrongAnswer: this.state.randomTense === 'romaji' ? `${n5[this.state.round].romaji}`
                    : `${n5[this.state.round].translation}`

            }, () => 
            {
                this.setState(
                {
                    round: this.state.round + 1, timer: 10,
                    wrongAnswers: this.state.wrongAnswers.concat(n5[this.state.round].vocab)
                })

                this.randomTense()

                clearTimeout(this.timeout);

                this.timeout = setTimeout(() =>
                {
                    this.setState({ timeOut: true })
                }, 10000)
            })
    }

    handleRedirect = () =>
    {
        setTimeout(() =>
        {
            window.location.reload();
        }, 10);
    }

    

    render() {
        return (
            <div style={{ padding: '1rem', borderRadius: '4px', maxWidth: 400, margin: '3rem auto', backgroundColor:'#f6ecf7'}}>

                {this.state.round < n5.length ?
                    <>
                        <h1>N5</h1>

                        <Progress percent={this.state.round / n5.length * 100} status="active" />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2>vocab</h2>
                            <h2>{this.state.round}/{n5.length}</h2>
                        </div>

                        <span style={{ marginBottom: 0, color: 'grey' }}>numbers</span>
                        <h2>{n5[this.state.round].vocab}</h2>

                        <div style={{ fontSize: '1rem' }}>
                             <span style={{ color: 'red' }}>
                                {this.state.randomTense === 'romaji' ? 'romaji' : 'translation form'}
                            </span>
                        </div>


                        <form style={{ padding: '1rem 0' }} onSubmit={this.handleSubmit}>
                            <div style={{ display: 'flex' }}>
                                <Input name="value"     onChange={this.handleChange}    value={this.state.value}    id="vocab"  type="text"/>

                                <Button className   type="submit"   onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </form>

                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            
                            <Button onClick={this.handleRestart}    style={{ display: this.state.timeOut ? 'block' : 'none' }} >
                                Click to Restart!
                            </Button>
                        </div>


                

                        {this.state.wrongAnswer && (
                            <React.Fragment>
                                <Divider />
                                <h3>Wrong answer xd </h3>
                            </React.Fragment>
                        )}
                    </>
                    :
                    <>
                        <h1>Reviews the wrong answers</h1>
                        {this.state.wrongAnswers.map((answer, index) => (
                            <div key={index}>
                                <ul>
                                    <li>
                                        {answer}
                                    </li>

                                </ul>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button onClick={this.handleRedirect}>Retry</Button>
                            <Button></Button>
                        </div>
                    </>
                }
            </div>
        )
    }

}

export default N5;