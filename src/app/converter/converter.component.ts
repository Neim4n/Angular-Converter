import {Component, Input, OnInit} from '@angular/core';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  faRightLeft = faRightLeft;
  @Input() currencies: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDefaultValue(code: string) {
    return this.currencies?.find((e: any) => e.currencyCode == code)?.value;
  }

  calcAmount(inputAmount: any, inputRate: any, outputAmount: any, outputRate: any) {
    let inputRateValue = +inputRate.value.split("-")[1];
    let outputRateValue = +outputRate.value.split("-")[1];
    outputAmount.value = inputAmount.value ? (inputAmount.value / inputRateValue * outputRateValue).toFixed(2) : "";
  }

  changeSelectValues(button: any, inputAmount: any, inputRate: any, outputAmount: any, outputRate: any) {
    button.classList.contains("rotated") ? button.classList.remove("rotated") : button.classList.add("rotated");
    let tempInputRate = inputRate.value
    inputRate.value = outputRate.value;
    outputRate.value = tempInputRate;
    console.log(inputRate.value, outputRate.value)
    this.calcAmount(inputAmount, inputRate, outputAmount, outputRate);
  }
}
