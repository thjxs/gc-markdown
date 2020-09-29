## markdown component

## useage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from '@thjxs/gc-markdown'

ReactDOM.render(
    <Markdown source={markdownText} />,
    document.getElementById('root')
)
```

## Theme

support dark mode

```js
import Markdown, {ThemeContext} from '@thjxs/gc-markdown'
...

<ThemeContext.Provider value='dark'>
    <Markdown source={markdownText}>
</ThemeContext.Provider>
```