import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  id: string;
  label: string;
  value: string;
  type: string;
  //options?: JsonFormControlOptions;
  //required: boolean;
  //validators: JsonFormValidators;
}

export interface JsonFormData {
  form: JsonFormControls[];
}

@Component({
  selector: 'app-json-form2',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './json-form2.component.html',
  styleUrls: ['./json-form2.component.scss'],
})
export class JsonForm2Component implements OnChanges {
  
  @Input() jsonFormData2: JsonFormData;
  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    //console.log('form2-ngOnChanges', this.jsonFormData2);
    if (!changes.jsonFormData2.firstChange) {
      this.createForm(this.jsonFormData2.form);
    }
  }

  createForm(controls: JsonFormControls[]) {
    //console.log(controls);
    this.myForm = this.fb.group({});
    for (const control of controls) {
      const validatorsToAdd = [];
      // for (const [key, value] of Object.entries(control.validators)) {
      //   switch (key) {
      //     case 'min':
      //       validatorsToAdd.push(Validators.min(value));
      //       break;
      //     case 'max':
      //       validatorsToAdd.push(Validators.max(value));
      //       break;
      //     case 'required':
      //       if (value) {
      //         validatorsToAdd.push(Validators.required);
      //       }
      //       break;
      //     case 'requiredTrue':
      //       if (value) {
      //         validatorsToAdd.push(Validators.requiredTrue);
      //       }
      //       break;
      //     case 'email':
      //       if (value) {
      //         validatorsToAdd.push(Validators.email);
      //       }
      //       break;
      //     case 'minLength':
      //       validatorsToAdd.push(Validators.minLength(value));
      //       break;
      //     case 'maxLength':
      //       validatorsToAdd.push(Validators.maxLength(value));
      //       break;
      //     case 'pattern':
      //       validatorsToAdd.push(Validators.pattern(value));
      //       break;
      //     case 'nullValidator':
      //       if (value) {
      //         validatorsToAdd.push(Validators.nullValidator);
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      // }
      this.myForm.addControl(
        control.id,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    //console.log('Form valid: ', this.myForm.valid);
    //console.log('Form values: ', this.myForm.value);
  }
}
