const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  subject: { type: String, required: true },  // Subject of the support ticket (Order Issue, Payment Issue, etc.)
  category: { 
    type: String, 
    required: true, 
    enum: ['Order Issue', 'Payment Issue', 'Product Inquiry']  // Fixed categories
  },
  description: { type: String, default: '' },  // Detailed description of the issue
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium'  // Default priority is 'Medium'
  },
  farmerId: { type: String, required: true },  // Farmer ID for identification
  attachment: { type: String, default: '' },  // Optional attachment (file path)
  createdAt: { type: Date, default: Date.now },  // Automatically set creation time
  updatedAt: { type: Date, default: Date.now },  // Automatically set update time
});

// You can also add a pre-save hook to automatically update the `updatedAt` field when an entry is updated
supportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;