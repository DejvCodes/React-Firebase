import "./AllSneakers.css"
import Spinner from "../components/Spinner"
import { useState, useEffect } from "react"
import projectFirestore from "../firebase/config"
import OneSneaker from "../components/OneSneaker"

const AllSneakers = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe
    const fetchData = async () => {
      try {
        unsubscribe = projectFirestore.collection("sneakers").onSnapshot(
          (snapshot) => {
            if (snapshot.empty) {
              console.log("Žádné tenisky nejsou k dispozici:")
              setData([])
            } else {
              let result = []
              snapshot.docs.forEach((oneDoc) => {
                result.push({ id: oneDoc.id, ...oneDoc.data() })
              })
              setData(result)
              setLoading(false)
            }
          }, (err) => {
            console.log("Chyba při načítání dat:", err.message)
          })
        // Vrácení funkce k odhlášení z listeneru
        return unsubscribe
      } catch (error) {
        console.log("Neočekávaná chyba (v catch):", error.message)
      }
    }
    fetchData()
    return () => unsubscribe // Cleanup funkce
  }, [])

  // Function to delete sneakers by id
  const deleteSneaker = async (id) => {
    if (window.confirm("Opravdu chcete tuto tenisku smazat?")) {
      try {
        await projectFirestore.collection("sneakers").doc(id).delete()
      } catch (error) {
        console.log("Chyba při mazání:", error.message)
      }
    }
  }

  return <>
    <div className="loader">
      {loading && <Spinner />}
    </div>

    <div className="all-sneakers">
      {data.map((oneSneaker) => {
        return <OneSneaker key={oneSneaker.id} {...oneSneaker} deleteSneaker={deleteSneaker} />
      })}
    </div>
  </>
}

export default AllSneakers