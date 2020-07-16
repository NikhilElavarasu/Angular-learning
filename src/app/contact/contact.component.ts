import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from "../shared/feedback";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { flyInOut } from "../animations/app.animation";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
  ]
})
export class ContactComponent implements OnInit {

  feedback : Feedback;
  feedbackForm : FormGroup;
  contact = ContactType;

  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb : FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  validationMesssages = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name should be atleast of 3 characters long',
      'maxlenght': 'First name can not be more than 25 character long ',
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name should be atleast of 3 characters long',
      'maxlength': 'Last name can not be more than 25 characters long',
    },
    'telnum': {
      'required': 'Tel. number is required',
      'pattern': 'Tel. number can only have numbers',
    },
    'email':{
      'required': 'Email is required',
      'email': 'Email is not in valid format',
    },
  };

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm){
      return ;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMesssages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }
}
