export class RecipModel {
    country: string;
    name: string;
    ingredientName: string;
    originName: string;
    unit: string;
    hundredUnit: string;
    portionUnit: string;

    nutrient: NutrientModel;

    dbId: number;
    quantity: number;
    portionQuantity: number;
    alcoholByVolume: number;

    constructor() {
        this.name = '';
        this.ingredientName = '';
        this.originName = '';
        this.country = '';
        this.unit = '';
        this.hundredUnit = '';
        this.portionUnit = '';

        this.nutrient = new NutrientModel();

        this.dbId = 0;
        this.quantity = 0;
        this.portionQuantity = 0;
        this.alcoholByVolume = 0;
    }
}

export class NutrientModel {
    proteinInfo: NutrientInfoModel;
    carbohydratesInfo: NutrientInfoModel;
    energyInfo: NutrientInfoModel;
    energyKcalInfo: NutrientInfoModel;
    fatInfo: NutrientInfoModel;
    fiberInfo: NutrientInfoModel;
    sodiumInfo: NutrientInfoModel;
    sugarsInfo: NutrientInfoModel;
    saturatedFatInfo: NutrientInfoModel;
    saltInfo: NutrientInfoModel;

    constructor() {
        this.proteinInfo = new NutrientInfoModel();
        this.carbohydratesInfo = new NutrientInfoModel();
        this.energyInfo = new NutrientInfoModel();
        this.energyKcalInfo = new NutrientInfoModel();
        this.fatInfo = new NutrientInfoModel();
        this.fiberInfo = new NutrientInfoModel();
        this.sodiumInfo = new NutrientInfoModel();
        this.sugarsInfo = new NutrientInfoModel();
        this.saturatedFatInfo = new NutrientInfoModel();
        this.saltInfo = new NutrientInfoModel();
    }
}

export class NutrientInfoModel {
    name: string;
    unit: string;
    perHundred: number;
    perPortion: number;
    perDay: number;

    constructor() {
        this.name = '';
        this.unit = '';
        this.perHundred = 0;
        this.perPortion = 0;
        this.perDay = 0;
    }
}
