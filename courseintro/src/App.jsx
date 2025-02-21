const Course = ({ course }) => {
  console.log(course)

  return(
  
  <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}

        />

  
  </>
  

      )}


const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) =>{

  return (

  <div>
    {/* <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} /> */}
   {parts.map(part  => 
      <Part part={part}  key={part.id}/>
   )}

  </div>
)
} 

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Total = ({ parts }) => {

  return(
  <>
    <p>Number of exercises: { 
    
        parts.reduce((acc, part) => acc + part.exercises, 0)
      }</p>
  </>

  )
}

(props) => <p>Number of exercises {props.total}</p>

const App = () => {
 const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    {courses.map( course => (
      <Course course={course} key={course.id} /> 
    ))}
    </>
  )
}

export default App
