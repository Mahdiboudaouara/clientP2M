import React from 'react'

export default function categoryCard(props) {
    let name_category=props.name_category
  return (
  
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="#"><img src="https://loremflickr.com/640/480/abstract" className="rounded-circle img-fluid border"></img></a>
                <h5 className="text-center mt-3 mb-3">{name_category}</h5>
                <p className="text-center"><a className="btn btn-success">Go Shop</a></p>
            </div>
            

        

  )
}
