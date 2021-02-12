import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NutrientInfoModel, RecipModel } from 'src/app/shared/models/recip.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  recipForm!: FormGroup;
  nutrientInfoForm!: FormGroup;
  recip: RecipModel = new RecipModel();
  info: NutrientInfoModel = new NutrientInfoModel();
  index = 1;

  constructor(
    private userService: UserService,
    private restService: RestService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(() => { },
        () => {
          this.router.navigate(['/login']);
        });

    this.createFormRecip();

    this.createFormNutrientInfo();
  }

  createFormRecip(): void {
    const tmp = this.recip;
    this.recipForm = this.fb.group({
      recipName: [tmp.name, [Validators.required]],
      recipCountry: [tmp.country, [Validators.required, Validators.maxLength(2)]],
      recipUnit: [tmp.unit],
      recipHundredUnit: [tmp.hundredUnit],
      recipPortionUnit: [tmp.portionUnit],
      recipQuantity: [tmp.quantity],
      recipPortionQuantity: [tmp.portionQuantity],
      recipAlcoholByVolume: [tmp.alcoholByVolume]
    });
  }

  createFormNutrientInfo(): void {
    const tmp = this.info;
    this.nutrientInfoForm = this.fb.group({
      infoName: [tmp.name, [Validators.required]],
      infoUnit: [tmp.unit],
      infoPerHundred: [tmp.perHundred],
      infoPerPortion: [tmp.perPortion],
      infoPerDay: [tmp.perDay]
    });
  }

  doAddRecip(value: {
    recipName: string,
    recipCountry: string,
    recipUnit: string,
    recipHundredUnit: string,
    recipPortionUnit: string,
    recipQuantity: number,
    recipPortionQuantity: number,
    recipAlcoholByVolume: number;
  }): void {
    if (value.recipName !== null) {
      this.recip.name = value.recipName;
      this.recip.originName = value.recipName;
      this.recip.ingredientName = value.recipName;
    }
    if (value.recipCountry !== null) {
      this.recip.country = value.recipCountry;
    }
    if (value.recipUnit !== null) {
      this.recip.unit = value.recipUnit;
    }
    if (value.recipHundredUnit !== null) {
      this.recip.hundredUnit = value.recipHundredUnit;
    }
    if (value.recipPortionUnit !== null) {
      this.recip.portionUnit = value.recipPortionUnit;
    }
    if (value.recipQuantity !== null) {
      this.recip.quantity = value.recipQuantity;
    }
    if (value.recipPortionQuantity !== null) {
      this.recip.portionQuantity = value.recipPortionQuantity;
    }
    if (value.recipAlcoholByVolume !== null) {
      this.recip.alcoholByVolume = value.recipAlcoholByVolume;
    }

    this.restService.doAddRecip(this.recip);
  }

  doAddNutrientInfo(value: {
    infoName: string,
    infoUnit: string,
    infoPerHundred: number,
    infoPerPortion: number,
    infoPerDay: number;
  }): void {
    if (this.nutrientInfoForm.dirty && this.nutrientInfoForm.valid) {
      alert(
        `Name: ${this.nutrientInfoForm.value.infoName}`
      );
    }

    if (value.infoName !== null) {
      this.info.name = value.infoName;
    }
    if (value.infoUnit !== null) {
      this.info.unit = value.infoUnit;
    }
    if (value.infoPerHundred !== null) {
      this.info.perHundred = value.infoPerHundred;
    }
    if (value.infoPerPortion !== null) {
      this.info.perPortion = value.infoPerPortion;
    }
    if (value.infoPerDay !== null) {
      this.info.perDay = value.infoPerDay;
    }

    if (this.index === 1) {
      this.recip.nutrient.proteinInfo = this.info;
    }
    else if (this.index === 2) {
      this.recip.nutrient.carbohydratesInfo = this.info;
    }
    else if (this.index === 3) {
      this.recip.nutrient.energyInfo = this.info;
    }
    else if (this.index === 4) {
      this.recip.nutrient.energyKcalInfo = this.info;
    }
    else if (this.index === 5) {
      this.recip.nutrient.fatInfo = this.info;
    }
    else if (this.index === 6) {
      this.recip.nutrient.fiberInfo = this.info;
    }
    else if (this.index === 7) {
      this.recip.nutrient.saltInfo = this.info;
    }
    else if (this.index === 8) {
      this.recip.nutrient.saturatedFatInfo = this.info;
    }
    else if (this.index === 9) {
      this.recip.nutrient.sodiumInfo = this.info;
    }
    else if (this.index === 10) {
      this.recip.nutrient.sugarsInfo = this.info;
    }
  }

  doChangeDataForInfo(index: number): void {
    this.index = index;
    if (index === 1) {
      this.info = this.recip.nutrient.proteinInfo;
    }
    else if (index === 2) {
      this.info = this.recip.nutrient.carbohydratesInfo;
    }
    else if (index === 3) {
      this.info = this.recip.nutrient.energyInfo;
    }
    else if (index === 4) {
      this.info = this.recip.nutrient.energyKcalInfo;
    }
    else if (index === 5) {
      this.info = this.recip.nutrient.fatInfo;
    }
    else if (index === 6) {
      this.info = this.recip.nutrient.fiberInfo;
    }
    else if (index === 7) {
      this.info = this.recip.nutrient.saltInfo;
    }
    else if (index === 8) {
      this.info = this.recip.nutrient.saturatedFatInfo;
    }
    else if (index === 9) {
      this.info = this.recip.nutrient.sodiumInfo;
    }
    else if (index === 10) {
      this.info = this.recip.nutrient.sugarsInfo;
    }

    this.createFormNutrientInfo();
  }
}

