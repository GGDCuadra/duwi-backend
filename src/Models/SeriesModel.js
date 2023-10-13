const mongoose = require('mongoose');
const esquemaSeries = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    name: String,
    type: String,
    language: String,
    genres:[String],
    status: String,
    runtime: Number,
    premiered: Date,
    officialSite: String,
    schedule:{
        time: String,
        days:[String],
    },
    rating: {
        average: Number,
    },
    weight: Number,
    network: {
        id: Number,
        name: String,
    country: {
        name: String,
        code: String,
        timezone: String,
        },
    },
    webChannel: String,
    externals: {
        tvrage: Number,
        thetvdb: Number,
        imdb: String,
    },
    image: {
        medium: String,
        original: String,
    },
    summary: String,
    updated: Number,
    _links: {
    self: {
        href: String,
        },
        previousepisode: {
        href: String,
        },
    },
    deshabilitar: String,
});

const Series = mongoose.model('Series', esquemaSeries);

module.exports = Series;