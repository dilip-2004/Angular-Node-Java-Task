import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculationService } from '../../services/calculation.service';
import { CalculationRequest, CalculationResponse } from '../../models/calculation.interface';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  calculatorForm!: FormGroup;
  result: number | null = null;

  constructor(private fb: FormBuilder, private calculationService: CalculationService) {}

  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      a: ['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      b: ['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      op: ['add', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.calculatorForm.valid) {
      const request: CalculationRequest = this.calculatorForm.value;
      this.calculationService.calculate(request).subscribe((response: CalculationResponse) => {
        console.log(response);
        this.result = response.result;
      }, (error) => {
        console.error('Calculation failed', error);
      });
    }
  }

  clearForm(): void {
    this.calculatorForm.reset({ op: 'add' });
    this.result = null;
  }
}

