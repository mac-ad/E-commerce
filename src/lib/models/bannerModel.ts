import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const bannerModel = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default bannerModel;
