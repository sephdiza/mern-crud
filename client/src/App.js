import React, {useEffect, useState} from 'react'
import useForm from './useForm'
const axios = require('axios')

function App() {
  const [products, setProducts] = useState([])
  const { handleChange, values } = useForm({})
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    const results = await axios({
      method: 'get',
      url: 'http://localhost:3001/products'
    })

    setLoading(false)
    setProducts(results.data)
  }

  useEffect(() => {
    getProducts()

    return () => getProducts()
  }, [])


  // add product
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, qty, price } = values
      await axios({
        method: 'post',
        url: 'http://localhost:3001/products',
        data: {
          name,
          qty,
          price
        }
      })
      await getProducts()
    } catch(err) {
      alert(err)
    }
  }

  //delete product
  const handleDelete = async (_id) => {
    await axios({
      method: 'delete',
      url: `http://localhost:3001/products/${_id}`
    })
    await getProducts()
  }

  return (
    <div className="container mx-40 md:mx-40">
      <h1 className='text-xl font-semibold my-4'>Product Table</h1>

      <form className='flex gap-1 border border-blue-400 w-96' onSubmit={handleSubmit}>
        <input 
          className='w-1/2 p-2 focus:outline-none focus:ring focus:border-blue-300'
          type='name' 
          placeholder='product name'
          name='name'
          onChange={handleChange}
        />
        <input 
          className='w-1/4 p-2 focus:outline-none focus:ring focus:border-blue-300'
          type='name' 
          placeholder='quantity'
          name='qty'
          onChange={handleChange}
        />
        <input 
          className='w-1/4 p-2 focus:outline-none focus:ring focus:border-blue-300'
          type='name' 
          placeholder='price'
          name='price'
          onChange={handleChange}
        />
        <input 
          type='submit' 
          value='ADD' 
          className='px-4 py-2 bg-blue-400 text-blue-50 cursor-pointer transition duration-200 hover:bg-blue-500'
        />
      </form>

      <table className='table-fixed w-96 mt-4 border border-blue-400'>
        <thead className='bg-blue-400 text-blue-50 h-8'>
          <tr>
            <th className='w-1/2'>Name</th>
            <th className='w-1/4'>Quantity</th>
            <th className='w-1/4'>Price</th>
            <th className='w-1/4'>Action</th>
          </tr>
        </thead>
        <tbody>
        { loading ? <tr><td>loading...</td></tr> :
          (products.length > 0 ?
            products.map(({_id, name, price, qty}) => (
              <tr key={_id} className='h-8 text-center border-b-2 border-gray-200'>
                <td>{name}</td>
                <td>{qty}</td>
                <td>{price}</td>
                <td><button onClick={() => handleDelete(_id)} className='bg-red-400 px-2 text-sm'>DELETE</button></td>
              </tr>
            )) :
            <tr>
              <td>No Data</td>
            </tr>)
        }
        
        
        </tbody>
      </table>
    </div>
  );
}

export default App;
