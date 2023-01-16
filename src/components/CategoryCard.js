import React from 'react'

export default function categoryCard() {
  return (
    <section className="container py-5">
    <div className="row text-center pt-3">
        <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </div>
    </div>
                <div className="row">
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="#"><img src="https://loremflickr.com/640/480/abstract" className="rounded-circle img-fluid border"></img></a>
                <h5 className="text-center mt-3 mb-3">Watches</h5>
                <p className="text-center"><a className="btn btn-success">Go Shop</a></p>
            </div>
            
        </div>
      
    
    </section>
  )
}
