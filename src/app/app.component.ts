import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required),
    active: new FormControl(true, Validators.requiredTrue),
    userContactInfo: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]),
      // userContactInfo: new FormGroup({
      //   email: new FormControl(''),
      //   phone: new FormControl('')
      // })
    }),
    experience: new FormArray([])
  });

  get experienceFormArray() {
    return <FormArray>this.form.get('experience');
  }

  addExperience() {
    // const experience = <FormArray>this.form.get('experience') // as FormArray;
    this.experienceFormArray.push(new FormGroup({
      company: new FormControl('',Validators.required),
      years: new FormControl('',Validators.required)
    }))
  }

  submit() {
    this.form.markAllAsTouched()
  }

  removeExperience(i: number) {
    this.experienceFormArray.removeAt(i);
  }

  ngOnInit(): void {
    const user = {
      firstname: "John",
      lastname: "Doe",
      active: true,
      email: "John@Doe",
      phone: "341234123",
      role: {
        name: "admin",
        id: 1
      },
      experience: [
        {
          company: "alte",
          years: "3"
        }
      ]
    }

    user.experience.forEach(() => this.addExperience());

    this.form.patchValue({
      ...user,
      roleId: user.role.id,
      userContactInfo: {
        email: user.email,
        phone: user.phone
      }
    });


    // this.form.valueChanges.subscribe( (form) =>{
    //   console.log(form);
    // })

    this.form.get('firstname')?.valueChanges.subscribe( (value) =>{
      console.log(value);
      this.form.get('lastname')?.disable();
      this.form.get('active')?.setValue(false);
      if (!value) {
        this.form.get('userContactInfo.email')?.clearValidators();
      } else {
        this.form.get('userContactInfo.email')?.setValidators([
          Validators.required,
          Validators.email
        ]);
      }
      this.form.get('userContactInfo.email')?.updateValueAndValidity();
    })
  }
}
