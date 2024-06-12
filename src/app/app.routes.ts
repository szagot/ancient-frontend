import { Routes } from '@angular/router';
import { PeopleComponent } from './admin/people/people.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { BoardComponent } from './game/board/board.component';

export const routes: Routes = [
    {
        path: '',
        component: BoardComponent
    },
    {
        path: 'admin/people',
        component: PeopleComponent
    },
    {
        path: 'admin/questions',
        component: QuestionsComponent
    },
];
