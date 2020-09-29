import React from 'react'
import ReactDOM from 'react-dom'
import Markdown, {ThemeContext} from '../lib'

const div = document.createElement('div')
div.id = 'root'
div.setAttribute('id', 'root')
div.style.width = '800px'
div.classList.add('mx-auto')
document.body.appendChild(div)

fetch('test.md').then(res => res.text()).then(text => {
  ReactDOM.render(<ThemeContext.Provider value='dark' ><Markdown source={text} /></ThemeContext.Provider>, document.getElementById('root'))
})
