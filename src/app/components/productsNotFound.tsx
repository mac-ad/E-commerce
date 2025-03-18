
const productsNotFound = () => {
  return (
      <div className="col-span-full flex flex-col items-center justify-center py-16">
        <div className="bg-white py-8 rounded-lg  text-center w-full">
            <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">We're working hard to bring exciting products to this category. Check back soon!</p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Coming Soon
            </div>
        </div>
    </div>
  )
}

export default productsNotFound
