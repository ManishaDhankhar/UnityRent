import React from 'react'

function FeaturedItems({ items }) {
    if (!items || items.length === 0) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Featured Rentals</h2>
            <div className="row"> {/* This makes them sit in a row */}
                {items.map((item) => (
                    <div className="col-md-4 mb-4" key={item._id} data-aos="fade-up">
                        <div className="card h-100 shadow-sm">
                            <img 
                                src={item.image} 
                                className="card-img-top" 
                                alt={item.title} 
                                style={{ height: "200px", objectFit: "cover" }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="text-muted mb-1">{item.category}</p>
                                <p className="fw-bold text-primary">₹{item.pricing.ratePerDay}/day</p>
                                <button className="btn btn-dark w-100">Rent Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedItems;