const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Coding', 'Academic', 'Creative Arts', 'Project Making', 'Media', 'Design', 'Career'],
    default: 'Academic'
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXNzaWdubWVudHxlbnwwfHwwfHx8MA%3D%3D'
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  priceUnit: {
    type: String,
    required: true,
    default: 'per hour' // e.g., 'per script', 'per hand', 'per assignment'
  },
  providerName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  tags: {
    type: [String],
    validate: [val => val.length <= 10, 'Cannot exceed 10 tags']
  }
}, {
  //  automatically handles 'createdAt' and 'updatedAt' 
  timestamps: true 
});

// Create an index for searching by service name or category
serviceSchema.index({ serviceName: 'text', category: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
