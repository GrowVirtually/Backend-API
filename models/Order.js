// const mongoose = require('mongoose');
//
// const { Schema } = mongoose;
//
// // Create Schema
// const OrderSchema = new Schema({
//   itemType: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: mongoose.Schema.Types.Double,
//     required: true,
//   },
//   totalAmount: {
//     type: mongoose.Schema.Types.Double,
//     required: true,
//   },
//   consumerApproval: {
//     type: Boolean,
//     required: true,
//     default: 0,
//   },
//   growerApproval: {
//     type: Boolean,
//     required: true,
//     default: 0,
//   },
//   payment: {
//     amount: String,
//     growerId: mongoose.Schema.ObjectId,
//     consumerId: mongoose.Schema.objectId,
//     required: true,
//   },
//   gigId: {
//     type: mongoose.Schema.objectId,
//     required: true,
//   },
//   consumerId: {
//     type: mongoose.Schema.objectId,
//     required: true,
//   },
//   growerId: {
//     type: mongoose.Schema.objectId,
//     required: true,
//   },
// });
//
// mongoose.model('orders', OrderSchema);
