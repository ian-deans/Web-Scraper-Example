const mongoose = require( 'mongoose' );
const {
    Schema
} = mongoose;

const ArticleSchema = new Schema( {
    title: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
} );

// Add a custom method to the model that returns some JSON data.
ArticleSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        title: this.title,
        summary: this.summary,
        url: this.url,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

// Register the model with Mongoose
mongoose.model( 'Article', ArticleSchema );