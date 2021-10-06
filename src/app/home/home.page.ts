import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonFormData } from '../components/json-form/json-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonDataMockForm } from '../model/JsonDataMockForm';
import { JsonForm2Component } from '../components/json-form2/json-form2.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  
  public formData: JsonFormData;
  public formData2: JsonFormData;
  public formGroup: FormGroup;
  jsonDataMockForm: JsonDataMockForm;
  @ViewChild('jsonform2child', { static: false }) jsonForm2Component: JsonForm2Component;

  constructor(
    private http: HttpClient
    , private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      jsonDataMock: [''],
    });
  }

  ngOnInit() {
    //this.formGroup = this.formBuilder.group(new JsonDataMockForm());
    this.http
      .get('/assets/my-form.json')
      .subscribe((res: JsonFormData) => {
        this.formData = res;
        this.formData2 = res;
        this.formGroup.get("jsonDataMock").setValue(JSON.stringify(res));
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.formGroup.get("jsonDataMock").value);
    // if (!changes.jsonFormData.firstChange) {
    //   this.createForm(this.jsonFormData.controls);
    // }
  }
  viewTextChange(){
    try{
      //console.log(this.formGroup.get("jsonDataMock").value);
      let _jsonDataMock = this.formGroup.get("jsonDataMock").value.replace("“", "\"").replace("”", "\""); 
      var jsonObj = JSON.parse(_jsonDataMock);
      //console.log(jsonObj);
      if(jsonObj){
        this.formData = jsonObj;
        this.formData2 = jsonObj;
      }
    }catch(e){

    }
  }

  
  onJsonForm1Change(jsonFormData: JsonFormData) {
    //console.log('onJsonForm1Change', jsonFormData);
    this.formData2 = jsonFormData;
    //this.jsonForm2Component.createForm(this.formData2.form);
  }

}
