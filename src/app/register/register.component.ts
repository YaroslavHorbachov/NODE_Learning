import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'register-app',
    template: require('./register.component.html'),
    // styleUrls: ['./app.component.scss']
})
export class RegisterComponent implements OnInit{
    email: string;
    password: string;
    passwordC: string;
    compareForm():void{

        console.log(this.email,this.password, this.passwordC)
    }
    ngOnInit(): void {
       /* this.heroForm = new FormGroup({
            'name': new FormControl(this.hero.name, [
                Validators.required,
                Validators.minLength(4),

            ]),
            'alterEgo': new FormControl(this.hero.alterEgo),
            'power': new FormControl(this.hero.power, Validators.required)
        });*/
    }

   /* get name() { return this.heroForm.get('name'); }

    get power() { return this.heroForm.get('power'); }*/
}