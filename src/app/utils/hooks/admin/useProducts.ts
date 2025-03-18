
const useProducts = () => {

    const createProduct = async ({
        data,
    }: {
        data: FormData,
    }) => {

        // try {
        //     const response = await axios.post('/api/products', data)
        //     return response.data
        // } catch (error) {
        //     console.error('Error creating product:', error)
        // }
    }

    const updateProduct = async ({
      data,
    }: {
        data: FormData,
    }) => {

    }

  return {
    createProduct,
    updateProduct
  }
}

export default useProducts
