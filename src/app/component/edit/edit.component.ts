import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NutrientInfoModel, RecipModel } from 'src/app/shared/models/recip.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  recipForm!: FormGroup;
  nutrientInfoForm!: FormGroup;
  recip: RecipModel = new RecipModel();
  info: NutrientInfoModel = new NutrientInfoModel();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(() => {},
      err => {
        this.router.navigate(['/login']);
      });

    this.activatedRoute.data.subscribe(data => {
      this.recip = data.data;
      this.info = this.recip.nutrient.proteinInfo;
    });
    this.createForm();
  }

  createForm(): void {
    this.recipForm = this.fb.group({
      recipName: ['', [Validators.required]],
      recipCountry: ['', [Validators.required, Validators.maxLength(2)]],
      recipUnit: [''],
      recipHundredUnit: [''],
      recipPortionUnit: [''],
      recipQuantity: [''],
      recipPortionQuantity: [''],
      recipAlcoholByVolume: ['']
    });

    this.nutrientInfoForm = this.fb.group({
      infoName: ['', [Validators.required]],
      infoUnit: [''],
      infoPerHundred: [''],
      infoPerPortion: [''],
      infoPerDay: ['']
    });
  }

  doUpdateRecip(value: {
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
  }

  doUpdateNutrientInfo(value: {
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
  }
}
