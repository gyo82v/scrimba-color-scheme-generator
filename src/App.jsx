import { useState } from "react"

function App() {
  const [formData, setFormData] = useState({color : "#f55a5a", mode : "monochrome"})
  const [colors, setColors] = useState(["#f55a5a", "#2b283a", "#fbf3ab", "#aad1b6", "#a626d3"])
  const [copied, setCopied] = useState(null)

  //tailwind
  const border = `border border-neutral-300 h-12 rounded-lg`
  const flex = `flex justify-center items-center`
  const btn = `p-2 font-semibold flex-2 transform hover:scale-110 active:scale-95 `
  //

  const handleCopy = async (which, text) => {
     try{
      await navigator.clipboard.writeText(text);
      setCopied(which)
      setTimeout(() => setCopied(null), 1500)
     }catch(err){
      console.error("copy failed", err)
     }
  }

  const colorsEl = colors.map((c, i) => (
    <div key={i} className="min-h-0 flex flex-col">
      <div className="flex-1" style={{backgroundColor : c}}></div>
      <div className={`font-semibold text-neutral-600 py-2 ${flex}`} >
        <button onClick={() => handleCopy(i, c)} aria-label={`Copy ${c} to clipboard`}>
          <p>{copied === i ? "✓ Copied!" : c}</p>
        </button>
      </div>
    </div>
  ))
 
  const handleChange = e => {
    const {name, value} = e.target
    setFormData(f => ({...f, [name] : value}))
  }
  const handleSubmit = e => { 
    e.preventDefault()
    const color = formData.color.slice(1)
    const mode = formData.mode
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)  
    .then(r => r.json())
    .then(d => {
      const hexArray = d.colors.map(c => c.hex.value)
      setColors(hexArray)
    }
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      <form className={`p-4 gap-2 ${flex}`} onSubmit={handleSubmit}>
        <input 
          aria-label="Select a color"
          type="color" 
          value={formData.color} 
          name="color" 
          className={`flex-1 ${border}`} 
          onChange={handleChange} required 
        />
        <select aria-label="select an option" className={`p-2 flex-4 ${border}`} value={formData.mode} onChange={handleChange} name="mode">
          <option value="" disabled>Select an option</option>
          <option value="monochrome">monochrome</option>
          <option value="monochrome-dark">monochrome-dark</option>
          <option value="monochrome-light">monochrome-light</option>
          <option value="analogic">analogic</option>
          <option value="complement">complement</option>
          <option value="analogic-complement">analogic-complement</option>
          <option value="triad">triad</option>
          <option value="quad">quad</option>
        </select>
        <button className={`${btn} ${border} ${flex}`} type="submit" disabled={!formData.color}>
          Get color scheme
        </button>
      </form>
      <section className="grid grid-cols-5 min-h-0 flex-1">
          {colorsEl}
      </section>
    </main>
  )
}

export default App
