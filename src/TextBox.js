import React, { Component } from 'react'

export default class TextBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            feedback: null,
            count: 0,
        }
        this.binarySearch = this.binarySearch.bind(this)
    }
    

    handleSubmit = ev => {
        ev.preventDefault()
        const {dataset,value} = ev.target

        let dataArr = dataset.value.split(' ')
        let searchVal = parseInt(value.value, 10)
        let count = 0
        let positiveFeedback = `It's a match! It took us ${count} tries to find the value.`

        //Linear Search Solution
        for(let i=0;i<dataArr.length;i++){
            count++
            dataArr[i] = parseInt(dataArr[i],10)
            if(dataArr[i]===searchVal){
                this.setState({feedback:`It's a match! It took us ${count} tries to find the value.`})
                return
            }
        }
        this.setState({feedback:`We couldn't find that value!`})

        //Binary Search Solution
        /*
        let sortedArr = dataArr.sort((a,b)=>{
            return a-b
        })
        
        for(let i=0;i<sortedArr.length;i++){
            sortedArr[i] = parseInt(sortedArr[i],10)
        }

        this.binarySearch(sortedArr,searchVal,0,sortedArr.length)        
        */
        
    }

    binarySearch(arr,value,start,end){

        //count is not working
        this.setState({count:this.state.count+1})
        console.log(this.state.count)

        var start = start === undefined ? 0 : start
        var end = end === undefined ? arr.length : end

        if(start>=end){
            this.setState({feedback:`We couldn't find that value!`})
            console.log('none')
            return
        }

        const index = Math.floor((start+end)/2)
        const item = arr[index]

        if(item==value){
            this.setState({feedback:`It's a match! It took us ${this.state.count} tries to find the value.`})
            console.log('run1')
            return index
        }
        else if(item<value){
            console.log('run2')
            return this.binarySearch(arr,value,index+1,end)
        }
        else if(item>value){
            console.log('run3')
            return this.binarySearch(arr,value,start,index-1)
        }
    }

    render(){
        console.log('rendered')
        const {feedback} = this.state
        console.log(this.state)
        return(
            <>
            <p>Let's play a game of 'Find the Value'!</p>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='dataset'>Set dataset:</label>
                <input type='text' name='dataset' id='dataset' placeholder='1 5 6 10 2 11'/>
                <label htmlFor='value'>Value to find:</label>
                <input type='text' name='value' id='value' placeholder='6'/>
                <input type='submit' value='Go!'/>
            </form>
            <p>{feedback}</p>
            </>
        )
    }

}