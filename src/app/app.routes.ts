import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { HomeComponent } from './home/home.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'workout',
        component: WorkoutComponent
    },
    {
        path: '**',
        component: MainContentComponent
    }
]

export const AppRoutes = RouterModule.forRoot(routes);