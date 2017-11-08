import * as Mongoose from 'mongoose';
const ObjectId = Mongoose.Schema.Types.ObjectId

class CardsOnStock {

    private modelName = 'CardsOnStock'; 
    private model;
    private schema = {
        _id: { type: ObjectId },
        sc_id: { type: String },
        card: {
            image_uris: { type: Object },
            legalities: { type: Object },
            color_identity: [ { type: String } ],
            set: { type: String },
            sc_uri: { type: String },
            mtgo_id: { type: Number },
            cmc: { type: Number },
            text: { type: String },
            rarity: { type: String },
            external_prices: {
                usd: { type: String },
                tix: { type: String }
            }
        },
        created: { type: Date, default: new Date() }  
    };


    constructor() {
        this.model = Mongoose.model(this.modelName, this.schema);
    }

    public getCardById(id: Mongoose.Schema.Types.ObjectId) : Object {

        this.model.findById(id)
        return {};
    }
}

exports.module = CardsOnStock;