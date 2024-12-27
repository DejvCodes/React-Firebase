import "./Form.css"
import projectFirestore from "../firebase/config"
import { useState } from "react"

const Form = () => {
  const [brand, setBrand] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  const submitForm = async (e) => {
    e.preventDefault()

    if (brand && title && price && image) {
      const newSneaker = {
        brand: brand,
        title: title,
        price: parseInt(price),
        image: image,
      }

      try {
        await projectFirestore.collection("sneakers").add(newSneaker)
        alert("Tenisky byly úspěšně přidány!")
        setBrand("")
        setTitle("")
        setPrice("")
        setImage("")
      } catch (error) {
        console.error(error.message)
      }
    } else {
      alert("Vyplňte všechna pole")
    }
  }

  return <div className="form">
    <h1>Přidat tenisky</h1>

    <form onSubmit={submitForm}>
      <input 
        type="text" 
        placeholder="Značka:"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Název:"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="number" 
        min={0}
        placeholder="Cena:"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="URL obrázku:"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input type="submit" value="Přidat" />
    </form>
  </div>
}

export default Form