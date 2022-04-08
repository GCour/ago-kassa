import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PosOverzichtComponent } from './pos-overzicht/pos-overzicht.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'non-alcohol',
        pathMatch: 'full'
    },
    {
        path: 'non-alcohol',
        pathMatch: 'full',
        component: PosOverzichtComponent,
        data: {
            category: 1
        }
    },
    {
        path: 'alcohol',
        component: PosOverzichtComponent,
        data: {
            category: 2
        }
    },
    {
        path: 'warm',
        component: PosOverzichtComponent,
        data: {
            category: 3
        }
    },
    {
        path: 'snacks',
        component: PosOverzichtComponent,
        data: {
            category: 4
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
