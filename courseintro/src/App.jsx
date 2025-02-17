const Course = ({ course }) => {

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
  // console.log(parts)
  // let amountOfExercises = 0;
  // parts.forEach(part => {
  //   console.log(part.exercises)
  //   amountOfExercises += part.exercises
  // });

  
  
  return(
  <>
    <p>Number of exercises: { 
      // parts.reduce()
      // amountOfExercises
      }</p>
  </>

  )
}

(props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
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
        name: 'test',
        exercises: 2,
        id: 4
      }
    ],
  }

  return (
<Course course={course} />
  )
}

export default App
