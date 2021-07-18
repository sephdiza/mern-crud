import React, {useEffect, useState} from 'react'
const axios = require('axios')

function App() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const results = await axios({
      method: 'get',
      url: 'http://localhost:3001/products'
    })

    setProducts(results.data)
  }

  useEffect(() => {
    getProducts()

    return () => getProducts()
  }, [])

  return (
    <div className="App">
      <table>
        <tbody>
        {products.length > 0 ?
          products.map(({_id, name, price, qty}) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{qty}</td>
              <td>{price}</td>
            </tr>
          )) :
          <tr>
            <td>No Data</td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
