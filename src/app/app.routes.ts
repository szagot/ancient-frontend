import { Routes } from '@angular/router';
import { PeopleComponent } from './admin/people/people.component';
import { QuestionsComponent } from './admin/questions/questions.component';

export const routes: Routes = [
    {
        path: 'admin/people',
        component: PeopleComponent
    },
    {
        path: 'admin/questions',
        component: QuestionsComponent
    },
];
