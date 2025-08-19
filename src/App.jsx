import { useState } from "react"

function App() {
  const [formData, setFormData] = useState({color : "", type : ""})

  //tailwind
  const main = ``
  const form = ``
  const inputColor = ``
  const select = ``
  const option = ``
  const btn = ``
  const colorsSection = ``
  //

  const handleChange = e => {
    const {name, value} = e.target
    setFormData(f => ({...f, [name] : value}))
  }
  const handleSubmit = e => { 
    e.preventDefault()
    fetch(`https://www.thecolorapi.com/scheme?hex="#333`, {
      method : "POST",
      body : JSON.stringify({
        formData
      }),
      headers : {"content-type" : "application/json"}
    })
    .then(r => r.json())
    .then(d => console.log(d))
  }

  return (
    <main className={main}>
      <form className={form} onSubmit={handleSubmit}>
        <input type="color" value={formData.color} name="color" className={inputColor} onChange={handleChange} />
        <select className={select} value={formData.type} onChange={handleChange} name="type">
          <option value="" disabled className={option}>Select an option</option>
          <option className={option}>Option 1</option>
          <option className={option}>option 2</option>
          <option className={option}>Option 3</option>
        </select>
        <button className={btn} type="submit">get color scheme</button>
      </form>
      <section className={colorsSection}>
        <h1>colors here</h1>
      </section>
    </main>
  )
}

export default App
