class StoreObject {
    constructor(id, name, old_price, discountCampaign, oType, oPlatforms, oReleaseDate, oProvider, oDescription, oImages) {
        this.id = id;
        this.name = name;
        this.old_price = old_price;
        this.discount = discountCampaign;
        this.type = oType;
        this.platforms = oPlatforms;
        this.release_date = oReleaseDate;
        this.provider = oProvider;
        this.description = oDescription;
        this.images = oImages;
    }
}

module.exports = {
    StoreObject
}