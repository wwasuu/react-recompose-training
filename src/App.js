import React from 'react'
import { withState, withHandlers, compose, mapProps, lifecycle, branch, renderComponent } from 'recompose'

const Loading = () => (
  <div>Loading</div>
)

const enhance = compose(
  withState('counter', 'setCounter', 0),
  withState('loading', 'setLoading', true),
  withHandlers({
    increase: props => () => props.setCounter(n => n + 1),
    decrease: props => () => props.setCounter(n => n - 1),
    setLoading: ({ setLoading }) => (loading) => {
      setLoading(!!loading)
    },
  }),
  mapProps((props) => ({...props})),
  lifecycle(
    {
      componentDidMount() {      
        setTimeout(() => {  
          this.props.setLoading(false)
        }, 3000)
      }
    }
  ),
  branch(
    (props) => props.loading,
    renderComponent(Loading),
  )

)
const Counter = enhance(({ counter, loading, increase, decrease }) => {
  return (
    <div>
      <h3>Count: {counter}</h3>
      <button onClick={increase}>Increment</button>
      <button onClick={decrease}>Decrement</button>
    </div>
  )
})

const App = () => (
  <Counter />
)

export default App
