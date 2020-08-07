import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from '../src/Markdown.tsx'

const div = document.createElement('div')
div.id = 'root'
div.setAttribute('id', 'root')
div.style.width = '800px'
div.classList.add('mx-auto')
document.body.appendChild(div)

fetch('test.md').then(res => res.text()).then(text => {
  ReactDOM.render(<Markdown source={text} />, document.getElementById('root'))
})
