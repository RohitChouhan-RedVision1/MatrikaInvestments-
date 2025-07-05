import mongoose from 'mongoose';

const InvestorMeetPhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false, // Optional, you can make it required if needed
  },
  description: {
    type: String,
    required: false,
  },
   image: {
        url: String,
        public_id: String,
    },
  eventDate: {
    type: Date,
    required: false,
  }
}, {
  timestamps: true
});

const InvestorMeetPhotoModel = mongoose.models.investor_meet_photos || mongoose.model('investor_meet_photos', InvestorMeetPhotoSchema);

export default InvestorMeetPhotoModel;
