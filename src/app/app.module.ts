import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./notfound/notfound.component";
import {RegisterComponent} from "./register/register.component";
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from './materials.module'




const appRoutes: Routes = [
    {
        path: '', pathMatch: 'full', component: HomeComponent
    },
    {
        path: 'register', pathMatch: 'full', component: RegisterComponent
    },
    {
        path: '**', pathMatch: 'full', component: NotFoundComponent
    }
];


@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        RegisterComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}